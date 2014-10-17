import gevent
import gevent.monkey
import gevent.subprocess
from gevent.pywsgi import WSGIServer
gevent.monkey.patch_all()

import os, crawldriver, x, itertools

from flask import Flask, Response, render_template, request, copy_current_request_context
from uuid import uuid4


app = Flask(__name__)

global jobs
jobs = {}


@app.route('/')
def index():
  print "Home"
  return render_template('index.html')

def crawl_stream(jobid):
  global jobs

  yield 'data: Starting crawl job %s\n\n' %(jobid)

  try:

    form = jobs[jobid]
    browsers = form.getlist('browser')

    # TODO: Instead of gevent.spawn, get command from the function
    # and call gevent.subprocess.POpen for making it parallel
    # https://github.com/surfly/gevent/blob/master/examples/processes.py

    # Generate crawlers
    crawlProc = []
    for browser in browsers:
      yield 'data: Generating crawler for %s\n\n'%(browser)
      t = gevent.spawn(crawldriver.genCrawler, jobid, form, browser)
      crawlProc.append(t)
    gevent.joinall(crawlProc)

    for t in crawlProc:
      message = t.value
      yield 'data: %s\n\n'%(message)
      if "ERROR" in message:
        raise Exception("Error during crawler generation. Aborting.")

    # Execute crawlers
    crawlExec = []
    for browser in browsers:
      yield 'data: Executing crawler for %s\n\n'%(browser)
      t = gevent.spawn(crawldriver.runCrawler, jobid, browser)
      crawlExec.append(t)
    gevent.joinall(crawlExec)

    for t in crawlExec:
      message = t.value
      yield 'data: %s\n\n'%(message)
      if "ERROR" in message:
        raise Exception("Error during crawler execution. Aborting.")

    # X-PERT Model Compare
    testBrowsers = itertools.combinations(browsers, 2)
    for t in testBrowsers:
      yield 'data: Comparing %s with %s\n\n' %(t[0], t[1])

      cmd = "%s -cp %s %s %s %s %s" %(x.java, x.xpert_jar, x.xpert_main, jobid, t[0], t[1])
      print cmd
      proc = gevent.subprocess.Popen(cmd, shell=True, cwd=x.xpert_out)

      proc.wait()

      if proc.returncode == 0:
        yield 'data: ... Finished comparing %s with %s\n\n' %(t[0], t[1])
      else:
        yield 'data: ... ERROR while comparing %s with %s\n\n' %(t[0], t[1])
        break

  except Exception as e:
    yield 'data: X-PERT Error: %s\n\n'%(str(e))

  # Run analysis
  yield 'data: END\n\n'


## RESUME - For Testing Xpert with already crawled data for FIREFOX & IE
def crawlresume_stream(jobid):
  global jobs

  yield 'data: Starting crawl job %s\n\n' %(jobid)

  try:

    browsers = ['FIREFOX', 'INTERNET_EXPLORER']

    # X-PERT Model Compare
    testBrowsers = itertools.combinations(browsers, 2)
    for t in testBrowsers:
      yield 'data: Comparing %s with %s\n\n' %(t[0], t[1])
      # cmd = [x.java, "-jar", x.xpert_jar, x.xpert_main, jobid, t[0], t[1]]

      cmd = "%s -cp %s %s %s %s %s" %(x.java, x.xpert_jar, x.xpert_main, jobid, t[0], t[1])
      print cmd
      proc = gevent.subprocess.Popen(cmd, shell=True, cwd=x.xpert_out)

      proc.wait()

      if proc.returncode == 0:
        yield 'data: ... Finished comparing %s with %s\n\n' %(t[0], t[1])
      else:
        yield 'data: ... ERROR while comparing %s with %s\n\n' %(t[0], t[1])
        break


  except Exception as e:
      yield 'data: X-PERT Error: %s\n\n'%(str(e))

  # Run analysis
  yield 'data: END\n\n'


@app.route('/crawl/<jobid>')
def doCrawl(jobid):
  return Response(crawl_stream(jobid), mimetype='text/event-stream')

## RESUME
@app.route('/crawlresume/<jobid>')
def doCrawlResume(jobid):
  return Response(crawlresume_stream(jobid), mimetype='text/event-stream')

@app.route('/crawl', methods=['GET', 'POST'])
def crawl():
  global jobs

  jobid = uuid4().hex

  # @copy_current_request_context
  # def doCrawl(jid):
  #   print "Compile crawl driver", jid, request.method
  #
  #   print "Starting crawl", jid, request.method
  #   #os.system('open http://www.yahoo.com')
  #   gevent.sleep(5)

  if request.method == 'POST':
    print "Starting crawl ", jobid
    print request.form
    jobs[jobid] = request.form

    return render_template('results.html', jobid=jobid)

    # TODO: Logic for PubSub
    # Example: https://github.com/jkbr/chat/blob/master/app.py
    # t = gevent.spawn(doCrawl, jobid)
    # gevent.joinall([t])

  else:
    jobid = request.args['jobid']
    if jobid is None:
      return "No crawl spec provided"

    print "Resuming crawl", jobid
    return render_template('resume.html', jobid=jobid)


if __name__ == '__main__':
  app.debug = True
  app.run(host='0.0.0.0', port=8000)
  # http_server = WSGIServer(('127.0.0.1', 8001), app)
  # http_server.serve_forever()

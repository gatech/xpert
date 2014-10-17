import os, errno, subprocess, x
from jinja2 import Environment, FileSystemLoader


def getCheckBox(frm, key):
  if key in frm:
    return 'true'
  return 'false'

def getCJLibs(prefix=None, separator=':'):
  ldir = '../lib'
  cp = ""
  jars = os.listdir(ldir)
  for j in jars:
    if prefix is None:
      cp += ldir+'/'+j+separator
    else:
      cp += prefix+'/'+j+separator
  return cp

def genCrawler(jobid, form, browser):

  outDir = "out/%s/%s" % (jobid, browser)
  mkdir_p(outDir)

  env = Environment(loader=FileSystemLoader('templates'))
  template = env.get_template('CrawlDriver.java')

  widgets_click = []
  widgets_dont_click = []
  widgets_dont_click_children = []
  cw = form.getlist('custom_widget')
  ca = form.getlist('custom_action')
  for i in range(len(cw)):
    if not cw[i]:
      continue
    else:
      if ca[i] == '1':
        widgets_click.append(cw[i])
      elif ca[i] == '0':
        widgets_dont_click.append(cw[i])
      elif ca[i] == '-1':
        widgets_dont_click_children.append(cw[i])

  config = {
    'browser': browser,
    'url': form['url'],
    'click': form.getlist('click'),
    'states': form['states'],
    'depth': form['depth'],
    'click_once': getCheckBox(form, 'click_once'),
    'widgets_click': widgets_click,
    'widgets_dont_click': widgets_dont_click,
    'widgets_dont_click_children': widgets_dont_click_children,
    'ignore_style': getCheckBox(form, 'ignore_style'),
    'ignore_script': getCheckBox(form, 'ignore_script'),
    'outDir': '.'
  }

  genCrawler = template.render(config=config)

  with open(outDir+"/CrawlDriver.java", "wb") as f:
    f.write(genCrawler)

  libs = getCJLibs()
  #print libs

  cmd = '/usr/bin/javac ' + "-cp " + libs + ' ' + outDir + "/CrawlDriver.java"
  proc = subprocess.Popen(cmd, shell=True)

  proc.wait()
  if proc.returncode == 0:
    return "...done generating %s crawler"%(browser)
  else:
    return "...ERROR generating %s crawler"%(browser)


def runCrawler(jobid, browser):
  outDir = "out/%s/%s" % (jobid, browser)

  cmd = "%s %s %s"%(x.vm_cmd, jobid, browser)
  print "Running command", cmd
  proc = subprocess.Popen(cmd, shell=True)

  proc.wait()
  if proc.returncode == 0:
    return "...done running %s crawler"%(browser)
  else:
    return "...ERROR running %s crawler"%(browser)


def mkdir_p(path):
    try:
        os.makedirs(path)
    except OSError as exc: # Python >2.5
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else: raise

X-PERT: Cross-Platform Error ReporTer
=====


This tool is the open source implementation for our X-PERT paper.
Note that this is a rewrite of the original tool due to licensing terms with Fujitsu Labs of America. 

Here are some differences:
- The tool ~~only~~ checks for ~~layout~~ *ALL* issues described in the paper. 
- The new tool only provides command line output in CSV format unlike the HTML reports generated by the tool in the paper.


# Running X-PERT via its Web front-end

### Install the gevent and flask python packages: 
```
pip install gevent flask
```
If you don't have pip, see installation instructions [here](https://pip.pypa.io/en/latest/installing.html)

### Configure VM or make suitable changes
The web app assumes that you are running a Windows virtual machine using VMWare and runs the crawler inside the VM.
To tweak this or to run the crawler on your local machine, change the vm_cmd option in the [x.py file](https://github.com/gatech/xpert/blob/master/web/x.py).

### Start the web app
```
cd xpert/web
python app.py
```
It should start the web app on port 8000. Use your web browser to open http://localhost:8000 and navigate through the wizard.

# Running X-PERT via Command line

### Crawl
```
java -cp xpert.jar CrawlDriver
```
If you're using the command line option, you need to write this CrawlDriver class based on Crawljax's specification. 
Here is an example [CrawlDriver](https://github.com/gatech/xpert/blob/master/src/CrawlDriver.java)

The web front-end generates a suitable CrawlDriver based on the information provided in the form using  [this](https://github.com/gatech/xpert/blob/master/web/templates/CrawlDriver.java) Jinja template.

### Compare
```
java -cp xpert.jar edu.gatech.xpert.XpertMain <output_dir> <browser1> <browser2>
```
`output_dir` refers to the folder in which the crawled data is saved.
`browser1` and `browser2` are names of the two browsers against which X-PERT checks for XBIs in an application. Valid browser values supported by Crawljax are CHROME, FIREFOX and INTERNET_EXPLORER

The web front-end creates an output folder for each crawl performed with a random 32char alphanumeric name. 
See example [output directory](https://github.com/gatech/xpert/tree/master/web/out/e45d25ed84ea454ea3f8b0c56fe251ca)


# Troubleshooting

If things seem broken, you might need to update the Selenium library and perhaps Chrome and IE Driver.
(if you are trying to use the latest versions of these browsers.)
These files are located inside the `exec` folder.

You can find the latest versions of these files form the selenium website. Download the latest selenium standalone jar from https://code.google.com/p/selenium/downloads/list

# Issues
You can create bugs/issues on github.
Incase of any questions you can also email shauvik [at] gatech {dot} edu

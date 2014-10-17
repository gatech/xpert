@echo off

if -%1-==-- echo Job ID not provided & exit /b
if -%2-==-- echo Browser not provided & exit /b

echo Running %1 %2

cd /D Z:\xpert\web\out\%1\%2

>Z:\xpert\web\out\%1\%2\output.log 2>&1 (
  echo Running Crawler for Job %1 and Browser %2
  echo %CD%
  java -cp Z:/xpert/lib/aopalliance-1.0.jar;Z:/xpert/lib/bcpkix-jdk15on-1.48.jar;Z:/xpert/lib/bcprov-jdk15on-1.48.jar;Z:/xpert/lib/cglib-nodep-2.1_3.jar;Z:/xpert/lib/commons-beanutils-1.8.3.jar;Z:/xpert/lib/commons-cli-1.2.jar;Z:/xpert/lib/commons-codec-1.6.jar;Z:/xpert/lib/commons-collections-3.2.1.jar;Z:/xpert/lib/commons-digester-1.8.jar;Z:/xpert/lib/commons-exec-1.1.jar;Z:/xpert/lib/commons-io-2.4.jar;Z:/xpert/lib/commons-lang-2.4.jar;Z:/xpert/lib/commons-lang3-3.3.jar;Z:/xpert/lib/commons-logging-1.1.1.jar;Z:/xpert/lib/commons-math-1.2.jar;Z:/xpert/lib/commons-validator-1.4.0.jar;Z:/xpert/lib/crawljax-cli-3.5.1.jar;Z:/xpert/lib/crawljax-core-3.5.1.jar;Z:/xpert/lib/crawloverview-plugin-3.6-SNAPSHOT.jar;Z:/xpert/lib/guava-16.0.1.jar;Z:/xpert/lib/guice-3.0.jar;Z:/xpert/lib/guice-assistedinject-3.0.jar;Z:/xpert/lib/httpclient-4.3.1.jar;Z:/xpert/lib/httpcore-4.3.jar;Z:/xpert/lib/jackson-annotations-2.3.0.jar;Z:/xpert/lib/jackson-core-2.3.2.jar;Z:/xpert/lib/jackson-databind-2.3.2.jar;Z:/xpert/lib/jackson-datatype-guava-2.3.2.jar;Z:/xpert/lib/javax.inject-1.jar;Z:/xpert/lib/jcip-annotations-1.0.jar;Z:/xpert/lib/jcl-over-slf4j-1.7.6.jar;Z:/xpert/lib/jetty-repacked-7.6.1.jar;Z:/xpert/lib/jgrapht-0.8.3.jar;Z:/xpert/lib/jna-3.4.0.jar;Z:/xpert/lib/json-20080701.jar;Z:/xpert/lib/jsr305-2.0.3.jar;Z:/xpert/lib/jul-to-slf4j-1.7.6.jar;Z:/xpert/lib/logback-classic-1.1.2.jar;Z:/xpert/lib/logback-core-1.1.2.jar;Z:/xpert/lib/metrics-core-3.0.2.jar;Z:/xpert/lib/mx4j-tools-3.0.1.jar;Z:/xpert/lib/nekohtml-1.9.19.jar;Z:/xpert/lib/netty-3.5.2.Final.jar;Z:/xpert/lib/phantomjsdriver-1.1.0.jar;Z:/xpert/lib/platform-3.4.0.jar;Z:/xpert/lib/selenium-android-driver-2.39.0.jar;Z:/xpert/lib/selenium-api-2.41.0.jar;Z:/xpert/lib/selenium-chrome-driver-2.41.0.jar;Z:/xpert/lib/selenium-firefox-driver-2.41.0.jar;Z:/xpert/lib/selenium-ie-driver-2.41.0.jar;Z:/xpert/lib/selenium-iphone-driver-2.39.0.jar;Z:/xpert/lib/selenium-java-2.39.0.jar;Z:/xpert/lib/selenium-remote-driver-2.41.0.jar;Z:/xpert/lib/selenium-safari-driver-2.39.0.jar;Z:/xpert/lib/selenium-server-2.39.0.jar;Z:/xpert/lib/selenium-support-2.41.0.jar;Z:/xpert/lib/slf4j-api-1.7.6.jar;Z:/xpert/lib/snakeyaml-1.8.jar;Z:/xpert/lib/velocity-1.7.jar;Z:/xpert/lib/webbit-0.4.14.jar;Z:/xpert/lib/xercesImpl-2.10.0.jar;Z:/xpert/lib/xml-apis-1.4.01.jar;Z:/xpert/lib/xmlunit-1.4.jar;./ CrawlDriver
)

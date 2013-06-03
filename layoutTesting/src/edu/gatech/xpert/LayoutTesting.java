package edu.gatech.xpert;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import edu.gatech.xpert.dom.DomNode;
import edu.gatech.xpert.dom.JsonDomParser;
import edu.gatech.xpert.dom.MatchResult;
import edu.gatech.xpert.dom.Matcher;
import edu.gatech.xpert.dom.layout.AGDiff;
import edu.gatech.xpert.dom.layout.AlignmentGraph;
import edu.gatech.xpert.dom.visitors.DomVisitor;
import edu.gatech.xpert.dom.visitors.NodeCountVisitor;

public class LayoutTesting {

	public static String OUTPUT = "./output/";
	public static boolean DEBUG = true;
	public static boolean CAPTURE = false;
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
//		String url = "http://localhost/";
		String url = "http://www.cc.gatech.edu/~shauvik";
		System.setProperty("webdriver.chrome.driver", "/Volumes/Secondary/Tools/Google/chromedriver");

		String[] browsers = {"ff", "ch"};
		
		// Configure browsers and capture page model
		if(CAPTURE) {
			Map<String, WebDriver> drivers = Utils.getWebDrivers(browsers);
			System.out.println("Capturing URL " + url + " in browsers " + drivers.keySet() );
			capturePageModel(url, drivers);
		}
		
		// Extract Alignment Graph and compare across browsers
		Map<String, DomNode> doms = loadDoms(browsers);
		Matcher matcher = new Matcher();
		MatchResult mr = matcher.doMatch(doms, browsers);
		
		if(DEBUG) {
			printStats(doms, browsers);
		}
		
		Map<DomNode, DomNode> matchedNodes = mr.getMatched();
		AlignmentGraph ag1 = new AlignmentGraph(doms.get(browsers[0])), 
				ag2 = new AlignmentGraph(doms.get(browsers[1]));
		
		if(DEBUG) {
			printAlignmentGraph(ag1);
			printAlignmentGraph(ag2);
		}
		
		AGDiff agDiffer = new AGDiff(matchedNodes, ag1, ag2);
		List<String> layoutIssues = new ArrayList<>();
		
		for(DomNode a : matchedNodes.keySet()){
			DomNode b = matchedNodes.get(a);
			if(DEBUG) {
				System.out.println("\t comparing"+a.getxPath()+" - "+b.getxPath());
			}
			List<String> issues = agDiffer.diff(a.getxPath(), b.getxPath());
			layoutIssues.addAll(issues);
		}
		
		System.out.println("LAYOUT ISSUES FOUND:");
		for(String issue: layoutIssues) {
			System.out.println(issue);
		}
		
	}

	private static void printStats(Map<String, DomNode> doms, String[] browsers) {
		System.out.println("*** DOM Match Stats ***");
		DomVisitor v1 = new NodeCountVisitor();
		doms.get(browsers[0]).accept(v1, true);
		System.out.println("\nDOM1 Stats:\n"+v1);
		
		DomVisitor v2 = new NodeCountVisitor();
		doms.get(browsers[1]).accept(v2, true);
		System.out.println("\nDOM2 Stats:\n"+v2);
	}
	
	private static void printAlignmentGraph(AlignmentGraph ag){
		System.out.println("***** ALIGNMENT GRAPH *****");
		System.out.println(ag);
	}

	private static Map<String, DomNode> loadDoms(String[] browsers) {
		Map<String, DomNode> doms = new HashMap<>();
		JsonDomParser parser = new JsonDomParser();
		
		for(String browser : browsers) {
			String file = OUTPUT + browser + "/dom.js";
			try {
				String domStr = FileUtils.readFileToString(new File(file));	
				System.out.println(domStr);
				doms.put(browser, parser.parseJsonDom(domStr));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return doms;
	}

	private static void capturePageModel(String url, Map<String, WebDriver> browsers) {

		try {
			for(String browser : browsers.keySet()) {
				
				WebDriver driver = browsers.get(browser);
				driver.get(url);
				
				String outFolder = OUTPUT+browser;
				System.out.println("Saving data to "+ outFolder);
			
				FileUtils.forceMkdir(new File(outFolder));
				
				FileUtils.writeStringToFile(new File(outFolder+"/dom.js"), extractDOM(url, driver));
				
				captureScreenshot(new File(outFolder+"/screenshot.png"), driver);
				
				driver.quit();
				
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	private static String extractDOM(String url, WebDriver driver) {
		JavascriptExecutor js = (JavascriptExecutor) driver;
		String script = Utils.getPkgFileContents(LayoutTesting.class, "webdiff2.js");

		String domStr = (String) js.executeScript(script);

		System.out.println(domStr);

		return domStr;
	}

	private static void captureScreenshot(File screenshot, WebDriver driver) {
		File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
		try {
			FileUtils.copyFile(scrFile, screenshot);
		} catch (IOException e) {
			System.err.println("Error saving screenshot");
			e.printStackTrace();
		}
	}
	
}

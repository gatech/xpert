package edu.gatech.xpert;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.safari.SafariDriver;

public class Utils {

	public static WebDriver getWebDriver(String id) {
		switch (id) {
		case "ie":
			return new InternetExplorerDriver();
		case "ff":
			return new FirefoxDriver();
		case "ch":
			return new ChromeDriver();
		case "as":
			return new SafariDriver();
		}
		return null;
	}
	
	static Map<String, WebDriver> getWebDrivers(String[] browsers) {
		Map<String, WebDriver> drivers = new HashMap<>();		
		for(String br: browsers) {
			drivers.put(br, getWebDriver(br));
		}
		return drivers;
	}

	/**
	 * Read a file that is in the package structure
	 * 
	 * @param pkgFileName
	 * @return file contents
	 */
	public static String getPkgFileContents(Class cls, String pkgFileName) {
		StringWriter writer = new StringWriter();
		try {
			IOUtils.copy(cls.getResourceAsStream(pkgFileName), writer);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return writer.toString();
	}

}

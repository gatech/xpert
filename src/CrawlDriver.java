import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.crawljax.browser.EmbeddedBrowser.BrowserType;
import com.crawljax.core.CrawljaxRunner;
import com.crawljax.core.configuration.BrowserConfiguration;
import com.crawljax.core.configuration.CrawljaxConfiguration;
import com.crawljax.core.configuration.CrawljaxConfiguration.CrawljaxConfigurationBuilder;
import com.crawljax.oraclecomparator.OracleComparator;
import com.crawljax.oraclecomparator.comparators.AttributeComparator;
import com.crawljax.oraclecomparator.comparators.ScriptComparator;
import com.crawljax.oraclecomparator.comparators.StyleComparator;
import com.crawljax.plugins.crawloverview.CrawlOverview;

public class CrawlDriver {

	public static void main(String[] args) {

		CrawljaxConfigurationBuilder builder = CrawljaxConfiguration.builderFor("http://bear.cc.gatech.edu/conference/index.html");

		builder.setMaximumDepth(2);
		builder.setMaximumStates(10);
		
		OracleComparator styleAttrComp = new OracleComparator("style-attr-ignore", new AttributeComparator("style"));
		builder.crawlRules().addOracleComparator(styleAttrComp);
		
		

		builder.crawlRules().clickOnce(false);

		//builder.crawlRules().click("A");
		builder.crawlRules().click("A");
		builder.crawlRules().click("BUTTON");

		// Set rules for custom_widgets
		builder.crawlRules().click("IMG");

		BrowserType bt = BrowserType.FIREFOX;
		// BrowserType bt = BrowserType.FIREFOX;

		BrowserConfiguration bc = new BrowserConfiguration(bt, 1);
		builder.setBrowserConfig(bc);

		builder.addPlugin(new CrawlOverview());

		builder.setOutputDirectory(new File("./output"));

		CrawljaxRunner crawljax = new CrawljaxRunner(builder.build());
		crawljax.call();
		crawljax.stop();
	}

}
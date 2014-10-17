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

		CrawljaxConfigurationBuilder builder = CrawljaxConfiguration.builderFor("{{ config.url }}");

		builder.setMaximumDepth({{ config.depth }});
		builder.setMaximumStates({{ config.states }});

		OracleComparator styleAttrComp = new OracleComparator("style-attr-ignore", new AttributeComparator("style"));
		builder.crawlRules().addOracleComparator(styleAttrComp);

		{%- if config.ignore_style == 'true' %}
		OracleComparator styleComp = new OracleComparator("style-ignore", new StyleComparator());
		builder.crawlRules().addOracleComparator(styleComp);
		{%- endif %}

		{%- if config.ignore_script == 'true' %}
		OracleComparator scriptComp = new OracleComparator("script-ignore", new ScriptComparator());
		builder.crawlRules().addOracleComparator(scriptComp);
		{%- endif %}

		builder.crawlRules().clickOnce({{ config.click_once }});

		//builder.crawlRules().click("A");

		{%- for item in config.click %}
		builder.crawlRules().click("{{ item }}");
		{%- endfor %}

		// Set rules for custom_widgets
		{%- for item in config.widgets_click %}
		builder.crawlRules().click("{{ item }}");
		{%- endfor %}

		{%- for item in config.widgets_dont_click %}
		builder.crawlRules().dontClick("{{ item }}");
		{%- endfor %}

		{%- for item in config.widgets_dont_click_children %}
		builder.crawlRules().dontClickChildrenOf("{{ item }}");
		{%- endfor %}

		BrowserType bt = BrowserType.{{ config.browser }};
		// BrowserType bt = BrowserType.FIREFOX;

		BrowserConfiguration bc = new BrowserConfiguration(bt, 1);
		builder.setBrowserConfig(bc);

		builder.addPlugin(new CrawlOverview());

		builder.setOutputDirectory(new File("{{ config.outDir }}/output"));

		CrawljaxRunner crawljax = new CrawljaxRunner(builder.build());
		crawljax.call();

	}

}

function showDiffGraph() {
	var browser1 = document.getElementById("browser1Name").value;
	var browser2 = document.getElementById("browser2Name").value;
	document.getElementById("cm1").style.visibility = "visible";
	document.getElementById("cm").style.height = "96%";
	document.getElementById("cm2").innerHTML = "";
	document.getElementById("cm2").style.height = "0%";
	document.getElementById("cm3").innerHTML = "";
	document.getElementById("cm3").style.height = "0%";
	document.getElementById("cm41").innerHTML = "";
	document.getElementById("cm41").style.height = "0%";
	document.getElementById("cm42").innerHTML = "";
	document.getElementById("cm42").style.height = "0%";

	document.getElementById("li_diffgraph").className = "current";
	document.getElementById("li_br1").className = "";
	document.getElementById("li_br2").className = "";
	document.getElementById("li_viscbd").className = "dis";
	document.getElementById("li_domcbd").className = "dis";
	document.getElementById("viscbd").className = "dis";
	document.getElementById("domcbd").className = "dis";

}

function showVisualDifferences() {
	if (document.getElementById("clickedNode").value != "") {
		document.getElementById("cm1").style.visibility = "hidden";
		document.getElementById("cm").style.height = "0%";
		document.getElementById("cm2").innerHTML = "";
		document.getElementById("cm2").style.height = "0%";
		document.getElementById("cm3").innerHTML = "";
		document.getElementById("cm3").style.height = "0%";
		document.getElementById("cm41").innerHTML = "<iframe style='border: 1px solid' src='diffVis/"
				+ document.getElementById("state").value + ".html"
				+ "' id='e3' width='100%' height='100%'  name='crossbrowser'/>";
		document.getElementById("cm41").style.height = "94%";
		document.getElementById("cm42").innerHTML = "";
		document.getElementById("cm42").style.height = "0%";

		document.getElementById("li_diffgraph").className = "";
		document.getElementById("li_br1").className = "";
		document.getElementById("li_br2").className = "";
		document.getElementById("li_viscbd").className = "current";
		document.getElementById("li_domcbd").className = "";
	}
}

function showDOMDifferences() {
	if (document.getElementById("clickedNode").value != "") {
		document.getElementById("cm1").style.visibility = "hidden";
		document.getElementById("cm").style.height = "0%";
		document.getElementById("cm1").style.size = "10px";
		document.getElementById("cm2").innerHTML = "";
		document.getElementById("cm2").style.height = "0%";
		document.getElementById("cm3").innerHTML = "";
		document.getElementById("cm3").style.height = "0%";
		document.getElementById("cm41").innerHTML = "";
		document.getElementById("cm41").style.height = "0%";
		document.getElementById("cm42").innerHTML = "<iframe style='border: 1px solid' src='diffDOM/index.html?state="
				+ document.getElementById("state").value
				+ "' id='e3' width='100%' height='100%'  name='crossbrowser'/>";
		document.getElementById("cm42").style.height = "94%";

		document.getElementById("li_diffgraph").className = "";
		document.getElementById("li_br1").className = "";
		document.getElementById("li_br2").className = "";
		document.getElementById("li_viscbd").className = "";
		document.getElementById("li_domcbd").className = "current";
	}
}

function highlightNode(graphId, ellipseNodeId, graphId1, ellipseNodeId1) {
	var SVGDoc = document.getElementById(graphId).getSVGDocument();
	if (SVGDoc.getElementById(ellipseNodeId).getAttributeNS(null, "fill") != "cyan") {
		SVGDoc.getElementById(ellipseNodeId).setAttributeNS(null, "fill",
				"yellow");
		if (document.getElementById(graphId1) != undefined) {
			var SVGDoc1 = document.getElementById(graphId1).getSVGDocument();
			SVGDoc1.getElementById(ellipseNodeId1).setAttributeNS(null, "fill",
					"yellow");
		}
	}

}

function clickHighlightNode(graphId, ellipseNodeId, graphId1, ellipseNodeId1) {
	if (document.getElementById("perspective").value == "diff") {

		var prevNode = document.getElementById("prevClickedNode").value;
		if (prevNode != "") {
			// To get id of corresponding Node
			var graphNum;
			if (prevNode.split("_")[0].split("h")[1] == "1") {
				graphNum = "2";
			} else {
				graphNum = "1";
			}
			var prevNode1 = "graph" + graphNum + "_" + prevNode.split("_")[1]
					+ "_e";
		}

		var SVGDoc = document.getElementById(graphId).getSVGDocument();

		SVGDoc.getElementById(ellipseNodeId).setAttributeNS(null, "fill",
				"cyan");

		if (prevNode != "")
			SVGDoc.getElementById(prevNode)
					.setAttributeNS(null, "fill", "none");

		if (document.getElementById(graphId1) != undefined) {
			var SVGDoc1 = document.getElementById(graphId1).getSVGDocument();

			SVGDoc1.getElementById(ellipseNodeId1).setAttributeNS(null, "fill",
					"cyan");
			if (prevNode != "")
				SVGDoc1.getElementById(prevNode1).setAttributeNS(null, "fill",
						"none");
		}

	}

}

function removeClickHighlightNode() {
	var prevNode = document.getElementById("clickedNode").value;
	if (prevNode != "") {
		// To get id of corresponding Node
		var graphNum;
		if (prevNode.split("_")[0].split("h")[1] == "1") {
			graphNum = "2";
		} else {
			graphNum = "1";
		}
		var prevNode1 = "graph" + graphNum + "_" + prevNode.split("_")[1]
				+ "_e";
	}

	var SVGDoc = document.getElementById('e1').getSVGDocument();

	if (prevNode != "")
		SVGDoc.getElementById(prevNode).setAttributeNS(null, "fill", "none");

	var SVGDoc1 = document.getElementById('e2').getSVGDocument();

	if (prevNode != "")
		SVGDoc1.getElementById(prevNode1).setAttributeNS(null, "fill", "none");

}



function removeHighlightOfNode(graphId, ellipseNodeId, graphId1, ellipseNodeId1) {

	var SVGDoc = document.getElementById(graphId).getSVGDocument();
	if (SVGDoc.getElementById(ellipseNodeId) != null && SVGDoc.getElementById(ellipseNodeId).getAttributeNS(null, "fill") == "yellow")
		SVGDoc.getElementById(ellipseNodeId).setAttributeNS(null, "fill",
				"none");

	if (document.getElementById(graphId1) != undefined) {
		var SVGDoc1 = document.getElementById(graphId1).getSVGDocument();
		if (SVGDoc1.getElementById(ellipseNodeId1).getAttributeNS(null, "fill") == "yellow")
			SVGDoc1.getElementById(ellipseNodeId1).setAttributeNS(null, "fill",
					"none");
	}
}

function highlightEdge(graphId, nodeId) {

	var SVGDoc = document.getElementById(graphId).getSVGDocument();

	if(SVGDoc != null &&  SVGDoc.getElementById(nodeId) != null) {
	   SVGDoc.getElementById(nodeId).setAttributeNS(null, "stroke-width", "8");
	   SVGDoc.getElementById(nodeId).setAttributeNS(null, "font-weight", "bold");
	   SVGDoc.getElementById(nodeId).getElementsByTagName('text')[0]
			.setAttributeNS(null, "fill", "black");
	}
			

}

function removeHighlightOfEdge(graphId, nodeId) {

	var SVGDoc = document.getElementById(graphId).getSVGDocument();

	SVGDoc.getElementById(nodeId).setAttributeNS(null, "stroke-width", "1");
	SVGDoc.getElementById(nodeId).setAttributeNS(null, "font-weight", "normal");
	SVGDoc.getElementById(nodeId).getElementsByTagName('text')[0]
			.setAttributeNS(null, "fill", "#B0B0B0");
}

function diffView() {
	var sigDiff = document.getElementById("sig_diffview").src.split("/");
	if (sigDiff[sigDiff.length - 1] == "red.png") {
		// Switch Signals
		document.getElementById("sig_diffview").src = "./src/img/green.png";
		document.getElementById("sig_navview").src = "./src/img/red.png";

		// Show Diff Graph
		document.getElementById("li_diffgraph").hidden = false;
		document.getElementById("li_viscbd").hidden = false;
		document.getElementById("li_domcbd").hidden = false;

		// Hide Browser Tabs
		document.getElementById("li_br1").hidden = true;
		document.getElementById("li_br2").hidden = true;

		document.getElementById("perspective").value = "diff";

		document.getElementById("sigtxt_diffview").style.backgroundColor = "#CCCCCC";
		document.getElementById("sigtxt_navview").style.backgroundColor = "white";
		// Show Diff Graph
		showDiffGraph();
		removeClickHighlightNode();
		setDefaults();

	}
}

function navView() {
	var sigDiff = document.getElementById("sig_navview").src.split("/");
	if (sigDiff[sigDiff.length - 1] == "red.png") {
		// Switch Signals
		document.getElementById("sig_navview").src = "./src/img/green.png";
		document.getElementById("sig_diffview").src = "./src/img/red.png";

		// Hide Diff Graph
		document.getElementById("li_diffgraph").hidden = true;

		// Show Browser Tabs
		document.getElementById("li_br1").hidden = false;
		document.getElementById("li_br2").hidden = false;

		// Hide difference tabs
		document.getElementById("li_viscbd").hidden = true;
		document.getElementById("li_domcbd").hidden = true;

		document.getElementById("perspective").value = "nav";

		document.getElementById("sigtxt_diffview").style.backgroundColor = "white";
		document.getElementById("sigtxt_navview").style.backgroundColor = "#CCCCCC";

		// Show Browser Graph
		showBrowser1Graph();
	}
}

function showBrowser1Graph() {
  var browser1Name = document.getElementById("browser1Name").value;
  document.getElementById("cm1").style.visibility = "hidden"; 
  document.getElementById("cm").style.height = "0%";
  document.getElementById("cm2").innerHTML = "<iframe style='border: 1px solid' src='./browsers/"+browser1Name+"/"+browser1Name+".html' id='browser1' width='100%' height='100%'  name='browser1'/>";
  document.getElementById("cm2").style.height = "94%";
  document.getElementById("cm3").innerHTML = "";
  document.getElementById("cm3").style.height = "0%";
  document.getElementById("cm41").innerHTML = "";
  document.getElementById("cm41").style.height = "0%";
  document.getElementById("cm42").innerHTML = "";
  document.getElementById("cm42").style.height = "0%";

  document.getElementById("li_diffgraph").className  ="past";   
	document.getElementById("li_br1").className  ="current"; 
	document.getElementById("li_br2").className  =""; 
	document.getElementById("li_viscbd").className  =""; 
	document.getElementById("li_domcbd").className  ="";
}

function showBrowser2Graph() {
  var browser2Name = document.getElementById("browser2Name").value;
  document.getElementById("cm1").style.visibility = "hidden"; 
  document.getElementById("cm").style.height = "0%";
  document.getElementById("cm2").innerHTML = "";
  document.getElementById("cm2").style.height = "0%";
  document.getElementById("cm3").innerHTML = "<iframe style='border: 1px solid' src='./browsers/"+browser2Name+"/"+browser2Name+".html' id='browser2' width='100%' height='100%'  name='browser2'/>";
  document.getElementById("cm3").style.height = "94%";
  document.getElementById("cm41").innerHTML = "";
  document.getElementById("cm41").style.height = "0%";
  document.getElementById("cm42").innerHTML = "";
  document.getElementById("cm42").style.height = "0%";
  
  document.getElementById("li_diffgraph").className  ="past";   
	document.getElementById("li_br1").className  =""; 
	document.getElementById("li_br2").className  ="current"; 
	document.getElementById("li_viscbd").className  =""; 
	document.getElementById("li_domcbd").className  ="";
}


function setDefaults() {
	document.getElementById("perspective").value = "diff";
	document.getElementById("cm").style.height = "96%";
	document.getElementById("clickedNode").value = "";
	document.getElementById("prevClickedNode").value = "";
}

var stack = new Array();

// also called from SVGPan.js while clicking on node from the graph
function clearStack() {

	stack = new Array();
}

function pushStack() {
	var stateName = document.getElementById("currentState").innerHTML;
	stack.push(stateName);
	disableInitialStateBtn(stateName);
}

function popStack() {
	var popVal = stack.pop();
	if (popVal == undefined) {
		// index screen should always been in the stack
		return "";
	} else {
		return popVal;
	}

}
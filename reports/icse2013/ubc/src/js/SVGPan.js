var RADIUS = 39;
var OFFSET_X = -40;
var OFFSET_Y = -42;

var IMG_NORMAL = 80;

var root = document.documentElement;

var state = 'none', stateTarget, stateOrigin, stateTf;

function stateZoom(el){
	var newImg = new Image();
	newImg.src = el.src;
	el.parentNode.parentNode.style.zIndex = 100;
	el.style.width = (newImg.width * .4) + "px";
	el.style.height = (newImg.height * .4) + "px";
}

function stateUnzoom(el){
	el.parentNode.parentNode.style.zIndex = 20;
	el.style.width = IMG_NORMAL + "px";
	el.style.height = IMG_NORMAL + "px";
}

var previousHighLightedImageId = "";

function showImage(imgid) {
	
	// no need to highlight the edge when user in navigation view
	if(top.document.getElementById("perspective").value=="nav") {
			  return;
	}	
   
   document.getElementById(imgid).setAttributeNS(null, "width", "150px");
   document.getElementById(imgid).setAttributeNS(null, "height", "150px");

   if(previousHighLightedImageId != "") {
      hideImage(previousHighLightedImageId);
	  previousHighLightedImageId = imgid;
   }

}

function hideImage(imgid) {
	// no need to highlight the edge when user in navigation view
	if(top.document.getElementById("perspective").value=="nav") {
			  return;
	}

document.getElementById(imgid).setAttributeNS(null, "width", "1px");
document.getElementById(imgid).setAttributeNS(null, "height", "1px");

}

function loadState(state, browserName) {

	var windowName = window.name;
	var stateName = state.substring(state.lastIndexOf("/") +1, state.indexOf(".html"));
	
    if(parent.document.getElementById("graphOrState") != null) {
	
       parent.document.getElementById("graphOrState").value = "state";

       parent.document.getElementById("stateFrame").src = state;
       parent.document.getElementById("stateFrame").style.display = "block";
       parent.document.getElementById("graphPanel").style.display = "none";
    }
	
	else {	
	       var d = new Date();
           handleShowState(state, browserName);
		   	   	  
	   }	   
	   // clear all the states from Stack
		parent.clearStack();
		parent.disableInitialStateBtn(stateName); 
}

function handleShowState(state, browserName) {
     var windowName = window.name;
	if(windowName == 'browser1') {			
			  	top.document.getElementById("cm1").style.visibility = "hidden";
				top.document.getElementById("cm").style.height = "0%";
				top.document.getElementById("cm2").innerHTML = "<iframe style='border: 1px solid' src='"+state+"' id='e3' width='100%' height='100%'  name='crossbrowser'/>";
				top.document.getElementById("cm2").style.height = "94%";
				top.document.getElementById("cm3").innerHTML = "";
				top.document.getElementById("cm3").style.height = "0%";
				top.document.getElementById("cm41").style.height = "0%";
				top.document.getElementById("cm41").innerHTML = "";
				top.document.getElementById("cm42").innerHTML = "";
				top.document.getElementById("cm42").style.height = "0%";

				top.document.getElementById("li_diffgraph").className = "";
				top.document.getElementById("li_br1").className = "";
				top.document.getElementById("li_br2").className = "";
				top.document.getElementById("li_viscbd").className = "current";
				top.document.getElementById("li_domcbd").className = "";
				
		     }
	else if(windowName == 'browser2') {	
			    top.document.getElementById("cm1").style.visibility = "hidden";
				top.document.getElementById("cm").style.height = "0%";
				top.document.getElementById("cm3").innerHTML = "<iframe style='border: 1px solid' src='"+state+"' id='e3' width='100%' height='100%'  name='crossbrowser'/>";
				top.document.getElementById("cm3").style.height = "94%";
				top.document.getElementById("cm2").innerHTML = "";
				top.document.getElementById("cm2").style.height = "0%";
				top.document.getElementById("cm41").style.height = "0%";
				top.document.getElementById("cm41").innerHTML = "";
				top.document.getElementById("cm42").innerHTML = "";
				top.document.getElementById("cm42").style.height = "0%";

				top.document.getElementById("li_diffgraph").className = "";
				top.document.getElementById("li_br1").className = "";
				top.document.getElementById("li_br2").className = "";
				top.document.getElementById("li_viscbd").className = "current";
				top.document.getElementById("li_domcbd").className = "";
				
    }	
}

function loadVisState(path) {
	
    var windowName = window.name;
	var stateName = top.document.getElementById("state").value;
	
    if(parent.document.getElementById("graphOrState") != null) {
	
       parent.document.getElementById("graphOrState").value = "state";

       parent.document.getElementById("stateFrame").src = path;
       parent.document.getElementById("stateFrame").style.display = "block";
       parent.document.getElementById("graphPanel").style.display = "none";
    }
	
	else {	
	       var d = new Date();          
		   if(clickAt != 0) {		   
		     if(windowName == 'browser1') {			
			    top.document.getElementById("cm2").innerHTML = "<iframe style='border: 1px solid' src='./diffDOM/index.html?state="+stateName+"' id='e3' width='100%' height='100%'  name='crossbrowser'/>";
				top.document.getElementById("cm1").style.visibility = "hidden"; 
				top.document.getElementById("cm3").innerHTML = "";
				top.document.getElementById("cm41").innerHTML = "";
				top.document.getElementById("cm42").innerHTML = "";
				
				  document.getElementById("dg").className  ="";   
				  document.getElementById("br1").className  ="here"; 
				  document.getElementById("br2").className  =""; 
				  document.getElementById("cbd").className  =""; 
		     }
		     else if(windowName == 'browser2') {	
			    top.document.getElementById("cm3").innerHTML = "<iframe style='border: 1px solid' src='./diffDOM/index.html?state="+stateName+"' id='e3' width='100%' height='100%'   name='crossbrowser'/>";
				top.document.getElementById("cm1").style.visibility = "hidden"; 
				top.document.getElementById("cm2").innerHTML = "";
				top.document.getElementById("cm41").innerHTML = "";
				top.document.getElementById("cm42").innerHTML = "";	
				
				  document.getElementById("dg").className  ="";   
				  document.getElementById("br1").className  =""; 
				  document.getElementById("br2").className  ="here"; 
				  document.getElementById("cbd").className  =""; 
		     }
		     clickAt = 0;
			 
		   }
		   else {
			 clickAt = d.getTime();
		     savTO = setTimeout("handleDoubleClick('"+stateName+"', '"+path+"')", dcTime);
		  }		  
	   }
	   
	   // clear all the states from Stack
		parent.clearStack();
		parent.disableInitialStateBtn(stateName); 
}

function selState(state,clickedNode,path,browsername) {
	
	if(top.document.getElementById("perspective").value=="diff"){
		top.document.getElementById("li_viscbd").hidden = false;
		top.document.getElementById("li_viscbd").className = "";
		top.document.getElementById("viscbd").className = "";
		top.document.getElementById("li_domcbd").hidden = false;
		top.document.getElementById("li_domcbd").className = "";
		top.document.getElementById("domcbd").className = "";
		var prevState = top.document.getElementById("state").value;
		top.document.getElementById("state").value = state;
		top.document.getElementById("prevClickedNode").value = top.document.getElementById("clickedNode").value;
		top.document.getElementById("clickedNode").value = clickedNode;
		if(top.document.getElementById("clickedNode").value == top.document.getElementById("prevClickedNode").value 
				&& top.document.getElementById("clickedNode").value!="" && top.document.getElementById("prevClickedNode").value!=""){
			showSummary("overall",prevState);
		}
		else{
			showSummary(state,prevState);
		}
		
		
	}
	else if(top.document.getElementById("perspective").value=="individual") {
	   loadState(path, browsername);
	}
	
	else if(top.document.getElementById("perspective").value=="nav") {
	 // open browsers/browsername/browsername.html and specify the state name
	  handleShowState("./browsers/" + browsername + "/" + browsername + ".html?state=./crawloverview/states/" + state + ".html", browsername);
	}
	
	else {	    
		loadState("browsers/" + browsername + path, browsername);
	}
}

function showSummary(state,prevState){
	if(state=="overall"){
		top.document.getElementById("res_"+prevState+"_sum").style.display = "none";
		top.document.getElementById("res_"+state+"_sum").style.display = "none";
		top.document.getElementById("res_overall_sum").style.display = "";
	}
	else{
		top.document.getElementById("res_overall_sum").style.display = "none";
		top.document.getElementById("res_"+prevState+"_sum").style.display = "none";
		top.document.getElementById("res_"+state+"_sum").style.display = "";
	}

}


function handleDoubleClick(state, path) {

     clearTimeout( savTO ); 
	 savTO = null;
	 if(clickAt != 0) {
	 // will work when double click happens
		var windowName = window.name;
		
			
		   top.document.getElementById("cm2").innerHTML = "<iframe style='border: 1px solid' src='"+path+"?state="+state+"' id='e1' width='100%' height='100%'  name='browser1'/>";
				top.document.getElementById("cm1").style.visibility = "hidden"; 
				top.document.getElementById("cm3").innerHTML = "";
				top.document.getElementById("cm41").innerHTML = "";
				top.document.getElementById("cm42").innerHTML = "";
				// highlight this tab
		        top.document.getElementById("br1").className = "current";
                // unhighlight other tabs
		        top.document.getElementById("dg").className = "hover";
		        top.document.getElementById("cbd").className = "hover";
		        top.document.getElementById("br2").className = "hover";
		
		// highlight this tab
		top.document.getElementById("cbd").className = "current";
		// unhighlight other tabs
		top.document.getElementById("dg").className = "hover";
		top.document.getElementById("br1").className = "hover";
		top.document.getElementById("br2").className = "hover";
	}
	clickAt = 0;
}
 var dcTime=250;    // doubleclick time
 var dcDelay=100;   // no clicks after doubleclick
 var clickAt=0;        // time of doubleclick
 var savEvent=null; // save Event for handling doClick().
 var savEvtTime=0;  // save time of click event.
 var savTO=null;    // handle of click setTimeOut
 
 
var state = 'none', stateTarget, stateOrigin, stateTf;

setupHandlers(root);

/**
 * Register handlers
 */
function setupHandlers(root){
	setAttributes(root, {
		"onmouseup" : "add(evt)",
		"onmousedown" : "handleMouseDown(evt)",
		"onmousemove" : "handleMouseMove(evt)",
		"onmouseup" : "handleMouseUp(evt)",
		// "onmouseout" : "handleMouseUp(evt)", // Decomment this to stop the
		// pan functionality when dragging out of the SVG element
	});

	if(navigator.userAgent.toLowerCase().indexOf('webkit') >= 0)
		window.addEventListener('mousewheel', handleMouseWheel, false); // Chrome/Safari
	else
		window.addEventListener('DOMMouseScroll', handleMouseWheel, false); // Others
}

/**
 * Instance an SVGPoint object with given event coordinates.
 */
function getEventPoint(evt) {

    if(evt == undefined)
	  return;
	  
	var p = root.createSVGPoint();

	p.x = evt.clientX;
	p.y = evt.clientY;

	return p;
}

/**
 * Sets the current transform matrix of an element.
 */
function setCTM(element, matrix) {
	var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";

	element.setAttribute("transform", s);
}

/**
 * Dumps a matrix to a string (useful for debug).
 */
function dumpMatrix(matrix) {
	var s = "[ " + matrix.a + ", " + matrix.c + ", " + matrix.e + "\n  " + matrix.b + ", " + matrix.d + ", " + matrix.f + "\n  0, 0, 1 ]";

	return s;
}

/**
 * Sets attributes of an element.
 */
function setAttributes(element, attributes){
	for (i in attributes)
		element.setAttributeNS(null, i, attributes[i]);
}

/**
 * Handle mouse move event.
 */
function handleMouseWheel(evt) {

    if(evt == undefined)
	  return;
	
	if(evt.preventDefault)
		evt.preventDefault();

	evt.returnValue = false;

	var svgDoc = evt.target.ownerDocument;

	var delta;

	if(evt.wheelDelta)
		delta = evt.wheelDelta / 3600; // Chrome/Safari
	else
		delta = evt.detail / -90; // Mozilla

	var z = 1 + delta; // Zoom factor: 0.9/1.1

	var g = svgDoc.getElementById("graph1");
	
	var p = getEventPoint(evt);

	p = p.matrixTransform(g.getCTM().inverse());

	// Compute new scale matrix in current mouse position
	var k = root.createSVGMatrix().translate(p.x, p.y).scale(z).translate(-p.x, -p.y);

        setCTM(g, g.getCTM().multiply(k));

	stateTf = stateTf.multiply(k.inverse());
}

/**
 * Handle mouse move event.
 */
function handleMouseMove(evt) {

    if(evt == undefined)
	  return;
   
	if(evt.preventDefault)
		evt.preventDefault();

	evt.returnValue = false;

	var svgDoc = evt.target.ownerDocument;

	var g = svgDoc.getElementById("graph1");

	if(state == 'pan' || state == 'move') {
		// Pan mode
		var p = getEventPoint(evt).matrixTransform(stateTf);

		setCTM(g, stateTf.inverse().translate(p.x - stateOrigin.x, p.y - stateOrigin.y));
	} 
}

/**
 * Handle click event.
 */
function handleMouseDown(evt) {

    if(evt == undefined)
	  return;

	if(evt.preventDefault)
		evt.preventDefault();

	evt.returnValue = false;

	var svgDoc = evt.target.ownerDocument;

	var g = svgDoc.getElementById("graph1");

	if(evt.target.tagName == "svg") {
		// Pan mode
		state = 'pan';

		stateTf = g.getCTM().inverse();

		stateOrigin = getEventPoint(evt).matrixTransform(stateTf);
	} else {
		// Move mode
		state = 'move';

		stateTarget = evt.target;

		stateTf = g.getCTM().inverse();

		stateOrigin = getEventPoint(evt).matrixTransform(stateTf);
	}
}

/**
 * Handle mouse button release event.
 */
function handleMouseUp(evt) {

    if(evt == undefined)
	  return;
	  
	if(evt.preventDefault)
		evt.preventDefault();

	evt.returnValue = false;

	var svgDoc = evt.target.ownerDocument;

	if(state == 'pan' || state == 'move') {
		// Quit pan mode
		state = '';
	}
}



// <set attributeName="stroke-width" begin="graph1_edge0.mouseover"
// end="graph1_edge0.mouseout" fill="remove" from="2" restart="always" to="8"
// //xlink:actuate="onLoad" xlink:show="other" xlink:type="simple"
// xmlns:xlink="http://www.w3.org/1999/xlink"></set>
// <set attributeName="font-weight" begin="graph1_edge0.mouseover"
// end="graph1_edge0.mouseout" fill="remove" from="normal" restart="always"
// to="bold" xlink:actuate="onLoad" xlink:show="other" xlink:type="simple"
// xmlns:xlink="http://www.w3.org/1999/xlink"></set>

function handleEdgeMouseOver(nodeId, xpath) {
  
  // no need to highlight the edge when user in navigation view
  if(top.document.getElementById("perspective").value=="nav") {
	  return;
  }

  var edgeNode = document.getElementById(nodeId);
  document.getElementById(nodeId).getElementsByTagName('text')[0].textContent = xpath;
  edgeNode.setAttributeNS(null, "stroke-width", "8");
  edgeNode.setAttributeNS(null, "font-weight", "bold");
  document.getElementById(nodeId).getElementsByTagName('text')[0].setAttributeNS(null, "font-size", "18");
  document.getElementById(nodeId).getElementsByTagName('text')[0].setAttributeNS(null, "fill", "black");

}

function handleEdgeMouseOut(nodeId, xpath) {
	
	// no need to highlight the edge when user in navigation view
   if(top.document.getElementById("perspective").value=="nav") {
		  return;
   }
   var edgeNode = document.getElementById(nodeId);
   document.getElementById(nodeId).getElementsByTagName('text')[0].textContent = xpath;
   edgeNode.setAttributeNS(null, "font-weight", "normal");
   edgeNode.setAttributeNS(null, "stroke-width", "1");
   document.getElementById(nodeId).getElementsByTagName('text')[0].setAttributeNS(null, "font-size", "14");
   document.getElementById(nodeId).getElementsByTagName('text')[0].setAttributeNS(null, "fill", "#B0B0B0");
}
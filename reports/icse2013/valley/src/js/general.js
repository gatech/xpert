var dataFolder = "data/";

function expand() {
    var stateName = getReqParam("state");
   if(stateName != "") {
   	 document.getElementById(stateName).style.display = "";
     }
setUp();
}

function getReqParam(paramName) {
   paramName = paramName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regexS = "[\\?&]"+paramName+"=([^&#]*)";
   var regex = new RegExp( regexS );
   var results = regex.exec( window.location.href );
   if( results == null )
     return "";
	   else {
	     return results[1];
	   }
} 

function setUp(){
   	
   	$('#dom_1_current').scroll(function(){
$('#dom_1_original').scrollTop(this.scrollTop);
$('#dom_1_original').scrollLeft(this.scrollLeft);
  });
  $('#dom_1_original').scroll(function(){
    $('#dom_1_current').scrollTop(this.scrollTop);
    $('#dom_1_current').scrollLeft(this.scrollLeft);
  });
  
  $('#dom_2_current').scroll(function(){
		$('#dom_2_original').scrollTop(this.scrollTop);
		$('#dom_2_original').scrollLeft(this.scrollLeft);
	  });
	  $('#dom_2_original').scroll(function(){
	        $('#dom_2_current').scrollTop(this.scrollTop);
	        $('#dom_2_current').scrollLeft(this.scrollLeft);
	  });
	  
	  $('#dom_3_current').scroll(function(){
$('#dom_3_original').scrollTop(this.scrollTop);
$('#dom_3_original').scrollLeft(this.scrollLeft);
  });
  $('#dom_3_original').scroll(function(){
    $('#dom_3_current').scrollTop(this.scrollTop);
    $('#dom_3_current').scrollLeft(this.scrollLeft);
  });
  loadDom("1","current");
	loadDom("2","current");
	loadDom("3","current");
	loadDom("1","original");
	loadDom("2","original");
	loadDom("3","original");
}
function toggleError(id){
    toggleDOMs(id);
	$("#error" + id).toggle();	
	
	var text = document.getElementById("error_"+id).innerHTML;
	
	if(text.indexOf("+") > -1) {
	    document.getElementById("error_"+id).innerHTML = text.replace(text.charAt(0), "-");
	
	}
	else {
	   document.getElementById("error_"+id).innerHTML = text.replace(text.charAt(0), "+");
	}
}

function loadDom(domId, type){
	var id = "dom_" + domId + "_" + type;
	if($("#" + id).html() == ""){
		$.ajax({
		  url: dataFolder + id + ".txt",
		  cache: false,
		  dataType: "text",
		  success: function(html){
			$("#" + id).html("<pre>" + html + "</pre>");
		  }
		});
	}
}

function toggleDOMs(errorId){
	$("#doms_error" + errorId).toggle();
	loadDom(errorId, "current");
	loadDom(errorId, "original");
}

function toggleHighlight(highlightId, element){
	var orgId = highlightId + "_original";
	var curId = highlightId + "_current";
	setTimeout(function(){
		if(element.checked){
			$("#" + curId).css("background-color", $("#" + "color_" + highlightId).css("background-color"));
			$("#" + orgId).css("background-color", $("#" + "color_" + highlightId).css("background-color"));
		}else{
			$("#" + curId).css("background-color", "");
			$("#" + orgId).css("background-color", "");
		}	
	}, 100);
	
}

function toggleSelectAll(errId){
	$('input[id*="cbx_'+errId+'"]').trigger('click');
}

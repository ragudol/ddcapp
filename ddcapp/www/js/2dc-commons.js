/*http://www.forosdelweb.com/f179/quitar-acentos-con-jquery-replace-899812/*/
function remove_accent(str) {
	var map={'À':'A','Á':'A','Â':'A','Ã':'A','Ä':'A','Å':'A','Æ':'AE','Ç':'C','È':'E','É':'E','Ê':'E','Ë':'E','Ì':'I','Í':'I','Î':'I','Ï':'I','Ð':'D','Ñ':'N','Ò':'O','Ó':'O','Ô':'O','Õ':'O','Ö':'O','Ø':'O','Ù':'U','Ú':'U','Û':'U','Ü':'U','Ý':'Y','ß':'s','à':'a','á':'a','â':'a','ã':'a','ä':'a','å':'a','æ':'ae','ç':'c','è':'e','é':'e','ê':'e','ë':'e','ì':'i','í':'i','î':'i','ï':'i','ñ':'n','ò':'o','ó':'o','ô':'o','õ':'o','ö':'o','ø':'o','ù':'u','ú':'u','û':'u','ü':'u','ý':'y','ÿ':'y','Ā':'A','ā':'a','Ă':'A','ă':'a','Ą':'A','ą':'a','Ć':'C','ć':'c','Ĉ':'C','ĉ':'c','Ċ':'C','ċ':'c','Č':'C','č':'c','Ď':'D','ď':'d','Đ':'D','đ':'d','Ē':'E','ē':'e','Ĕ':'E','ĕ':'e','Ė':'E','ė':'e','Ę':'E','ę':'e','Ě':'E','ě':'e','Ĝ':'G','ĝ':'g','Ğ':'G','ğ':'g','Ġ':'G','ġ':'g','Ģ':'G','ģ':'g','Ĥ':'H','ĥ':'h','Ħ':'H','ħ':'h','Ĩ':'I','ĩ':'i','Ī':'I','ī':'i','Ĭ':'I','ĭ':'i','Į':'I','į':'i','İ':'I','ı':'i','Ĳ':'IJ','ĳ':'ij','Ĵ':'J','ĵ':'j','Ķ':'K','ķ':'k','Ĺ':'L','ĺ':'l','Ļ':'L','ļ':'l','Ľ':'L','ľ':'l','Ŀ':'L','ŀ':'l','Ł':'L','ł':'l','Ń':'N','ń':'n','Ņ':'N','ņ':'n','Ň':'N','ň':'n','ŉ':'n','Ō':'O','ō':'o','Ŏ':'O','ŏ':'o','Ő':'O','ő':'o','Œ':'OE','œ':'oe','Ŕ':'R','ŕ':'r','Ŗ':'R','ŗ':'r','Ř':'R','ř':'r','Ś':'S','ś':'s','Ŝ':'S','ŝ':'s','Ş':'S','ş':'s','Š':'S','š':'s','Ţ':'T','ţ':'t','Ť':'T','ť':'t','Ŧ':'T','ŧ':'t','Ũ':'U','ũ':'u','Ū':'U','ū':'u','Ŭ':'U','ŭ':'u','Ů':'U','ů':'u','Ű':'U','ű':'u','Ų':'U','ų':'u','Ŵ':'W','ŵ':'w','Ŷ':'Y','ŷ':'y','Ÿ':'Y','Ź':'Z','ź':'z','Ż':'Z','ż':'z','Ž':'Z','ž':'z','ſ':'s','ƒ':'f','Ơ':'O','ơ':'o','Ư':'U','ư':'u','Ǎ':'A','ǎ':'a','Ǐ':'I','ǐ':'i','Ǒ':'O','ǒ':'o','Ǔ':'U','ǔ':'u','Ǖ':'U','ǖ':'u','Ǘ':'U','ǘ':'u','Ǚ':'U','ǚ':'u','Ǜ':'U','ǜ':'u','Ǻ':'A','ǻ':'a','Ǽ':'AE','ǽ':'ae','Ǿ':'O','ǿ':'o'};
	var res='';
	for (var i=0;i<str.length;i++){
		c=str.charAt(i);res+=map[c]||c;
		}
	return res;
}; 


//http://www.netlobo.com/url_query_string_javascript.html

function gup( name ){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	var regexS = "[\\?&]"+name+"=([^&#]*)";  
	var regex = new RegExp( regexS );  
	var results = regex.exec( window.location.href ); 
	 if( results == null )    
		 return "";  
	 else    
		 return results[1];

}


function gupMap(dirmap, name){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	var regexS = "[\\?&]"+name+"=([^&#]*)";  
	var regex = new RegExp( regexS );  
	var results = regex.exec( dirmap ); 
	 if( results == null )    
		 return "";  
	 else    
		 return results[1];	
}

function imgError(image) {
    image.onerror = "";
    image.src = "img/empty.png";
    return true;
}

$(function() {
    FastClick.attach(document.body);
});

$(document).on('swiperight', function(event){
	//console.log("hago swipe desde el elemento: " + event.target.className);
	//el className del event.target contiene la cadena ui-slider-handler
	//luego para evitar que se desplieque el panel al utilizar el slider
	//incluimos en el if la condicion de que no estemos en un slider
	if (
		((event.target.className).indexOf("ui-slider") === -1) && 
		( $( '.ui-page-active' ).jqmData( 'panel' ) !== 'open' )
	   ) 
		{
        	$( '#nav-panel' ).panel( 'open' );
    	}
});


var scanCode = function() {
	console.log("Aqui llego");
	cordova.plugins.barcodeScanner.scan(
		      function (result) {
	    	      //alert("We got a barcode\n" +
	        	  //       "Result: " + result.text + "\n" +
	              //      "Format: " + result.format + "\n" +
	              //      "Cancelled: " + result.cancelled);
		          window.location.href = "search.html?type=b&q=" + result.text;
	    	  }, 
	      	function (error) {
	        	  alert("Ha fallado la lectura del scanner. Error: " + error);
	      	}
	   	);
	
};

// Wait for device API libraries to load
//
document.addEventListener("deviceready", initAppConf, false);

// device APIs are available
//

function initAppConf() {
	//$.event.special.swipe.scrollSupressionThreshold = (screen.availWidth) / 60;  
	// (default: 10) (pixels) – More than this horizontal displacement, and we will suppress scrolling.

	//$.event.special.swipe.horizontalDistanceThreshold = (screen.availWidth) / 4; 
	// (default: 30) (pixels) – Swipe horizontal displacement must be more than this.

	//$.event.special.swipe.verticalDistanceThreshold = (screen.availHeight) / 13; 
	// (default: 75) (pixels) – Swipe vertical displacement must be less than this.

	//$.event.special.swipe.durationThreshold = 1000; 
	// (default: 1000) (milliseconds) – More time than this, and it isn't a swipe.
	
	if ((device.platform == "iOS") && (parseFloat(device.version) >= 7.0)) {
	  $('.ios-status-bar-off').removeClass("ios-status-bar-off").addClass("ios-status-bar-on");
	  /*
	  	$('.ios-status-bar-off').each(function() {
	     $(this).removeClass("ios-status-bar-off").addClass("ios-status-bar-on");
	    //console.log("aqui cambio la cabecera" + $(this));
	  });
	  */
	}
};

/*
$(document).on('pageinit',function(){
	var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
	if (app){
			var devPlatform = device.platform;
			var devVersion = device.version;
			if ((devPlatform == "iOS") && (parseFloat(devVersion) >= 7.0)) {
			  $('.ios-status-bar-off').each(function() {
			     $(this).toggleClass("ios-status-bar-off ios-status-bar-on");
			     //console.log("aqui cambio la cabecera" + $(this));
			  });
			}
	}

});
*/
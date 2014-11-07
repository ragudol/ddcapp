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


function loadWineries(querystring){

	if (!window.endReached) {
	
			var output = $('#labelList');
			var liCarga = '<li class="liCarga" data-icon="false"><a href="#"><img src="css/images/icono-loading.gif"></img></a></li>';
			
			querystring += '&page=' + window.currentPage;
			console.log(querystring);
			
			$.ajax({
				//url: 'http://www.unmat.com/2dc/busqMarcas.php?&t=47&o=52&pmin=0&pmax=148&vmin=60&vmax=100',
				url: 'http://unmat.com/2dc/busqBodegas.php'+querystring,
				//url: 'http://www.unmat.com/2dc/conex.php',
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				timeout: 5000,
				beforeSend: function () {
					/*
					$.mobile.loading ('show', {
						text: 'Cargando',
						textVisible: true,
						theme: 'a',
						html: ""
					});
					*/
					if (window.page == 1){
					console.log("es la primera llamada");
					output.append(liCarga);
					output.listview("refresh");
					}
				},
				success: function(data, status){
					var clase = '';
					console.log(data.length);
		
					$('#moreResults-div').hide();
		
					if (data.length < 20){				
						console.log("NoHayMasRegistros");
						window.endReached = true;	
					}
					
					if ((data.length == 0) && (window.endReached == true)){
						output.append ('Ningún registro encontrado');
						}
					else {
						$.each(data, function(i,item){
		
							var inner = '';
							var iBodega = item.Bodega==null?'':item.Bodega;
							var iDenominacionOrigen = item.DenominacionOrigen==null?'':item.DenominacionOrigen;
							var iProvincia = item.Provincia==null?'':''+item.Provincia +'';
							
								
							inner += '<li> <a href="bodega.html?id=' + item.IdBodega + '" data-ajax="false">';
							inner += '<span>' + iBodega + '</span> <br/>';
							inner += '<span class="smallfont">' + iProvincia + '</span> </a> </li>';
								
							
							output.append(inner);
							
							}
		
						);//each data
						if ($(window).height() < $(document).height()){
							//console.log("adjunto liCarga");
							output.append(liCarga);
						}
						output.listview("refresh");
						window.currentPage +=1;
					}
				},
				error: function(){
					output.text('Hubo un error al cargar los datos');
				},
				complete: function(jqXHR, textStatus) { 
					//$.mobile.loading('hide'); 
				    /*
					var interval = setInterval(function(){
				        $.mobile.loading('hide');
				        clearInterval(interval);
				    },1);
				    */  
				}
			});	
	
	}// if !window.endReached
	
}

$(function() {
    FastClick.attach(document.body);
});

$(document).on('pageinit',function(){

//$(document).ready(function(){
	//document.getElementById('search-basic').disabled = false;
	//$('#search-basic').focus();

	//alert("el campo winename = " + gup("winename"));
	//alert("el campo winetypes = " + gup("winetypes"));
	
    var interval = setInterval(function(){
        //$.mobile.loading('show');
        clearInterval(interval);
    },1);  


    window.currentPage = 1;
    window.endReached = false;
    window.ultimapaginapedida = 1;
    
	var querystring = "?";
		
	querystring += gup("d").length > 0 ? '&d='+remove_accent(decodeURIComponent(gup("d"))):"";
	
	var output = $('#labelList');
	
	
	
	output.empty();
	
	loadWineries(querystring);
	$(".liCarga").hide(); 
	
		
	
	$(document).on("scrollstop", function(){
		//console.log("-----------sigo entrando");
		var visible = $(window).height();
		var posicion = $(window).scrollTop();
		var alto = $(document).height();
		if ((window.ultimapaginapedida != window.currentPage) && ((visible + posicion) > (alto - 40))){
			console.log("Cargando mas items");
			loadWineries(querystring);
			$(".liCarga").hide(); 
			$('#labelList').listview("refresh");
			window.ultimapaginapedida = window.currentPage;
		}
	//var posicion = $(document).height();
	//console.log("SCROLL STOP: posicion" + posicion);
	});
	
	
});


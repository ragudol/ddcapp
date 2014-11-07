

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

function imgError(image) {
    image.onerror = "";
    image.src = "img/empty.png";
    return true;
}

function getSearchResults (type, query){

	var output = $('#output');
	var liCarga = '<li class="liCarga" data-icon="false"><a href="#"><img src="css/images/icono-loading.gif"></img></a></li>';
	
	//output.empty();
	console.log('query: ' + query);
	
	/*
	if (query != window.ultimaquery){
		window.ultimaquery = query;
		output.empty();
	}
	*/
	
	//window.typequery = type;
	
	if ((query.length > 2) && (window.moreRecords)){
		$('#searchBarcode').hide();
		//$.mobile.loading('show');
		$.ajax({
			url: 'http://unmat.com/2dc/busq.php?'+type+'=' + query + '&page=' + window.page,
			//url: 'http://www.unmat.com/2dc/conex.php',
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			timeout: 5000,
			tryCount : 0,
			retryLimit : 3,
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
				//var clase = ''; //declaramos clase como global para no tener el <div> de clase repetido luego
				if (data.length < 20){
				window.moreRecords = false;		
				}
				if ((data.length == 0) && (window.page == 1)){
					output.text ('Ningún registro encontrado');
				}
				else {
					$.each(data, function(i,item){
						/*var landmark = '<li class="ui-li-has-thumb ui-btn ui-btn-icon-right ui-li ui-btn-down-a ui-btn-up-a"><div class="ui-btn-inner"><a href="#page2" class="ui-link-inherit"><div class="ui-btn-text"><h3>'+item.Nombre+'</h3>'
						+ '<p class="ui-li-desc">'+item.Anyada+'</p><div></a><span class="ui-icon ui-icon-arrow-r"></span></li>';
		
						output.append(landmark); class="ui-btn-up-a"
						*/
		
						var inner = '';
						var iIdMarca = item.Id==null?'':item.Id;
						var iTipo = item.Tipo==null?'':item.Tipo;
						var iAnyada = item.Anyada==null?'':item.Anyada;
						var iCodigoBarras = item.CodigoBarras==null?'':item.CodigoBarras;
						var iPrecio = item.Precio==null?'':item.Precio + '€';
						var iPuntuacion = item.Puntuacion==null?'':' - ' + item.Puntuacion + ' puntos';
						var iProvincia = item.Provincia==null?'':item.Provincia;
						
						if (item.Clase != window.clase){
							window.clase = item.Clase;
							//inner +=<li data-role="list-divider">'+clase+'</li>';
							inner +='<div class="bar_div"> </div>';
							/*inner +='<li class="ui-li ui-li-divider ui-bar-a ui-first-child" data-role="list-divider" role="heading">'+clase+'</li>';*/
							inner +='<div class="bar_div bigfont">'+clase+'</div>';
						}; 
							
						//inner +='<li><a href="#"><h3>'+item.Id+item.Nombre+'</h3></a></li>';
	
						inner += '<li>'
						if (clase == "Marcas") {
							inner += '   <a  href="marca.html?id=' + item.Id +'" data-ajax="false">';
							//inner += '<img class="lazy" src="img/empty.png" >';
							inner += '<img class="lazy" src="img/empty.png" data-original="http://unmat.com/2dc/thumblabels/' + iIdMarca + '.jpg" >';
							inner += item.Nombre + '\'' + iAnyada + '<br/> ';
							inner += '<span class="smallfont">' + iTipo  + '</span><br/>';
							inner += '<span class="smallfont">' +iPrecio + iPuntuacion + '</span>';
						}
						else if (clase == "Bodegas") {
							inner += '   <a href="bodega.html?id=' + item.Id +'" data-ajax="false">';
							/*inner += item.Id+item.Nombre+'</h3><br/>';*/
							inner += item.Nombre+'<br/>';
							inner += '<span class="smallfont">' + item.DenominacionOrigen + '</span><br/>';
							inner += '<span class="smallfont">' + iProvincia + '</span><br/>';
						}
						else if (clase == "Denominaciones de origen"){
							inner += '   <a href="denominacion.html?id=' + item.Id +'" data-ajax="false">';
							/*inner += item.Id+item.Nombre+'</h3><br/>';*/
							inner += item.Nombre;
						}
						
						inner += '</a></li>'
						
						//inner += '   <img class="ui-li-thumb" src="img/marcas.png">';
						
	
			
						
						output.append(inner);

					});//each data
					$("img.lazy").lazyload();
					//console.log("miro si el alto de la pagina es menor que los resultados: " + $(window).height() + "<" + output.height())
					if ($(window).height() < $(document).height()){
							//console.log("adjunto liCarga");
							output.append(liCarga);
					}
					output.listview("refresh");
					window.page += 1;
				} //else
			},
			error: function(xhr, textStatus, errorThrown){
				if (textStatus == 'timeout'){
					this.tryCount++;
					if (this.tryCount <= this.retryLimit){
						$.ajax(this);
						return;
					}
				}
				output.text('Hubo un error al cargar los datos');
			},
			complete: function(jqXHR, textStatus) { 
				//$.mobile.loading('hide'); 
			}
		});
		
	}
	else {
		/* query.length() <= 2 */
		$('#searchBarcode').show();
	}
	
};

$(function() {
    FastClick.attach(document.body);
});


function searchItems(type){
	
	var query = remove_accent($('#search-basic').val());
	var output = $('#output');
	
	if (query.length > 2){
		output.empty();
		location.href='search.html?' + 'type=' + type + '&q=' + query; 
		//location.reload();
	}
		
}


$(document).on('pageinit', '#pagesearch',function(){

	if (false) {//(navigator.network.connection.type == Connection.NONE){
  		alert('Actualmente no dispone de conexión a internet');
		}
	
	else {
		
		var type_var = "";
		var query_var = "";
		var type = "";
		var query= "";
		
		$('.ui-icon-delete').addClass('ui-alt-icon');
		
		window.page = 1; // con window.variable creamos una variable global
		window.ultimapaginapedida = 1;
		//window.ultimaquery = '';
		window.moreRecords = true;
		//window.typequery = 'q';
		window.clase = ''; //declaramos clase como global para no tener el <div> de clase repetido dentro de la consulta
		
		
		type_var = gup("type");
		query_var = gup("q");
		type = decodeURIComponent(type_var);
		query = decodeURIComponent(query_var);
		
		if ((type.length > 0) && (query.length > 0)){
			$.mobile.loading('show');
			console.log("recibo type = " + query + "y type =" + type);
			$('#search-basic').val(query);
			getSearchResults(type , query);
			$(".liCarga").hide(); 
			$.mobile.loading('hide');
			
		}
		
		
		$(document).on("scrollstop", function(){
			//console.log("-----------sigo entrando");
			var visible = $(window).height();
			var posicion = $(window).scrollTop();
			var alto = $(document).height();
			if ((window.ultimapaginapedida != window.page) && ((visible + posicion) > (alto - 40))){
				getSearchResults(type, query);
				window.ultimapaginapedida = window.page;
				$(".liCarga").hide(); 
				$('#output').listview("refresh");
			}
		//var posicion = $(document).height();
		//console.log("SCROLL STOP: posicion" + posicion);
		});
		
	}//else navigator.network.connection.type != Connection.NONE

});
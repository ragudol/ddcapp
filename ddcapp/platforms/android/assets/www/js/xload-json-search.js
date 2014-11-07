

$(document).bind('pageinit'),(function(){

//$(document).ready(function(){
	//document.getElementById('search-basic').disabled = false;
	//$('#search-basic').focus();
});

/*http://www.forosdelweb.com/f179/quitar-acentos-con-jquery-replace-899812/*/
function remove_accent(str) {
	var map={'À':'A','Á':'A','Â':'A','Ã':'A','Ä':'A','Å':'A','Æ':'AE','Ç':'C','È':'E','É':'E','Ê':'E','Ë':'E','Ì':'I','Í':'I','Î':'I','Ï':'I','Ð':'D','Ñ':'N','Ò':'O','Ó':'O','Ô':'O','Õ':'O','Ö':'O','Ø':'O','Ù':'U','Ú':'U','Û':'U','Ü':'U','Ý':'Y','ß':'s','à':'a','á':'a','â':'a','ã':'a','ä':'a','å':'a','æ':'ae','ç':'c','è':'e','é':'e','ê':'e','ë':'e','ì':'i','í':'i','î':'i','ï':'i','ñ':'n','ò':'o','ó':'o','ô':'o','õ':'o','ö':'o','ø':'o','ù':'u','ú':'u','û':'u','ü':'u','ý':'y','ÿ':'y','Ā':'A','ā':'a','Ă':'A','ă':'a','Ą':'A','ą':'a','Ć':'C','ć':'c','Ĉ':'C','ĉ':'c','Ċ':'C','ċ':'c','Č':'C','č':'c','Ď':'D','ď':'d','Đ':'D','đ':'d','Ē':'E','ē':'e','Ĕ':'E','ĕ':'e','Ė':'E','ė':'e','Ę':'E','ę':'e','Ě':'E','ě':'e','Ĝ':'G','ĝ':'g','Ğ':'G','ğ':'g','Ġ':'G','ġ':'g','Ģ':'G','ģ':'g','Ĥ':'H','ĥ':'h','Ħ':'H','ħ':'h','Ĩ':'I','ĩ':'i','Ī':'I','ī':'i','Ĭ':'I','ĭ':'i','Į':'I','į':'i','İ':'I','ı':'i','Ĳ':'IJ','ĳ':'ij','Ĵ':'J','ĵ':'j','Ķ':'K','ķ':'k','Ĺ':'L','ĺ':'l','Ļ':'L','ļ':'l','Ľ':'L','ľ':'l','Ŀ':'L','ŀ':'l','Ł':'L','ł':'l','Ń':'N','ń':'n','Ņ':'N','ņ':'n','Ň':'N','ň':'n','ŉ':'n','Ō':'O','ō':'o','Ŏ':'O','ŏ':'o','Ő':'O','ő':'o','Œ':'OE','œ':'oe','Ŕ':'R','ŕ':'r','Ŗ':'R','ŗ':'r','Ř':'R','ř':'r','Ś':'S','ś':'s','Ŝ':'S','ŝ':'s','Ş':'S','ş':'s','Š':'S','š':'s','Ţ':'T','ţ':'t','Ť':'T','ť':'t','Ŧ':'T','ŧ':'t','Ũ':'U','ũ':'u','Ū':'U','ū':'u','Ŭ':'U','ŭ':'u','Ů':'U','ů':'u','Ű':'U','ű':'u','Ų':'U','ų':'u','Ŵ':'W','ŵ':'w','Ŷ':'Y','ŷ':'y','Ÿ':'Y','Ź':'Z','ź':'z','Ż':'Z','ż':'z','Ž':'Z','ž':'z','ſ':'s','ƒ':'f','Ơ':'O','ơ':'o','Ư':'U','ư':'u','Ǎ':'A','ǎ':'a','Ǐ':'I','ǐ':'i','Ǒ':'O','ǒ':'o','Ǔ':'U','ǔ':'u','Ǖ':'U','ǖ':'u','Ǘ':'U','ǘ':'u','Ǚ':'U','ǚ':'u','Ǜ':'U','ǜ':'u','Ǻ':'A','ǻ':'a','Ǽ':'AE','ǽ':'ae','Ǿ':'O','ǿ':'o'};
	var res='';
	for (var i=0;i<str.length;i++){
		c=str.charAt(i);res+=map[c]||c;
		}
	return res;
}; 

function getSearchResults (type){

	var output = $('#output');
	var query = remove_accent($('#search-basic').val());
	output.empty();
	console.log('query: ' + query);
	
	if (query.length > 2){
		$('#searchBarcode').hide();
		$.ajax({
			url: 'http://unmat.com/2dc/busq.php?'+type+'=' + query,
			//url: 'http://www.unmat.com/2dc/conex.php',
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			timeout: 5000,
			tryCount : 0,
			retryLimit : 3,
			beforeSend: function () {
				$.mobile.loading ('show', {
					text: 'Cargando',
					textVisible: true,
					theme: 'a',
					html: ""
				});
			},
			success: function(data, status){
				var clase = '';
				if (data.length == 0){output.text ('Ningún registro encontrado')}
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
					var iPrecio = item.Precio==null?'':' - ' + item.Precio + '€';
					var iPuntuacion = item.Puntuacion==null?'':' - ' + item.Puntuacion + ' puntos';
					var iProvincia = item.Provincia==null?'':item.Provincia;
					
					if (item.Clase != clase){
						clase = item.Clase;
						//inner +=<li data-role="list-divider">'+clase+'</li>';
						inner +='<div class="bar_div"> </div>';
						/*inner +='<li class="ui-li ui-li-divider ui-bar-a ui-first-child" data-role="list-divider" role="heading">'+clase+'</li>';*/
						inner +='<div class="bar_div">'+clase+'</div>';
					}; 
						
					//inner +='<li><a href="#"><h3>'+item.Id+item.Nombre+'</h3></a></li>';
					//inner += '<li class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li  ui-btn-up-a" ';
					//inner += ' data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" ';
					//inner += ' data-icon="arrow-r" data-iconpos="right" data-theme="a">';
					//inner += ' <div class="ui-btn-inner ui-li"> <div class="ui-btn-text">';	
					
					if (clase == "Marcas") {
						inner += '<li> <img src="http://unmat.com/2dc/piclabels/" + iIdMarca + ".jpg">'); 
						inner += '  <a  href="marca.html?id=' + item.Id +'" data-ajax="false">';
						/*inner += '<span>' + item.Id+ ' '+item.Nombre + ' [' + iTipo + iAnyada+'] ';*/
						inner += '<span>' +item.Nombre + '\'' + iAnyada + ' (' + iTipo  +')';
						inner += iPrecio + iPuntuacion + '</span> </li>';
					}
					else if (clase == "Bodegas") {
						inner += '<li>   <a  href="bodega.html?id=' + item.Id +'" data-ajax="false">';
						/*inner += item.Id+item.Nombre+'</h3><br/>';*/
						inner += item.Nombre+'</h3><br/>';
						inner += '<span>' + item.DenominacionOrigen + ' (' + iProvincia + ')</span><br/> </li>';
					}
					else if (clase == "Denominaciones de origen"){
						inner += '<li>  <a href="denominacion.html?id=' + item.Id +'" data-ajax="false">';
						/*inner += item.Id+item.Nombre+'</h3><br/>';*/
						inner += item.Nombre+'</h3><br/> </li>';
					}
					
					
					//inner += '   <img class="ui-li-thumb" src="img/marcas.png">';

					//inner += '</a> </div>';
					//inner += '   <span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span> </div> </li>';
						
					
					
					
					output.append(inner);
					//output.listview("refresh");
				});
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
				$.mobile.loading('hide'); 
			}
		});
		
	}
	else {
		/* query.length() <= 2 */
		$('#searchBarcode').show();
	}
	
};
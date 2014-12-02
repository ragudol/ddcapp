function loadLabels(querystring, page){
	
	if(page[1] != 1){
		
		var output = $('#labelList');
		var liCarga = '<li class="liCarga" data-icon="false"><a href="#"><img src="css/images/icono-loading.gif"></img></a></li>';

		
		querystring += '&page=' + page[0];
		console.log(querystring);
		
		$.ajax({
			//url: 'http://www.unmat.com/2dc/busqMarcas.php?&t=47&o=52&pmin=0&pmax=148&vmin=60&vmax=100',
			url: 'http://unmat.com/2dc/busqMarcas.php'+querystring,
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
				if (page[0] == 1){
					console.log("es la primera llamada");
					output.append(liCarga);
					output.listview("refresh");
				}
			},
			success: function(data, status){
				//var clase = '';
				//console.log(data.length);
				//if (data.length < 20){
				//	$('#moreResults-div').hide();
				//}
				if (data.length < 20){				
					console.log("NoHayMasRegistros");
					page[1] = 1;	
				}
				
				if ((data.length == 0)&& (page[0] == 1)){
					output.append ('Ningún registro encontrado');
				}	

				else {
					$.each(data, function(i,item){
	
		
						var inner = '';
						var iIdMarca = item.IdMarca==null?'':item.IdMarca;
						var iTipoDesc = item.TipoDesc==null?'':item.TipoDesc;
						var iAnyada = item.Anyada==null?'':item.Anyada;
						var iPrecio = item.Precio==null?'':item.Precio + '€';
						var iPuntuacion = item.Puntuacion==null?'':' - ' + item.Puntuacion + ' puntos';
						var iDenominacionOrigen = item.DenominacionOrigen==null?'':item.DenominacionOrigen;
						
						
						inner += '<li> <a href="marca.html?id=' + iIdMarca + '" data-ajax="false">';
						//inner += '<img class="lazy" src="img/empty.png" data-original="http://unmat.com/2dc/thumblabels/' + iIdMarca + '.jpg" onerror="imgError(this);" >';
						inner += '<img class="lazy" src="img/empty.png" data-original="http://unmat.com/2dc/thumblabels/' + iIdMarca + '.jpg" >';
						//inner += '<span>' + item.Nombre + '\'' + iAnyada + ' (' + iTipoDesc +') </span> <br/>';
						inner += '<span>' + item.Nombre  +'</span> <br/>';
						inner += '<span class="smallfont">' + iDenominacionOrigen + '</span> <br/>';
						inner += '<span class="smallfont">' +iAnyada + ' - ' + iTipoDesc + '</span> <br/>';
						inner += '<span class="smallfont">' + iPrecio + iPuntuacion + '</span>';
						if (localStorage.getItem('favM'+iIdMarca)) {
							inner += '</br> <span class="smallfont ion-ios7-heart"> Favorito</span>';
						}	
						inner += '</a> </li>';
	
						output.append(inner);
						}
	
					);//each data
					$("img.lazy").lazyload();
					console.log($(window).height() + '<' + $(document).height());
					if ($(window).height() < $(document).height()){
						//console.log("adjunto liCarga");
						output.append(liCarga);
					}
					output.listview("refresh");
					page[0] += 1;
				}
			},
			error: function(){
				output.text('Hubo un error al cargar los datos');
			},
			complete: function(jqXHR, textStatus) { 
				//$.mobile.loading('hide'); 
			}
		});	
	
	} // if page[1] != 1	
}

$(document).on('pageinit',function(){

//$(document).ready(function(){
	//document.getElementById('search-basic').disabled = false;
	//$('#search-basic').focus();

	//alert("el campo winename = " + gup("winename"));
	//alert("el campo winetypes = " + gup("winetypes"));

	
	var page = []; //es necesario el array para pasar el parametro por referencia 
	
	var querystring = "?";
	
	var act_var = "";
	
	page[0] = 1; // page[0] es la página actual
	page[1] = 0; // page [1] indica si ya no hay mas registros
	
	window.ultimapaginapedida = 1;
	
	act_var = gup("winename");
	querystring += act_var.length > 0 ? '&n='+decodeURIComponent(act_var):"";
	act_var = gup("winetypes");
	querystring += act_var.length > 0 ? '&d='+decodeURIComponent(act_var):"";
	act_var = gup("winedesignations");
	querystring += act_var.length > 0 ? '&o='+decodeURIComponent(act_var):"";
	act_var = gup("min-price");
	querystring += act_var.length > 0 ? '&pmin='+decodeURIComponent(act_var):"";
	act_var = gup("max-price");
	console.log("precio recibido" + act_var);
	if ("100" != act_var) {
		querystring += act_var.length > 0 ? '&pmax='+decodeURIComponent(act_var):"";
	}
	act_var = gup("min-punt");
	querystring += act_var.length > 0 ? '&vmin='+decodeURIComponent(act_var):"";
	act_var = gup("max-punt");
	querystring += act_var.length > 0 ? '&vmax='+decodeURIComponent(act_var):"";
	act_var = gup("winery");
	querystring += act_var.length > 0 ? '&b='+decodeURIComponent(act_var):"";

	console.log("querystring" + querystring);
	
	var output = $('#labelList');
	
	
	
	output.empty();
	
	loadLabels(querystring, page);
	$(".liCarga").hide(); 
	
	//$('#moreResults-div').on("click", function(){
	//	loadLabels(querystring, page);
	//});
	
	/*
	$(document).on("scrollstart", function(){
		var alto = $(window).height();
		var st = $(window).scrollTop();
		console.log("SCROLL START: alto=" + alto + "- scrollTop= " + st);
	});
	*/

	$(document).on("scrollstop", function(){
			//console.log("-----------sigo entrando");
			var visible = $(window).height();
			var posicion = $(window).scrollTop();
			var alto = $(document).height();
			if ((window.ultimapaginapedida != page[0]) && ((visible + posicion) > (alto - 40))){
				loadLabels(querystring, page);
				$(".liCarga").hide(); 
				$('#labelList').listview("refresh");
				window.ultimapaginapedida = page[0];
			}
		//var posicion = $(document).height();
		//console.log("SCROLL STOP: posicion" + posicion);
	});

	
});



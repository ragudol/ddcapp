

function loadLabels(querystring, page){
	
	if(page[1] != 1){
		
		var output1 = $('#labelsLeftColumn');
		var output2 = $('#labelsRightColumn');
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
					output1.append(liCarga);
					//output1.listview("refresh");
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
					output1.append ('Ningún registro encontrado');
				}	

				else {
					$.each(data, function(i,item){
	
		
						var inner = '';
						var left = true;
						var iIdMarca = item.IdMarca==null?'':item.IdMarca;
						var iTipoDesc = item.TipoDesc==null?'':item.TipoDesc;
						var iAnyada = item.Anyada==null?'':item.Anyada;
						var iPrecio = item.Precio==null?'':item.Precio + '€';
						var iPuntuacion = item.Puntuacion==null?'':' - ' + item.Puntuacion + ' puntos';
						var iBodega = item.Bodega==null?'':item.Bodega;
						var iDenominacionOrigen = item.DenominacionOrigen==null?'':item.DenominacionOrigen
						


						inner += '<div id="cuadroMarcaId'+ iIdMarca +'" class="cuadroMarca">';
							inner += '<div class="imageHolder">';
								inner += '<div><img class="lazy imgLabelsHome" src="img/empty.png" data-original="http://unmat.com/2dc/thumblabels/' + iIdMarca + '.jpg" ></div>';
									if (localStorage.getItem('favM'+iIdMarca)) 
										{
											inner += '<div class="captionheart clear"><i class="bigfont icon ion-ios7-heart"></i></div>';
										}
									else
										{
											inner += '<div class="captionheart"><i class="bigfont icon ion-ios7-heart-outline"></i></div>';
										}
								//innerL += '<div class="captionstar"><i class="bigfont icon ion-ios7-star-outline"></i></div>';
							inner += '</div>';
							
							//inner += '<img class="lazy" src="img/empty.png" data-original="http://unmat.com/2dc/thumblabels/' + iIdMarca + '.jpg" onerror="imgError(this);" >';
							
							inner += '<div class="ficha">' + item.Nombre  + '</div> ';
							inner += '<div class="smallfont">' + iTipoDesc + ' - ' + iAnyada + '</div>';
							inner += '<div class="smallfont">' + iBodega + '</div>';
							inner += '<div class="smallfont">' + iDenominacionOrigen + '</div>';

							inner += '<div class="smallfont">' + iPrecio + iPuntuacion + '</div>';

							inner += '<a href="marca.html?id=' + iIdMarca + '" data-ajax="false">';
							inner += 'Ver ficha</a>';
							inner += '</div>';	
						inner += '</div>';
						inner += '<div class="bar_div"></div>';


						if ((i + 1) & 1) {
							//http://stackoverflow.com/questions/6211613/testing-whether-a-value-is-odd-or-even
							output1.append(inner);
							}
						else {
							output2.append(inner);
						}

					});//each data

					$("img.lazy").lazyload();
					console.log($(window).height() + '<' + $(document).height());
					if ($(window).height() < $(document).height()){
						//console.log("adjunto liCarga");
						output1.append(liCarga);
					}
					//output1.listview("refresh");
					page[0] += 1;
				}
			},
			error: function(){
				output1.text('Hubo un error al cargar los datos');
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
	
	var querystring = "?ran";
	
	var act_var = "";
	
	page[0] = 1; // page[0] es la página actual
	page[1] = 0; // page [1] indica si ya no hay mas registros
	
	window.ultimapaginapedida = 1;
	


	console.log("querystring" + querystring);
	
	var output = $('#labelList');
	
	
	
	output.empty();
	
	loadLabels(querystring, page);
	$(".liCarga").hide(); 

	$(document).on("click", ".captionheart", function() {
		//alert("has hecho click");
		var idM = $(this).parent().parent().get(0).id.substring(13);
		// substring(13) porque extraemos el Id de cuadroMarcaId+iIdMarca
		console.log("has hecho click en idM " + idM);
		if (localStorage.getItem("favM" + idM )) {
			localStorage.removeItem("favM" + idM);
			$('.favremoved').stop().fadeIn(400).delay(3000).fadeOut(400);
		}
		else {
			localStorage.setItem("favM" + idM, "true");
			$('.favadded').stop().fadeIn(400).delay(3000).fadeOut(400);	
		}
		//console.log($(this).children(1));
		$(this).children(1).toggleClass("ion-ios7-heart-outline ion-ios7-heart");
	});
	
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



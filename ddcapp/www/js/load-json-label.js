function loadLabel(querystring){
	
	var f_label = $('#f_label');
	var f_type = $('#f_type');
	var f_price = $('#f_price');
	var f_score = $('#f_score');
	
	var f_winery = $('#f_winery');
	var f_designation = $('#f_designation');
	var f_year = $('#f_year');
	var f_comment = $('#f_comment');

	var f_fav = $('#f_fav');
	
	var wine_image = $('#wine-image');
	
	var a_winery = $('#a_winery');
	var a_designation = $('#a_designation');
	var a_year = $('#a_year');

	
	$.ajax({
		//url: 'http://www.unmat.com/2dc/busqMarcas.php?&t=47&o=52&pmin=0&pmax=148&vmin=60&vmax=100',
		url: 'http://unmat.com/2dc/detMarca.php'+querystring,
		//url: 'http://www.unmat.com/2dc/conex.php',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,
		beforeSend: function () {
			$.mobile.loading ('show', {
				text: 'Cargando',
				textVisible: true,
				theme: 'a',
				html: ""
			});
		},
		success: function(data, status){
			//console.log(data.length);
			
			if (data.length == 0){
				output.append ('Ningún registro encontrado');
				}
			else {
				$.each(data, function(i,item){
	
					var iIdMarca = item.IdMarca==null?'':item.IdMarca;
					var iTipoDesc = item.Tipo==null?'':item.TipoDesc;
					var iSubtipoDesc = item.Tipo==null?'':'<p><Tipo>' + item.SubtipoDesc +'</p>';
					var iAnyada = item.Anyada==null?'':item.Anyada;
					var iCodigoBarras = item.CodigoBarras==null?'':item.CodigoBarras;
					var iPrecio = item.Precio==null?'':item.Precio + '€';
					var iPuntuacion = item.Puntuacion==null?'': item.Puntuacion + '/100';
					var iProvincia = item.Provincia==null?'':item.Provincia;
					var iComentario = item.ComentarioBodega==null?'':item.ComentarioBodega;


					f_label.append(item.Nombre +" '" +iAnyada);
					f_type.append(iTipoDesc);
					f_price.append(iPrecio);
					f_score.append(iPuntuacion);
					
					f_winery.append(item.Bodega);
					f_designation.append(item.DenominacionOrigen);
					f_year.append(iAnyada);
					
					f_comment.children('.ui-collapsible-content').append(iComentario);
					
					if (item.ComentarioBodega == null){
						f_comment.empty();
						}
					wine_image.children('img').attr("src", "http://unmat.com/2dc/piclabels/" + iIdMarca + ".jpg");
					wine_image.children('img').attr("onerror", "this.onerror=null;this.src='img/empty.png';");
					/*if (item.Imagen == null) {
						wine_image.children('img').attr("src", "img/empty.png");
						}*/
					
					a_winery.attr("href", "bodega.html?id=" + item.IdBodega);
					a_designation.attr("href", "denominacion.html?id=" + item.IdDO);
					a_year.attr("href", "anyada.html?id=" + item.IdDO);

					if (localStorage.getItem('favM'+iIdMarca)) {
						f_fav.children('i').attr("class", "bigfont icon ion-ios7-heart");
						f_fav.children('span').text("Eliminar de favoritos");
					}	

					
					}

				);//each data
			}

		},
		error: function(){
			output.text('Hubo un error al cargar los datos');
		},
		complete: function(jqXHR, textStatus) { 
			//$.mobile.loading('hide'); 
		    var interval = setInterval(function(){
		        $.mobile.loading('hide');
		        clearInterval(interval);
		    },1);  
		}
	});	
	
	
	
}

$(document).on("click", "#f_fav", function() {
		//alert("has hecho click");
		var idM = gup("id").length > 0 ? decodeURIComponent(gup("id")):"";
		// substring(13) porque extraemos el Id de cuadroMarcaId+iIdMarca
		console.log("has hecho click en idM " + idM);
		if (localStorage.getItem("favM" + idM )) {
			localStorage.removeItem("favM" + idM);
			$(".ion-ios7-heart").removeClass("ion-ios7-heart").addClass("ion-ios7-heart-outline");
			$(".f_txt").text("  Añadir a favoritos");
			$('.favremoved').stop().fadeIn(400).delay(3000).fadeOut(400);
		}
		else {
			localStorage.setItem("favM" + idM, "true");	
			$(".ion-ios7-heart-outline").removeClass("ion-ios7-heart-outline").addClass("ion-ios7-heart");
			$(".f_txt").text("  Eliminar de favoritos");
			$('.favadded').stop().fadeIn(400).delay(3000).fadeOut(400);
		}
		console.log($(this).children($("i")));
		//$(this).children(0).toggleClass("ion-ios7-heart-outline ion-ios7-heart");
		//$(this).children(2).text("ion-ios7-heart-outline ion-ios7-heart");
});



$('#labelpage').on('pageinit', function (e, data) {
	//console.log('entrando en pageinit');
});



$(document).on('pagebeforeshow', '#labelpage',function(){

	//console.log('entrando en pagebeforeshow');
//$(document).ready(function(){
	//document.getElementById('search-basic').disabled = false;
	//$('#search-basic').focus();

	//alert("el campo winename = " + gup("winename"));
	//alert("el campo winetypes = " + gup("winetypes"));
	
    var interval = setInterval(function(){
        $.mobile.loading('show');
        clearInterval(interval);
    },1);  
	

	
	var querystring = "?";
		
	//console.log('la url actual es '+ window.location.href);
	

	
	querystring += gup("id").length > 0 ? '&id='+decodeURIComponent(gup("id")):"";


	

	loadLabel(querystring);
	
	/*
	console.log('a ver si carga esto---------------------');
	var img = $("<img />").attr('src', 'http://unmat.com/2dc/piclabels' + item.IdMarca + '.jpg')
    .load(function() {
        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
            console.log('broken image!');
        } else {
        	console.log('cargada!');
        }
    });
    */	
	
	
	
});


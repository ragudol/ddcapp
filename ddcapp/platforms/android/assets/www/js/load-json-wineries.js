
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


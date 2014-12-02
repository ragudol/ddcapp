
function loadDesignations(querystring, page){
	
	if(page[1] != 1){
	
			var output = $('#labelList');
			var liCarga = '<li class="liCarga" data-icon="false"><a href="#"><img src="css/images/icono-loading.gif"></img></a></li>';
			
			
			querystring += '&page=' + page[0];
			console.log(querystring);
			
			$.ajax({
				//url: 'http://www.unmat.com/2dc/busqMarcas.php?&t=47&o=52&pmin=0&pmax=148&vmin=60&vmax=100',
				url: 'http://unmat.com/2dc/listDDOO.php' + querystring,
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
			
						//$('#moreResults-div').hide();
						
						if (data.length < 20){				
							console.log("NoHayMasRegistros");
							page[1] = 1;	
						}
			
						if ((data.length == 0) && (page[0] == 1)){
							output.append ('Ningún registro encontrado');
							}
						else {
							$.each(data, function(i,item){
								/*var landmark = '<li class="ui-li-has-thumb ui-btn ui-btn-icon-right ui-li ui-btn-down-c ui-btn-up-c"><div class="ui-btn-inner"><a href="#page2" class="ui-link-inherit"><div class="ui-btn-text"><h3>'+item.Nombre+'</h3>'
								+ '<p class="ui-li-desc">'+item.Anyada+'</p><div></a><span class="ui-icon ui-icon-arrow-r"></span></li>';
				
								output.append(landmark); class="ui-btn-up-c"
								*/
				
								var inner = '';
								var iDenominacionOrigen = item.DenominacionOrigen==null?'':item.DenominacionOrigen;
								/*var iLocalizacion = item.Localizacion==null?'':' Loc: '+item.Localizacion +'';*/
								var iLocalizacion = item.Localizacion.length==0?'':' Loc: '+item.Localizacion +'';
								
									
			
								inner += '<li> <a  href="denominacion.html?id=' + item.IdDO + '" data-ajax="false">';
								inner += '<span>' + iDenominacionOrigen + '</span> <br/>';
								inner += '<span class="smallfont">' + iLocalizacion +'</span> </a> </li>';
									
								
								
								
								output.append(inner);
								}
			
							);//each data
							
							if ($(window).height() < $(document).height()){
								//console.log("adjunto liCarga");
								output.append(liCarga);
							}
							output.listview("refresh");
							page[0] += 1;
							
							
						}
				}, //success
				error: function(){
					output.text('Hubo un error al cargar los datos');
					},
				complete: function(jqXHR, textStatus) { 
					//$(".liCarga").hide(); 
				}
			});	//ajax
			
	
	} // if page[1] != 1		
	
}

$(document).on('pageinit',function(){

//$(document).ready(function(){
	//document.getElementById('search-basic').disabled = false;
	//$('#search-basic').focus();

	//alert("el campo winename = " + gup("winename"));
	//alert("el campo winetypes = " + gup("winetypes"));
	

	
	var page = [];
	page[0] = 1;
	page[1] = 0;
	var querystring = "?";
		
	window.ultimapaginapedida = 1;
	
	//var output = $('#labelList');
	
	$('#labelList').empty();
	
	
	loadDesignations(querystring, page);
	$(".liCarga").hide(); 
	
	/*
	$('#moreResults-div').on("click", function(){
		loadDesignations(querystring, page);
	});
	*/
	$(document).on("scrollstop", function(){
		var visible = $(window).height();
		var posicion = $(window).scrollTop();
		var alto = $(document).height();
		if ((window.ultimapaginapedida != page[0]) && ((visible + posicion) > (alto - 40))){
			loadDesignations(querystring, page);
			$(".liCarga").hide(); 
			$('#labelList').listview("refresh");
			window.ultimapaginapedida = page[0];
		}
	});
	
	
});


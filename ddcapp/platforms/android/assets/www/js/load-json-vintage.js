function loadVintage(querystring){
	
	var a_winery = $('#a_winery');
	var a_designation = $('#a_designation');	
	
	var output = $('#chart_title');
	/*console.log('entrando en loadDesignation con parametro ' + querystring);*/

	
	$.ajax({
		//url: 'http://www.unmat.com/2dc/busqMarcas.php?&t=47&o=52&pmin=0&pmax=148&vmin=60&vmax=100',
		url: 'http://unmat.com/2dc/detDO.php'+querystring,
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
			console.log(data.length);
			//var anyadas = [[0,3],[1,5]];
			var anyadas = [];
			var minAn = 0;
			var maxAn = 0;
			
			if (data.length == 0){
				output.append ('Ningún registro encontrado');
				}
			else {
				minAn = data[0].MinAn;
				maxAn = data[0].MaxAn;
				$.each(data, function(i,item){
					console.log('item: '+item);
					var inner = item.DenominacionOrigen;
					
					a_winery.attr("href", "bodegas.html?d=" + item.DenominacionOrigen);
					a_designation.attr("href", "denominacion.html" + querystring);					


					for (an = minAn; an<=maxAn; an++){
						var valorItem = eval("item.an"+an);
						if ("" != valorItem) anyadas.push([an, valorItem])
						
					}
				

					
					
					output.append(inner);
					
					nombreDO = item.DenominacionOrigen;
					
					var botonBodegas = '<ul class="ui-grid-solo">';
					botonBodegas += '<li class="ui-block-a">';
					botonBodegas += '<a rel="external" class="ui-btn ui-btn-inline ui-btn-icon-top ui-btn-active ui-btn-up-a "';
					botonBodegas += 'data-role="button" data-icon="bars"  data-iconpos="top" href="bodegas.html?d=' + nombreDO + '"> Ver bodegas </a></li></ul>';
					$('#wineries-button').append(botonBodegas);
					

					
					}

				);//each data
				
				$.plot("#placeholder", [{
					data: anyadas
				}], {
					series: {
						color: "rgb(255,128,128)",
						lines: {
							show: true,
							lineWidth: 3,
							fill: true
						},
						points: {
							show: true,
							
						}
					},
					xaxis: {

						min: minAn,
						max: maxAn,
						tickDecimals: 0
					},
					yaxis: {
						ticks: [[0, "Deficiente"], [1, "Regular"], [2, "Buena"], [3, "Muy Buena"], [4, "Excelente"]]
					}
				});

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


$('#designationpage').on('pageinit', function (e, data) {
	//console.log('entrando en pageshow');
});


$(document).on('pageinit', '#designationpage',function(){

	console.log('entrando en pageinit');
//$(document).ready(function(){
	//document.getElementById('search-basic').disabled = false;
	//$('#search-basic').focus();

	//alert("el campo winename = " + gup("winename"));
	//alert("el campo winetypes = " + gup("winetypes"));
	
    var interval = setInterval(function(){
        $.mobile.loading('show');
        clearInterval(interval);
    },1);  

	var nombreDO = "";
	
	var querystring = "?";
		
	//console.log('la url actual es '+ window.location.href);
	

	
	querystring += gup("id").length > 0 ? '&id='+decodeURIComponent(gup("id")):"";
	querystring += gup("n").length > 0 ? '&n='+decodeURIComponent(gup("n")):"";

	
	var output = $('#designationDetail');
	
	
	
	output.empty();
	
	loadVintage(querystring);
	
	//console.log("nombreDO (fuera): " + nombreDO);
	


	
	
	
	
	
	
});


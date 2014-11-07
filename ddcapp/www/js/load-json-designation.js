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


function loadDesignation(querystring){
	
	var a_winery = $('#a_winery');
	var a_year = $('#a_year');
	
	var output = $('#designationDetail');
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
					//console.log('item: '+item);
					var inner = '';
					
					inner += '<div class="bar_div"></div>';
					inner +='<div class="bar_div"> D.O. '+item.DenominacionOrigen+'</div>';
					
					inner += '<p> <strong>Bodegas inscritas: </strong>'+ item.BodegasInscritas +'</p>';
					inner += '<p> <strong>Clima: </strong>'+ item.Clima +'</p>';
					inner += '<p> <strong>Localización: </strong>'+ item.Localizacion +'</p>';
					inner += '<p> <strong>Superficie de viñedos: </strong>'+ item.SuperficieVinyedo +'ha.</p>';
					inner += '<p> <strong>Variedades de uva: </strong>'+ item.VariedadesUva +'</p>';

				
					output.append(inner);
					
									
					a_winery.attr("href", "bodegas.html?d=" + item.DenominacionOrigen);
					a_year.attr("href", "anyada.html" + querystring);
					
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

$(function() {
    FastClick.attach(document.body);
});


$('#designationpage').on('pageinit', function (e, data) {
	console.log('entrando en pageshow');
});


$(document).on('pageinit', '#designationpage',function(){

	//console.log('entrando en pageinit');
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
	
	loadDesignation(querystring);
	
	console.log("nombreDO (fuera): " + nombreDO);
	


	
	
	
	
	
	
});


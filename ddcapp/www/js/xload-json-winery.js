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


function loadWinery(querystring){
	
	var f_winery_name = $('#f_winery_name');
	var f_winery_address = $('#f_winery_address');
	var f_winery_address2 = $('#f_winery_address2');
	var f_winery_designation = $('#f_winery_designation');
	var f_winery_locality = $('#f_winery_locality');
	var f_winery_postal_code = $('#f_winery_postal_code');
	var f_winery_phone_number = $('#f_winery_phone_number');
	var f_winery_tanks_capacity = $('#f_winery_tanks_capacity');
	var f_winery_stock_bottles = $('#f_winery_stock_bottles');
	var f_winery_barrels = $('#f_winery_barrels');
	var f_winery_email = $('#f_winery_email');
	var f_winery_webpage = $('#f_winery_webpage');
	var f_winery_comments = $('#f_winery_comments');
	
	var a_map_query = $('#a_map_query');
	var a_email = $('#a_email');
	var a_web = $('#a_web');
	var a_phone = $('#a_phone');
	
	var a_winery_labels = $('#a_winery_labels');
	var a_winery_designation = $('#a_winery_designation');
	
	
	
	var output = $('#wineryDetail');
	//console.log('entrando en loadWinery con parametro ' + querystring);

	
	$.ajax({
		//url: 'http://www.unmat.com/2dc/busqMarcas.php?&t=47&o=52&pmin=0&pmax=148&vmin=60&vmax=100',
		url: 'http://unmat.com/2dc/detBodega.php'+querystring,
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
			});*/
		},
		success: function(data, status){
			//console.log(data.length);
			
			if (data.length == 0){
				output.append ('Ningún registro encontrado');
				}
			else {

				$.each(data, function(i,item){

					var iId = item.IdBodega==null?'':item.IdBodega;
					var iBodega = item.Bodega==null?'':item.Bodega;
					var iLocalidad = item.Localidad==null?'':item.Localidad;
					var iProvincia = item.Provincia==null?'':item.Provincia;
					var iDenominacionOrigen = item.DenominacionOrigen==null?'':item.DenominacionOrigen;
					var iDireccion = item.Direccion==null?'':item.Direccion;
					var iCodigoPostal = item.CodigoPostal==null?'':item.CodigoPostal;
					var iTelefono = item.Telefono==null?'--':item.Telefono;
					var iCapacidadDepositos = item.CapacidadDepositos==null?'':item.CapacidadDepositos;
					var iBotellasStock = item.BotellasStock==null?'':item.BotellasStock;
					var iBarricasRoble = item.BarricasRoble==null?'':item.BarricasRoble;
					var iDirCorreo = item.DirCorreo==null?'--':item.DirCorreo;
					var iDirWeb = item.DirWeb==null?'--':item.DirWeb;
					var iObservaciones = item.Observaciones==null?'':item.Observaciones;
					var iDirMapa = item.DirMapa==null?'#':item.DirMapa;
					
					
					f_winery_name.append(iBodega);
					f_winery_address.append(iDireccion);
					f_winery_address2.append(iCodigoPostal + ', ' + iLocalidad + ' (' + iProvincia + ')');
					f_winery_designation.append(iDenominacionOrigen); 
					f_winery_locality.append(iLocalidad);
					f_winery_postal_code.append(iCodigoPostal);
					f_winery_phone_number.append(iTelefono);
					f_winery_tanks_capacity.append(iCapacidadDepositos);
					f_winery_stock_bottles.append(iBotellasStock);
					f_winery_barrels.append(iBarricasRoble);
					f_winery_email.append(iDirCorreo);
					f_winery_webpage.append(iDirWeb);
					
					f_winery_comments.children('.ui-collapsible-content').append(iObservaciones);
					
					/*a_map_query.attr("href", "http://maps.google.com?q=" + "bodega" + "%20" + iBodega + "%20" + iDireccion + "%20" + iCodigoPostal + "%20" + iLocalidad + "%20" + iProvincia);*/
					/*a_map_query.attr("href", "geo:0,0q=" + "bodega" + "%20" + iBodega + "%20" + iDireccion + "%20" + iCodigoPostal + "%20" + iLocalidad + "%20" + iProvincia);*/
					a_map_query.attr("href", iDirMapa);
					
					a_map_query.attr("rel", "external");
					a_map_query.attr("target", "_system");
					
					a_email.attr("href", "mailto://" + iDirCorreo);
					a_email.attr("rel", "external");					
					
					// IOS-> a_web.attr("onclick", "window.open('http://" + iDirWeb + "', '_system');" );
					a_web.attr("onclick", "navigator.app.loadUrl('http://" + iDirWeb + "', {openExternal:true});" );
					
					
					a_phone.attr("href", "tel://" + iTelefono);
					/*a_phone.attr("target", "");*/
					a_phone.attr("rel", "external");
					
					a_winery_designation.attr("href", "denominacion.html?n=" + iDenominacionOrigen);
					a_winery_designation.attr("rel", "external");
					
					a_winery_labels.attr("href", "marcas.html?winery=" + iId);
					a_winery_labels.attr("rel", "external");
					

					if (item.Observaciones == null) {				
						f_winery_comments.empty();
					}
					
				    var interval = setInterval(function(){
				        $.mobile.loading('hide');
				        clearInterval(interval);
				    },1); 

					
					
					
					}

				);//each data
			}



		},
		error: function(){
			output.text('Hubo un error al cargar los datos');
		},
		complete: function(jqXHR, textStatus) { 
			/*$.mobile.loading('hide');*/
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

$('#winerypage').on('pageinit', function (e, data) {
	//console.log('entrando en pageshow');
});


$(document).on('pageinit', '#winerypage',function(){

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


	
	var querystring = "?";
		
	//console.log('la url actual es '+ window.location.href);
	

	
	querystring += gup("id").length > 0 ? '&id='+decodeURIComponent(gup("id")):"";


	
	/*var output = $('#wineryDetail');*/
	
	
	
	/*output.empty();*/
	
	loadWinery(querystring);
	

	
	
	
	
});


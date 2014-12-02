$(document).on('pageinit',function(){
//$(document).bind('pageinit'),(function(){
//$(document).ready(function(){
	//document.getElementById('search-basic').disabled = false;
	//http://www.9lessons.info/2011/03/multiple-ajax-requests-with-jquery.html

	var types_url ='http://unmat.com/2dc/listTipos.php';
	var designations_url = 'http://unmat.com/2dc/listDDOO.php';

	var output_types = $('#winetypes');
	var output_designations = $('#winedesignations');
	
	function getWinetypes ()
	{
	return	$.ajax({
		url: types_url,
		//url: 'http://www.unmat.com/2dc/conex.php',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,

		success: function (types_data){},
		error: function(){
			output.text('Hubo un error al cargar los datos');
			}
		});
	}
	
	
	function getDesignations ()
	{
	return	$.ajax({
		url: designations_url,
		//url: 'http://www.unmat.com/2dc/conex.php',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		timeout: 5000,

		success: function (designations_data){},
		error: function(){
			output.text('Hubo un error al cargar los datos');
			}
		});
	}	
	

	$.when(getWinetypes(), getDesignations()).done(function(types_data, designations_data)
			{
			var types = types_data[0];
			var designations = designations_data[0];

			
			if (types)
				{
				$.each(types, function(i,item){	
					output_types.append('<option value="'+ item.Tipo +'">'+item.Tipo+'</option>');
					});
				}
			
			if (designations)
				{
				$.each(designations, function(i,item){	
					output_designations.append('<option value="'+ item.IdDO + '">'+item.DenominacionOrigen+'</option>');
					});
				}			
			});
	
});


$(document).on("change", "#max-punt", function() {
	
	var display = $('#max-punt-display');
	var valor = $("#max-punt").val();
	
	display.empty();
	display.append(valor);
 
} );


$(document).on("change", "#min-punt", function() {
	
	var display = $('#min-punt-display');
	var valor = $("#min-punt").val();
	
	display.empty();
	display.append(valor);
	$('#min-punt-display').val($("#min-punt").val());
	

} );


$(document).on("change", "#max-price", function() {
	
	var display = $('#max-price-display');
	var valor = $("#max-price").val();
	
	display.empty();
	display.append(valor == '100'?'100+':valor);

} );

$(document).on("change", "#min-price", function() {
	
	var display = $('#min-price-display');
	var valor = $("#min-price").val();
	
	display.empty();
	display.append(valor);

} );

$(document).on("click", "#botonbusqueda", function(){
	$('#form_marcas').submit();
});
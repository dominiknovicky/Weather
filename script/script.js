(function($){

	$("#getBtn").click(function(){
		var city = $("#city").val(),
			code = $("#code").val();

		if(city.length > 1){
			var urlLink = "http://api.openweathermap.org/data/2.5/weather?q=";
			urlLink = urlLink + city;
			if(code.length == 2)
				urlLink = urlLink + ',' + code;
			urlLink = urlLink + '&appid=58972ed4364ccc74fa88fa10924d7ae0'

			console.log(urlLink);
			
			$.ajax({
				url: urlLink,
				data: {format: "json"},
			error: function(){
				//vypis chyby
			},
			dataType: "json",
			success: function(data){
				console.log(data.main.temp-273.15+"°C");
				console.log(data.weather[0].description);
			},
			type: "GET"
			});
		}
	});

	var tableWidth = $("#table").css("width");
	$("#weather").css({ "width" : tableWidth});

})(jQuery);
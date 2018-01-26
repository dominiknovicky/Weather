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
				$("#info").html("Error. No response from server! Please check the inputs!");
			},
			dataType: "json",
			success: function(data){

				$('#info').empty();
	            var table=$("<div/>");
	            table.addClass("weatherTable");

	            var cityToUpper = city.toLowerCase();
	            var div=getLine('City',city.charAt(0).toUpperCase() + cityToUpper.slice(1));
	            table.append(div);

	            var div=getLine('Country',data.sys.country);
	            table.append(div);

	            div=getLine("Temperature", (data.main.temp-273.15).toFixed(1)+'°C');
	            table.append(div);

	            div=getLine("Humidity", data.main.humidity+'%');
	            table.append(div);

	            div=getLine("Pressure", data.main.pressure+' hPa');
	            table.append(div);

	            div=getLine("Description", data.weather[0].description);
	            table.append(div);

	            $('#info').append(table) ;

	            if($("#details").is(':checked')){
	              div=getLine("Wind", data.wind.speed+'m/s');
	              table.append(div);

	              div=getLine("Min temp", data.main.temp_min-273.15+'°C');
	              table.append(div);

	              div=getLine("Max temp", data.main.temp_max-273.15+'°C');
	              table.append(div);

	              div=getLine("Sunrise", new Date(data.sys.sunrise*1000).getHours()+':'+new Date(data.sys.sunrise*1000).getMinutes());
	              table.append(div);

	              div=getLine("Sunset", new Date(data.sys.sunset*1000).getHours()+':'+new Date(data.sys.sunset*1000).getMinutes());
	              table.append(div);

	              div=getLine("Google Maps", "<a class='coord' target='_blank' href='https://www.google.com/maps/search/?api=1&query=" 
	              	+ data.coord.lat + "," + data.coord.lon + "'>"+city.charAt(0).toUpperCase() + cityToUpper.slice(1)+"</a>");
	              table.append(div);
            	}
   			},
			type: "GET"
			});
		}
	});

	function getLine(data1,data2){
	    var div=$("<div/>");
	    var span1=$("<span/>");
	    $(span1).append(data1);
	    var span2=$("<span/>");
	    $(span2).append(data2);
	    div.append(span1);
	    div.append(span2);
	    return div;
  	}

})(jQuery);
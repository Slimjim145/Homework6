var x = document.querySelector(".city-name");
var date = new Date();
var hour = date.getHours();


// Event handling for buttons "Check" 
document.getElementById("btn-location").addEventListener("click", function () {
    getLocation();
});

document.getElementById("btn-choice").addEventListener("click", function () {
    getWheater($("#city-input").val());
});

// Event handling for press Enter 
document.getElementById("city-input").addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
        getWheater($("#city-input").val());
        console.log("asd");
        $("#city-input").val("");
    }
}, false);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }


}

function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results)
            if (results[1]) {
                //formatted address
                var address = results[0].formatted_address;
                alert("address = " + address);
            } else {
                alert("No results found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    displayLocation(lat, lon);
}

function geoSuccess(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    alert("lat:" + lat + " lng:" + lng);
}

function geoError() {
    alert("Geocoder failed.");
}


function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }

function getWheater(city) {
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=58c2df090b7869f900735ac0f4e3616e",
        function (response) {
            console.log(response);
            var city2 = city;
            var country = response.sys.country;
            var wheater = response.weather[0].main;
            var temp = response.main.temp;
            var pressure = response.main.pressure;
            var windSpeed = response.wind.speed;
            console.log(city2 + " " + country + " " + wheater + " " + temp + " " + pressure + " " + windSpeed);
            wheaterSet(city2, country, wheater, temp, pressure, windSpeed);
        });
}

function wheaterSet(city, country, weather, temp, pressure, windSpeed) {
    console.log(weather);
    if (weather == "Clear") {
        $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/clearNight.mp4" type="video/mp4"></video>');
    }
    if (weather == "Clear" && (hour <= 20 && hour >= 6)) {
        $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/clearDay.mp4" type="video/mp4"></video>');
    }
    if (weather == "Rain") {
        $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/rain.mp4" type="video/mp4"></video>');
    }
    if (weather == "Clouds") {
        $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/cloudsNight.mp4" type="video/mp4"></video>');
    }
    if (weather == "Clouds" && (hour <= 20 && hour >= 6)) {
        $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/clouds.mp4" type="video/mp4"></video>');
    }
    if (weather == "Snow") {
        $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/snow.mp4" type="video/mp4"></video>');
    }
    if (weather == "Mist") {
        $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/mist.mp4" type="video/mp4"></video>');
    }
    if (weather == "Thunderstorm") {
        $("#weather-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/thunderstorm.mp4" type="video/mp4"></video>');
    }
    //    $(".container-fluid").css("background", "rgba(0, 0, 0, 0.4)");    
    $("#city-info").html(city + " " + country);
    $("#weath-info").html(weather);
    $("#temp-info").html(temp + " &deg;C");
    $("#pressure-info").html(pressure + " hPa");
    $("#windSpeed-info").html(windSpeed + " m/s");
    $("#wheater-info").show();
    thunderstorm
};
};
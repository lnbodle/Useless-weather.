window.onload = setCity("Moscou", document.getElementById("currentDay").value);

var currentCity = "Moscou";
var currentDay;
var colors = ["bg-blue-100","bg-blue-200","bg-blue-300","bg-blue-400","bg-blue-500","bg-blue-600","bg-blue-700","bg-blue-800","bg-blue-900"];
var descriptions = ["clear sky","few clouds","scattered clouds","broken clouds","light rain","rain","thunderstorm","snow","mist"];

var slider = document.getElementById("currentDay");

slider.oninput = function() {
    setCity();
}

function findIdByValue(list,value) {
	for (var i=0 ; i<list.length ; i++) {
			if (list[i]==value) return i;
	}
	return 0;
}

function clearAllData() {
    var currentWeathersDiv = document.getElementById("weathersDiv");
    currentWeathersDiv.innerHTML = "";
}

function addAllWeather(data, day) {
	
    clearAllData();
	
    for (var i = (day * 8); i < ((data.list.length / 3) * day + 8); i++) {

       var newDiv = document.createElement("div"); //On créé la div qui contient les info.
        newDiv.id = "data";
        newDiv.className = "mb-5 mt-5"

        var newDateDay = document.createElement("p"); //On ajoute la date
        var date = data.list[i].dt_txt;
        var textDateDay = document.createTextNode(date);
        newDateDay.className = "p-5 text-center font-mono"
        newDateDay.appendChild(textDateDay);
		newDiv.appendChild(newDateDay);

		var newIcon = document.createElement("img"); //On ajoute l'image
        newIcon.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"
		var colorIndex = findIdByValue(descriptions,data.list[i].weather[0].description)
		var bg = colors[colorIndex];
		console.log(bg);
		console.log(data.list[i].weather[0].description);
        newIcon.className = "w-24 h-24 " + bg + " mx-auto rounded-full";
        newDiv.appendChild(newIcon);

        var newTemp = document.createElement("p"); //On ajoute la température
        var textTemp = document.createTextNode(data.list[i].main.temp + "°C");
        newTemp.className = "text-center font-mono"
        newTemp.appendChild(textTemp);
        newDiv.appendChild(newTemp);

        //On ajoute la div créé dans la div weathersDiv
        var currentDiv = document.getElementById('weathersDiv');
        weathersDiv.append(newDiv);
    }
}


function setCity() {
    var currentCity = document.getElementById("cities").value;

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&cnt=24&units=metric&appid=b782527836cdb579c4e35408ad62a234")
        .then(response => response.json())
        .then(data => {
            currentDay = document.getElementById("currentDay").value;
            addAllWeather(data, currentDay);
        })
}
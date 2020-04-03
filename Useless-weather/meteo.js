window.onload = setCity("Orange", document.getElementById("currentDay").value);

var currentCity = "Orange";
var currentDay;

var slider = document.getElementById("currentDay");

slider.oninput = function() {
    setCity();
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
        newIcon.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"
        newIcon.className = "w-24 h-24 bg-gray-500 mx-auto rounded-full";
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

    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&cnt=24&units=metric&appid=b782527836cdb579c4e35408ad62a234")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            currentDay = document.getElementById("currentDay").value;
            addAllWeather(data, currentDay);
        })
}
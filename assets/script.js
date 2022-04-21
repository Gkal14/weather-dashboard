var button= document.querySelector('.button')
var inputValue= document.querySelector('.inputValue')
var cityName= document.querySelector('.cityName')

// variables to be displayed
var cityName= document.querySelector('.cityName')
var today = document.querySelector('#today')
var date = new Date()
var dd = String(date.getDate()).padStart(2, '0')
var mm = String(date.getMonth() + 1).padStart(2, '0')
var yyyy = date.getFullYear()
date = dd + '/' + mm + '/' + yyyy

var description= document.querySelector('.description')
var icon= document.querySelector('.icon')
var temp= document.querySelector('.temp')
var humid= document.querySelector('.humid')
var wind= document.querySelector('.wind')
var uv= document.querySelector('.uv')

// event listener for button click
button.addEventListener('click', function(){

    //Show hidden fields once user has searched
    var weatherToday = document.querySelector('#weather-today');
    var fiveDay = document.querySelector('#five-day');
    var searchHistory = document.querySelector('#searchHistory');

    weatherToday.classList.remove('hide');
    fiveDay.classList.remove('hide');
    searchHistory.classList.remove('hide');

    weatherToday.classList.add('show');
    fiveDay.classList.add('show');
    searchHistory.classList.add('show');

    // our API key from OpenWeather
fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=d181a9b55d72cfbb2265fd5aaf6c7c54&units=metric')
.then(response => response.json())
// .then(data => console.log(data))

.then(data => {
    console.log(data);
    var nameValue = data['name'];
    var tempValue = data['main']['temp'];
    var descriptionValue = data['weather'][0]['main'];
    var windValue = data['wind']['speed'];
    var humidValue = data['main']['humidity'];

    cityName.innerHTML= nameValue;
    today.innerHTML = date;
    temp.innerHTML = tempValue + " degrees Celcius";

    // Section to determine what icon to display
    if (descriptionValue == 'Clouds'){
        icon.src = 'img/cloud.png';
    } else if (descriptionValue == 'Clear'){
        icon.src = 'img/sun.png';
    } else if (descriptionValue == 'Rain'){
        icon.src = 'img/rain.png';
    }

    wind.innerHTML= "Wind speed: " + windValue;
    humid.innerHTML= "Humidity: " + humidValue;

    var long = data['coord']['lon'];
    var lat = data['coord']['lat'];


    // get coordinates from input and call another api for extra data
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&appid=d181a9b55d72cfbb2265fd5aaf6c7c54')
    .then(information=>information.json())

    .then(data=>{
        console.log(data)
        var uvValue = data['current']['uvi'];
        uv.innerHTML= "UV Index: " + uvValue;

        if (uvValue <= 5){
            uv.classList.add('green-background');
            uv.classList.remove('orange-background');
            uv.classList.remove('red-background');

        } else if (uvValue > 5 && uvValue <7){
            uv.classList.add('orange-backround');
            uv.classList.remove('green-background');
            uv.classList.remove('red-background');
        } else {
            uv.classList.add('red-background');
            uv.classList.remove('green-background');
            uv.classList.remove('orange-background');
        }
       
        //Get 5 day forecast information
        //I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
        //Loop through 1-5 weather forecast and display
        for (let i = 1; i < 6; i++){

            var newDate = new Date()
            newDate.setDate(newDate.getDate()+i)
            var dd = String(newDate.getDate()).padStart(2, '0')
            var mm = String(newDate.getMonth() + 1).padStart(2, '0')
            var yyyy = newDate.getFullYear()
            newDate = dd + '/' + mm + '/' + yyyy

            var date = document.querySelector('.date'+i)
            var icon= document.querySelector('.icon'+i)
            var temp= document.querySelector('.temp'+i)
            var humid= document.querySelector('.humid'+i)
            var wind= document.querySelector('.wind'+i)
           
            var tempValue = data['daily'][i]['temp']['max'];
            //Change from kelvin to celsius
            tempValue = tempValue - 273.15;
            tempValue = tempValue.toFixed(2);
            var descriptionValue = data['daily'][i]['weather'][0]['main'];
            var windValue = data['daily'][i]['wind_speed'];
            var humidValue = data['daily'][i]['humidity'];

            // Section to determine what icon to display
            if (descriptionValue == 'Clouds'){
                icon.src = 'img/cloud.png';
            } else if (descriptionValue == 'Clear'){
                icon.src = 'img/sun.png';
            } else if (descriptionValue == 'Rain'){
                icon.src = 'img/rain.png';
            }

            date.innerHTML = newDate;
            temp.innerHTML = tempValue;
            wind.innerHTML= "Wind speed: " + windValue;
            humid.innerHTML= "Humidity: " + humidValue;
        }

    })

})
})

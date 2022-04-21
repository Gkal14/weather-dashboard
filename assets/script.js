var button= document.querySelector('.button')
var inputValue= document.querySelector('.inputValue')
var cityName= document.querySelector('.cityName')

// variables to be displayed
var cityName= document.querySelector('.cityName')
var description= document.querySelector('.description')
var icon= document.querySelector('.icon')
var temp= document.querySelector('.temp')
var humid= document.querySelector('.humid')
var wind= document.querySelector('.wind')
var uv= document.querySelector('.uv')

// event listener for button click
button.addEventListener('click', function(){
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
    temp.innerHTML = tempValue + " degrees Celcius";
    description.innerHTML= "Description: " + descriptionValue;

    // Section to determine what icon to display
    if (descriptionValue == 'Clouds'){
        icon.src = 'img/cloud.png';
    } else if (descriptionValue == 'Clear'){
        icon.src = 'img/sun.png';
    } else if (descriptionValue == 'Rainy'){
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

    })

})


// .catch(err => alert("incorrect city name"))
})
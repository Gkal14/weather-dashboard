var button=document.querySelector('.button')
var inputValue=document.querySelector('.inputValue')
var cityName=document.querySelector('.cityName')

// variables to be displayed
var cityName=document.querySelector('.cityName')
var description=document.querySelector('.description')
var temp=document.querySelector('.temp')
var humid=document.querySelector('.humid')
var wind=document.querySelector('.wind')
var uv=document.querySelector('.uv')

// event listener for button click
button.addEventListener('click', function(){
    // our API key from OpenWeather
fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=d181a9b55d72cfbb2265fd5aaf6c7c54&units=metric')
.then(response => response.json())
// .then(data => console.log(data))

.then(data => {
    var nameValue = data['name'];
    var tempValue = data['main']['temp'];
    var descriptionValue = data['weather'][0]['description'];
    var windValue = data['wind']['speed'];
    var humidValue = data['main']['humidity'];

    cityName.innerHTML=nameValue
    temp.innerHTML = tempValue + " degrees Celcius";
    description.innerHTML= "Description: " + descriptionValue;
    wind.innerHTML= "wind speed: " + windValue;
    humid.innerHTML= "humidity: " + humidValue;

})


// .catch(err => alert("incorrect city name"))
})
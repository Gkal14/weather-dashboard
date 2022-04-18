var button=document.querySelector('.button')
var inputValue=document.querySelector('.inputValue')
var name=document.querySelector('.name')

// variables to be displayed
var name=document.querySelector('.name')
var description=document.querySelector('.description')
var temperature=document.querySelector('.temp')
var humidity=document.querySelector('.humid')
var wind=document.querySelector('.wind')
var uv=document.querySelector('.uv')

// event listener for button click
button.addEventListener('click', function(){
    // our API key from OpenWeather
fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=d181a9b55d72cfbb2265fd5aaf6c7c54')
.then(response => response.json())
.then(data => console.log(data))

.catch(err => alert("incorrect city name"))
})
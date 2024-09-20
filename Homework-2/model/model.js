import { APIKEY } from "./api.js";
import { APIURL } from "./api.js";
let trail = "&days=7"
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
let isCelsius = false



export function listenForm() {
    $("#forecastSearch").click(
        function (e) {
            console.log("SEARCH")
            let forecast = $("#forecast").val();
            getForecast(forecast);
        }
    )
 

}



function getForecast(area) {
    
$.getJSON(APIURL + area + trail,function(data) {
    
$("#results").html(
    `<h5 class="title">Forecast for ${data.location.name}, ${data.location.region}</h5>
    <h5 class="country">${data.location.country}</h5>
    <div class="forecast">
    </div>`
);
$.each(data.forecast.forecastday, function (idx, day) { 
    
    let dayDate = new Date(day.date)
    let dayOfWeek = dayDate.getDay()
    // console.log(dayOfWeek)
    // console.log(day)
    $(".forecast").append(`<div class="card" id="${idx}">
    <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" height = "100px" >
    
    <h4>${days[dayOfWeek]}</h4>
    
    ${day.day.daily_will_it_rain == 1 ? `<p>${day.day.daily_chance_of_rain}% Chance of rain</p>` : "" }
    ${day.day.daily_will_it_snow == 1 ? `<p>${day.day.daily_chance_of_snow}% Chance of snow</p>` : "" }
    <p class="high-daily" jq-if="!isCelsius">High of ${day.day.maxtemp_f}&deg;</p>
    <p class="high-daily" jq-if="isCelsius">High of ${day.day.maxtemp_c}&deg;</p>

    <p class="low-daily" jq-if="!isCelsius">High of ${day.day.mintemp_f}&deg;</p>
    <p class="low-daily" jq-if="isCelsius">High of ${day.day.mintemp_c}&deg;</p>
    <p>Sunrise:<br> ${day.astro.sunrise} <br> Sunset:<br> ${day.astro.sunset}</p>
    </div>`)
   
})
$(".card").click(function(e) {
    getHourlyForecast(data.forecast.forecastday[e.currentTarget.id], data.location.name)
})
    
})
   

}
export function getHourlyForecast(dailyData, area) {
    console.log(dailyData)
    $("#results").html(
        
        `<div class="title-bar"><i class="fa-solid fa-arrow-left go-back"></i><h5 class="title">Hourly Forecast for ${area}</h5></div>
    <div class="forecast">`)
    $.each(dailyData.hour, function (idx, hour) {
        let timeDate = new Date(hour.time)
        let timeHour = timeDate.getHours() + 1
        $(".forecast").append(
        `<div class="card-hourly">
        <img src="${hour.condition.icon}" alt="${hour.condition.text}" height = "100px" >
        <h4>${timeHour> 12 ? `${timeHour - 12}:00 PM` : `${timeHour}:00 AM`}</h4>
        ${hour.will_it_rain == 1 ? `<p>${hour.chance_of_rain}% Chance of rain</p>` : "" }
        ${hour.will_it_snow == 1 ? `<p>${hour.chance_of_snow}% Chance of snow</p>` : "" }
        <p>Temperature: ${hour.temp_f}&deg;</p>

        
        `)}
        
    )


        
    
$(".go-back").click(function(e) {
getForecast(area)
})

}
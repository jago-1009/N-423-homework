import { APIKEY } from "./api.js";
import { APIURL } from "./api.js";
let trail = "&days=5"

export function listenForm() {
    $("#forecastSearch").click(
        function (e) {
            let forecast = $("#forecast").val();
            getForecast(forecast);
        }
    )
    
}

function getForecast(area) {
$.getJSON(APIURL + area + trail,function(data) {
$("#results").html(
    `<h5>Forecast for ${data.location.name}, ${data.location.region}</h5>`
);
console.log(data)
    
})
   

}
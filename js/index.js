async function search(a) {
    let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`);
    if (t.ok && 400 != t.status) {
        let a = await t.json();
        displayCurrent(a.location, a.current)
            , displayAnother(a.forecast.forecastday)
    }
}
document.getElementById("search").addEventListener("keyup", a => { search(a.target.value) });

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(a, t) {
    if (null != t) {
        var e = new Date(t.last_updated.replace(" ", "T"));
        let n = `
        <div class="today forecast">
        <div class="forecast-header col p-3 bg-black bg-opacity-50 text-secondary" id="today">
            <div class="day">${days[e.getDay()]}</div>
            <div class=" date">${e.getDate() + monthNames[e.getMonth()]}</div>
        </div>
        <div class="forecast-content p-5" id="current">
            <div class="location text-secondary">${a.name}</div>
            <div class="degree fs-1 fw-bolder d-flex"> <div class="num">${t.temp_c}<sup>o</sup>C</div>
                <div class="forecast-icon w-100"> <img src="https:${t.condition.icon}" alt="" width=90> </div>
            </div>
            <div class="custom text-info">${t.condition.text}</div>
            <span><img src="images/icon-umberella.png" class = "text-secondary py-3"> 20%</span>
            <span class = "px-2"><img src="images/icon-wind.png" class = "px-1 text-secondary py-3">18km/h</span>
            <span class = "px-2"><img src="images/icon-compass.png" class = "px-1 text-secondary py-3">East</span>
        </div>
    </div>`;

        document.getElementById("forecast").innerHTML = n
    }
}


function displayAnother(a) {
    let t = "";
    for (let e = 1; e < a.length; e++)
        t += `<div class="forecast text-center">
<div class="forecast-header p-3 bg-black bg-opacity-50 text-secondary">
    <div class="day">${days[new Date(a[e].date.replace(" ", "T")).getDay()]} </div>
</div>
<div class="forecast-content text-center p-5">
    <div class="forecast-icon"> <img src="https:${a[e].day.condition.icon}" width=48> </div>
    <div class="degree fs-1 fw-bolder">${a[e].day.maxtemp_c}<sup>o</sup>C</div>
    <small class = "text-secondary">${a[e].day.mintemp_c}<sup>o</sup></small>
    <div class="custom text-info">${a[e].day.condition.text}</div>
</div>
</div>`;
    document.getElementById("forecast").innerHTML += t
} search("cairo"); 
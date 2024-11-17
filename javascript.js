function updateCityTime(cityId, timezone) {
    const cityElement = document.querySelector(`#${cityId}`);
    if (cityElement) {
        const dateElement = cityElement.querySelector(".date");
        const timeElement = cityElement.querySelector(".time");
        const cityTime = moment().tz(timezone);

        dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
        timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
    }
}

function updateTime() {
    const cities = [
        { id: "Stockholm", timezone: "Europe/Stockholm" },
        { id: "Canberra", timezone: "Australia/Canberra" },
        { id: "Toronto", timezone: "America/Toronto" }
    ];

    cities.forEach(city => updateCityTime(city.id, city.timezone));
}

function updateCity(event) {
    let cityTimeZone = event.target.value;
    if (cityTimeZone === "current") {
        cityTimeZone = moment.tz.guess();
    }

    const cityName = cityTimeZone.replace("_", " ").split("/")[1];
    const cityTime = moment().tz(cityTimeZone);
    const citiesElement = document.querySelector("#cities");
    
    citiesElement.innerHTML = `
    <div class="city">
        <div>
            <h2>${cityName}</h2>
            <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
        </div>
        <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format("A")}</small></div>
    </div>
    `;
}

// Initialize the clock
updateTime();
setInterval(updateTime, 1000);

// Set up city selector
const citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
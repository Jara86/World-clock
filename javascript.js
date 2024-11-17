function updateCityTime(cityId, timezone) {
    const cityElement = document.querySelector(`#${cityId}`);
    if (cityElement) {
        const dateElement = cityElement.querySelector(".date");
        const timeElement = cityElement.querySelector(".time");
        const cityTime = moment().tz(timezone);

        dateElement.innerHTML = cityTime.format("dddd, MMMM Do YYYY");
        timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
    }
}

function updateTime() {
    const cities = [
        { id: "current-position", timezone: moment.tz.guess() },
        { id: "Stockholm", timezone: "Europe/Stockholm" },
        { id: "Canberra", timezone: "Australia/Canberra" },
        { id: "Toronto", timezone: "America/Toronto" },
        { id: "Tokyo", timezone: "Asia/Tokyo" },
        { id: "London", timezone: "Europe/London" }
    ];

    cities.forEach(city => updateCityTime(city.id, city.timezone));
}

function updateCity(event) {
    let cityTimeZone = event.target.value;
    if (cityTimeZone === "current") {
        cityTimeZone = moment.tz.guess();
    }

    const cityName = cityTimeZone.split("/")[1].replace(/_/g, " ");
    const cityTime = moment().tz(cityTimeZone);
    const citiesElement = document.querySelector("#cities");
    
    citiesElement.innerHTML = `
        <div class="city">
            <div>
                <h2>${cityName}</h2>
                <div class="date">${cityTime.format("dddd, MMMM Do YYYY")}</div>
            </div>
            <div class="time">
                ${cityTime.format("h:mm:ss")} 
                <small>${cityTime.format("A")}</small>
            </div>
        </div>
    `;
}

function setCurrentPosition() {
    const userTimeZone = moment.tz.guess();
    const cityName = userTimeZone.split("/")[1].replace(/_/g, " ");
    const currentElement = document.querySelector("#current-position");
    
    currentElement.querySelector("h2").innerHTML = `${cityName}`;
    updateCityTime("current-position", userTimeZone);
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    setCurrentPosition();
    updateTime();
    setInterval(updateTime, 1000);
});

// Set up city selector
const citySelect = document.querySelector("#city-select");
citySelect.addEventListener("change", updateCity);


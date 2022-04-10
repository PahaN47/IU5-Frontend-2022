const key = 'a5e82a728b935a4ea07eca664a5f978e';

function getLocationWeather(e) {
    let location = document.querySelector('input').value;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${1}&appid=${key}`)
    .then(response => response.ok ? response.json() : playWrong())
    .then(data => data.length === 0 ? playWrong() : getWeather(data));
}

function getWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location[0].lat}&lon=${location[0].lon}&appid=${key}&units=metric&lang=ru`)
    .then(response => response.json())
    .then(data => showWeather(location[0].local_names ? (location[0].local_names['ru'] ?
            location[0].local_names['ru'] : location[0].name) : location[0].name, data));
}

function showWeather(locationName, data) {
    document.getElementById('title').querySelector('div').textContent = locationName;

    let icon = document.getElementById('title').querySelector('img');
    icon.src =
        `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@4x.png`;
    icon.style.filter = 'hue-rotate(30deg) brightness(150%)';

    let weatherBoxes = document.getElementsByClassName('weather-box');
    data.current.timezone_offset = data.timezone_offset;
    data.hourly[1].timezone_offset = data.timezone_offset;
    data.hourly[6].timezone_offset = data.timezone_offset;
    fillWeatherBox(weatherBoxes[0], data.current);
    fillWeatherBox(weatherBoxes[1], data.hourly[1]);
    fillWeatherBox(weatherBoxes[2], data.hourly[6]);
    fillWeatherBox(weatherBoxes[3], data.daily[1], true);
    document.body.style.backgroundImage = 
    `linear-gradient(to bottom, #0000 70%, var(--main-darker-blue) 98%), url('images/${getBackroundUrl(data.current.weather[0])}')`;
}

function fillWeatherBox(weatherBox, data, special=false) {
    let timeBox = weatherBox.querySelector('.time');
    let time = new Date(special ? 
        data.dt * 1000 : (data.dt + data.timezone_offset + ((new Date()).getTimezoneOffset() * 60)) * 1000);
    timeBox.textContent = 
    `${formatInteger(time.getDate(), 2)}-${formatInteger(time.getMonth() + 1, 2)}-${time.getFullYear()}\
        ${formatInteger(time.getHours(), 2)}:${formatInteger(time.getMinutes(), 2)  }`;

    let temp = Math.round(special ? data.temp.day : data.temp);
    temp = temp > 0 ? '+' + temp : temp;
    weatherBox.querySelector('.temperature').textContent = temp;

    let icon = weatherBox.querySelector('.weather-icon');
    icon.style.background =
        `url('http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png')`;
    icon.style.filter = 'hue-rotate(30deg) brightness(150%)';
    icon.style.backgroundSize = 'contain';
    icon.style.backgroundRepeat = 'no-repeat';

    let weatherName = weatherBox.querySelector('.weather-name');
    weatherName.textContent = data.weather[0].description;

    let wind = weatherBox.querySelector('.etc').querySelector('.wind');
    wind.textContent = data.wind_speed + ' м/с';

    let humidity = weatherBox.querySelector('.etc').querySelector('.humidity');
    humidity.textContent = 'вл. ' + data.humidity + '%';

    let pressure = weatherBox.querySelector('.etc').querySelector('.pressure');
    pressure.textContent = Math.round(data.pressure * 100 * 0.00750062) + ' мм.рт.ст.';
}

function getBackroundUrl(weather) {
    let condition = weather.icon.substring(0, 2);
    switch (condition) {
        case '01':
            return 'clear_sky.jpg';
        case '02':
            return 'few_clouds.jpg';
        case '03':
            return 'scattered_clouds.jpg';
        case '04':
            return 'broken_clouds.jpg';
        case '09':
            return 'shower_rain.jpg';
        case '10':
            return 'rain.jpg';
        case '11':
            return 'thunderstorm.jpg';
        case '13':
            return 'snow.jpg';
        case '50':
            return 'mist.jpg';
        default:
            return undefined;
    }
}

function formatInteger(value, length) {
    value = String(value);
    let zeros = '0'.repeat(length);
    return zeros.substring(0, length - value.length) + value;
}

function playWrong() {
    let input = document.getElementById('search').querySelector('input');
    input.style.color = 'red';
}

let submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', getLocationWeather);

let input = document.getElementById('input-box').querySelector('form').querySelector('input');

input.addEventListener('change', function() {
    if (this.style.color === 'red') {
        this.style.color = 'var(--input-dark-grey)';
        return;
    }
});

document.body.onload = getLocationWeather;
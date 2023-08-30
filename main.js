const dateElement = document.getElementById('date');
const locationElement = document.getElementById('location');
const tempElement = document.getElementById('temp');
const weatherElement = document.getElementById('weather');
const searchBar = document.getElementById('search-bar');
const themeToggle = document.querySelector('.theme-toggle');
const appElement = document.getElementById('app');

themeToggle.addEventListener('click', () => {
  appElement.classList.toggle('dark-theme');
});

const variables = {
    api_key: "53378ee977b0303b6607dd81e9c50a3b",
    url: "https://api.openweathermap.org/data/2.5/"
};

async function fetchWeather (e) {
    if(e.key == 'Enter'){
        await fetch(
            `${variables.url}weather?q=${searchBar.value}&units=metric&APPID=${variables.api_key}`
        ).then(res => res.json())
        .then((data) => {
            dateElement.innerHTML = buildDate();
            locationElement.innerText = data.name;
            tempElement.innerText = data.main?.temp;
            weatherElement.innerText= data.weather[0]?.main;
            if(data.main.temp > 23){
                document.getElementById('app').classList.add('warm')
            }else{
                document.getElementById('app').classList.remove('warm');
            }
        })
    }
}

document.addEventListener("keyup", fetchWeather);

function buildDate() {
    let d = new Date();

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    let days = [
        'Sunday', 
        'Monday', 
        'Tuesday', 
        'Wednesday', 
        'Thursday', 
        'Friday', 
        'Saturday'
    ]
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}


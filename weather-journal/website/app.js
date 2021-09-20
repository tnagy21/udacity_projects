/* Global Variables */

const apiKey =  '19ec376037d38c64d48ffdc82acf4ad9';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS.
let d = new Date();
d.setMonth(d.getMonth() + 1);
let newDate = d.getMonth() +'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', getTemp);

/**
 * @description get the temprature and display on the page.
 */
function getTemp()
{
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;

    getWeatherData(zipCode)
    .then((data) =>{
        postProjectData('/addProjectData', {
            temp : Math.round(data.main.temp),
            date : newDate,
            content : feelings,
            city : data.name
        })
    })
    .then(getProjectData)
    .catch((error) => {
        console.log('error', error);
    })
}

/**
 * @description call the api to get the weather data.
 * @param {number} zipCode 
 */
const getWeatherData = async (zipCode)=> {
        const result = await fetch(baseUrl + zipCode + '&units=metric&appid=' + apiKey);
        const data = await result.json();
        if (data.cod == 404 || data.cod == 400)
            alert('Please enter valid zip code');
        return data;
} 

/**
 * @description get the data from server endpoint and update the UI.
 */
const getProjectData = async () => {
    try {
        const result = await fetch('/getProjectData');
        const data = await result.json();
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temp;
        document.getElementById('content').innerHTML = data.content;
        document.getElementById('city').innerHTML = data.city;
    } catch (error) {
        console.log('error', error)
    }
}

/**
 * @description post the data to server endpoint.
 * @param {string} url - server endpoint.
 * @param {*} data - weather data.
 */
const postProjectData = async (url, data) => {
    try{
        const result = await fetch(url, {
                method : 'POST',
                credentials : 'same-origin',
                headers : { 
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            });
    } catch (error)
    {
        console.log(error);
    }
}
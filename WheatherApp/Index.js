const wheatherForm = document.querySelector(".wheatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey="dacbdbea83ad7734e2385d7915e03a38";


wheatherForm.addEventListener("submit", async event =>{
event.preventDefault();

const city = cityInput.value;
if(city){
    try{

        const whetherData = await GetWheatherData(city);
        DisplayWheatherInfo(whetherData);
    }
    catch(error){
        console.error(error);
        displayError(error);
    };
    
}

else{
    displayError("Please Enter A City")
}
    

});

async function GetWheatherData(city) {

    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiurl);

    if(!response.ok){

        throw new Error("Could not fetch wheather data");
    }

return await response.json();

}

function DisplayWheatherInfo(data) {

    const{name:city,
          main:{temp,humidity},
          weather:[{description, id}]} = data;

    card.textContent = "";
    card.style.display ="flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const wheatherEmoji = document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent= `${(temp-273.00).toFixed(2)}C`;
    humidityDisplay.textContent = `Humid:${humidity}%`;
    descDisplay.textContent = `Description:${description}`;
    wheatherEmoji.textContent = GetWheatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    wheatherEmoji.classList.add("WheatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(wheatherEmoji);
    
    
}

function GetWheatherEmoji(wheatherId) {
    switch(true){
        case(wheatherId >= 200 && wheatherId < 300):
        return "⛈️";
         case(wheatherId >= 300 && wheatherId < 400):
        return "🌧️";
         case(wheatherId >= 500 && wheatherId < 600):
        return "🌧️";
         case(wheatherId >= 700 && wheatherId < 800):
        return "🌨️";
         case(wheatherId >= 200 && wheatherId < 300):
        return "🌫️";
         case(wheatherId == 800):
        return "☀️";
        case(wheatherId >= 801 && wheatherId < 810):
        return "☁️";
        default:
        return"❓";
    }
    
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display= "flex";
    card.appendChild(errorDisplay);
}
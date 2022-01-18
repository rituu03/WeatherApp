const container = document.querySelector(".container"),
inputPart = container.querySelector(".input_part"),
infoText = inputPart.querySelector(".info_txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherIcons = document.querySelector(".weather_part img");

let api;

inputField.addEventListener("keyup", e=>{
    // For non-empty values or location
    if(e.key == "Enter" && inputField.value != ""){
        // console.log("Hello");
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    else{
        alert("Geoloacation Not Supported");
    }
});
function onSuccess(position){
    const{latitude, longitude} = position.coords;
     api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=dbd3b02d8958d62185d02e944cd5f522`;
    fetchData();
  }

function onError(error){
    infoText.innerText = error.message;
    infoText.classList.add("error");
  
}

let apiKeyMy = "dbd3b02d8958d62185d02e944cd5f522";
function requestApi(city){
     api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=dbd3b02d8958d62185d02e944cd5f522`;
    fetchData();
}

function fetchData(){
    infoText.innerText = "Getting Weather Details...";
    infoText.classList.add("pending");
    fetch(api).then(response=>response.json()).then(result=>weatherDetails(result));
}

function weatherDetails(info){
    
    if(info.cod == "404"){
        // infoText.classList.replace("pending", " error");
        infoText.innerText = `${inputField.value} isn't a valid city name`;
        
    }
    else{
         const city = info.name;
         const country = info.sys.country;
         const {description, id} = info.weather[0];
         const {feels_like, humidity, temp} = info.main;

         if(id==800){
             weatherIcons.src = "images/sunrise.jpg"; // clear
         }
         else if(id>=200 && id <= 232){
            weatherIcons.src = "images/thunderstrom.png"; // strom
        }
        else if(id>=600 && id <=622){
            weatherIcons.src = "images/fourstarcloud.png";  //snow
        }
        else if(id>=701 && id<=781){
            weatherIcons.src = "images/mist-cloud-fog.webp"; //haze
        }
        else if(id>=801 && id<=804){
            weatherIcons.src = "images/sunny_weather.jpg"; //cloud
        }
        else if(id>=300 && id<=321 || (id>=500 && id<=531)){
            weatherIcons.src = "images/raining.png";    //rain
        }


         container.querySelector(".temp .numb_1").innerText = Math.floor(temp);
         container.querySelector(".weather").innerText = description;
         container.querySelector(".location span").innerText = `${city}, ${country}`;
         container.querySelector(".temp .numb_2").innerText =  Math.floor(feels_like);
         container.querySelector(".humidity span").innerText = `${humidity}%`;


        // infoText.classList.remove("pending", " error");
        container.classList.add("active");
        console.log(info);
    }
    
}
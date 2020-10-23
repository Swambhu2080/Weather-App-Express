const sbtbtn = document.getElementById('sbtbtn');
const cityNm = document.getElementById('cityNm');
const city_name = document.getElementById('city_name');
const temp_status =  document.getElementById('temp_status');
const temp_dyn =  document.getElementById('temp_dyn');
const data_hidden = document.querySelector('.middle_layer');
const Pressure = document.getElementById('Pressure');
const Humidity = document.getElementById('Humidity');
const Wind_Speed = document.getElementById('Wind_Speed');

const getInfo = async(event) =>{
    event.preventDefault();
    let cityval = cityNm.value;
    if(cityval === ""){
        city_name.innerText = `Please enter your city name before you search`;
        data_hidden.classList.add("data_hide");
    }else{
       try{
           let url =`http://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=API KEY`;// register in openweathermap to get api key
            const resp = await fetch(url);
            const data =  await resp.json();
            const arr = [data];
            city_name.innerText = `${arr[0].name}, ${arr[0].sys.country}`;
            temp_dyn.innerText = arr[0].main.temp;
            const temp_symbol = arr[0].weather[0].main;
            if (temp_symbol == "Clear") {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
                } else if (temp_symbol == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
                } else if (temp_symbol == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
                } else {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color:#FFFF00;'></i>";
                }
                Pressure.innerText = `Pressure : ${arr[0].main.pressure}`;
                Humidity.innerText = `Humidity : ${arr[0].main.humidity}`;
                Wind_Speed.innerText = `Wind Speed : ${arr[0].wind.speed}`;
                data_hidden.classList.remove('data_hidden');
                cityval = "";
            }catch{
                cityval = " ";
                data_hidden.classList.add("data_hide");
                city_name.innerText =  `please enter the proper city name`;
                console.log('please add the proper city name');
           }
    }
}

sbtbtn.addEventListener('click',getInfo)

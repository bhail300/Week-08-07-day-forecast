import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/newHome.module.css'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function Home() {

  const apikey = process.env.NEXT_PUBLIC_APIKEY;
  const location = 'vancouver';
  const units = 'metric';

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apikey}`;

  const [data, setData] = useState();
  const grabWeather = useRef(false);


  const fetchWeather = async () =>{
    const response = await axios.get(url);
    console.log(response);

    console.log(response.data.list);
    const arrayOfDays = [];

    let weatherData = response.data.list.map((weather, index)=>{
      console.log(parseInt(weather.dt_txt.substr(8,2), 10));
      let num = parseInt(weather.dt_txt.substr(8,2), 10);

      if(num != arrayOfDays.find(element => element === num)){
        arrayOfDays.push(num);
        console.log("Here");
        console.log(response.data.list[index])
        var month = '';
        var icon = '';

        if(weather.dt_txt.substr(5,2) == 1) {
          month = "January"
        }else if(weather.dt_txt.substr(5,2) == 2){
          month = "February"
        }else if(weather.dt_txt.substr(5,2) == 3){
          month = "March"
        }else if(weather.dt_txt.substr(5,2) == 4) {
          month = "April"
        }else if(weather.dt_txt.substr(5,2) == 5) {
          month = "May"
        }else if(weather.dt_txt.substr(5,2) == 6) {
          month = "June"
        }else if(weather.dt_txt.substr(5,2) == 7) {
          month = "July"
        }else if(weather.dt_txt.substr(5,2) == 8) {
          month = "August"
        }else if(weather.dt_txt.substr(5,2) == 9) {
          month = "September"
        }else if(weather.dt_txt.substr(5,2) == 10){
          month = "October" 
        }else if(weather.dt_txt.substr(5,2) == 11) {
          month = "November"
        }else if(weather.dt_txt.substr(5,2) == 12) {
          month = "December"
        }

        if(weather.weather[0].main == 'Clouds'){
          icon = '/icons/clouds.svg'
        }else if(weather.weather[0].main == 'Clear'){
          icon = '/icons/clearsky.svg'
        }else if(weather.weather[0].main == 'Atmosphere'){
          icon = '/icons/mist.svg'
        }else if(weather.weather[0].main == 'Rain'){
          icon = '/icons/rain.svg'
        }else if(weather.weather[0].main == 'Drizzle'){
          icon = '/icons/lightrain.svg'
        }else if(weather.weather[0].main == 'Snow'){
          icon = '/icons/snow.svg'
        }else if(weather.weather[0].main == 'Thunderstorm'){
          icon = '/icons/thunderstorm.svg'
        }

        var now = new Date (weather.dT_txt);
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',]
        var day = days[now.getDate()];

        return (
          <div key={index} className={styles.card}>
            <Image
              src={icon}
              alt={icon}
              width={75}
              height={75}
              priority
            />
            <p>
              {day} <br/> {month} {weather.dt_txt.substr(8,2)}, {weather.dt_txt.substr(0,4)}
            </p>
            <div>{weather.main.temp.toFixed(1)} °C</div>
            <div>{weather.weather[0].main}</div>
          </div>
        )
      }
    })

    console.log(arrayOfDays);
    setData(weatherData);
  }

  useEffect(() => {
    if(grabWeather.current === true){
      fetchWeather();
    }

    return() => {
      grabWeather.current = true;
    }
  }, [])

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  

  return (
    <>
      <Head>
        <title>Weekly Weather App</title>
        <meta name="description" content="An app that forecasts weather for the next 7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/newicons/clearsky.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Vancouver, B.C. Weather<br/>
            Last Updates: {date}
          </p>
        </div>
        <div className={styles.center}>
          <div className={styles.thirteen}>Weekly Weather App</div>
          <Image
            src="/weatherlogo2.svg"
            alt="logo containing icons depicting the 4 seasons"
            width={200}
            height={200}
            priority
          />
        </div>
        <div className={styles.grid}>
          {data}
        </div>
      </main>
    </>
  )
}

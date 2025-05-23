// import { useState } from 'react'
import { useEffect, useState } from 'react';
import '../../App.css';
import Cloud_With_Sun from '../../assets/WeatherAssets/Cloud_With_Sun.png';
import Cloudy from '../../assets/WeatherAssets/Cloudy.png';
import Breaking_Clouds from '../../assets/WeatherAssets/Breaking_Clouds.png';
import Rainy from '../../assets/WeatherAssets/Rainy.png';
import Sunny from '../../assets/WeatherAssets/Sunny.png';
import Thunder from '../../assets/WeatherAssets/Thunder.png';
import Windy from '../../assets/WeatherAssets/Windy.png';
import Snowy from '../../assets/WeatherAssets/Snowy.png';
import { WeatherIcon } from './WeatherIcon';
import { WeatherTemp } from './WeatherTemp';
import { WeatherMessage } from './WeatherMessage';

type WeatherData = {
  humidity: number;
  windSpeed: number;
  current_temperature: number;
  min_temperature: number;
  max_temperature: number;
  location: string;
  icon: string;
}

export const WeatherDiv: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [message, setMessage] = useState<string>("");
  const allIcons: Record<string, string> = {
    "01d" : Sunny,
    "02d" : Cloud_With_Sun,
    "03d" : Cloudy,
    "04d" : Breaking_Clouds,
    "09d" : Rainy,
    "10d" : Rainy,
    "11d" : Thunder,
    "13d" : Snowy,
    "50d" : Cloudy,
    "01n" : Sunny,
    "02n" : Cloud_With_Sun,
    "03n" : Cloudy,
    "04n" : Breaking_Clouds,
    "09n" : Rainy,
    "10n" : Rainy,
    "11n" : Thunder,
    "13n" : Snowy,
    "50n" : Windy,
  };
  const search = async (city: String) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || Sunny;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        current_temperature: Math.floor(data.main.temp),
        min_temperature: Math.floor(data.main.temp_min),
        max_temperature: Math.floor(data.main.temp_max),
        location: data.name,
        icon: icon,
      })
      constructMessage(data.main.temp_max, data.weather[0].icon);
    } catch (error) {
    }
  }
  const constructMessage = (temperature: number, icon: string) => {
    let newMessage: string = "";
    const umbrellaDays: string[] = ["04d", "09d", "10d", "11d", "04n", "09n", "10n", "11n"];
    if (temperature <= 22) {
      newMessage = "Make sure to bring a jacket";
    } else {
      newMessage = "Make sure to wear sunscreen";
    }

    if (umbrellaDays.includes(icon)) {
      if (newMessage.includes("jacket")) {
        newMessage += " and an umbrella!";
      } else {
        newMessage += " and bring an umbrella!";
      }
    } else {
      newMessage += "!";
    }

    setMessage(newMessage);
  }

  useEffect(() => {
    search("Sydney");
  }, [])

  return (
    <div className="row-span-1 flex rounded-[10px] flex-col">
      <div className="tracking-wide text-[0.8rem] font-light text-black/50">
        Weather
      </div>
      
      <div className="grid grid-cols-6 grid-rows-1 w-full h-full gap-2 border-1 border-black/5 w-full rounded-[10px] px-2">
        <WeatherIcon icon={weatherData?.icon}/>
        <div className="col-span-5">
          <div className="grid grid-rows-2 grid-cols-1 py-2">
            <WeatherTemp current_temperature={weatherData?.current_temperature} min_temperature={weatherData?.min_temperature} max_temperature={weatherData?.max_temperature} />
            <WeatherMessage message={message} />
          </div>
        </div>
      </div>
    </div>
  );
}
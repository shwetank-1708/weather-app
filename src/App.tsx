import { useState } from "react";
import "./App.css";
import { IoSearch } from "react-icons/io5";
import sun from "./assets/sun.gif";
import drizzle from "./assets/drizzle.gif";
import foggy from "./assets/foggy.gif";
import clouds from "./assets/clouds.gif";
import rain from "./assets/rain.gif";

interface WeatherData {
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
  }>;
  name: string;
  sys: {
    country: string;
  };
}

function App() {
  const apiKey = "d406beff9fb84b4e7d5be89c9fd82025";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");
  const [img, setImg] = useState<string | undefined>(sun);

  const handleWeather = (weatherType: string) => {
    if (weatherType === "Rain") {
      setImg(rain);
    } else if (weatherType === "Drizzle") {
      setImg(drizzle);
    } else if (weatherType === "Fog") {
      setImg(foggy);
    } else if (weatherType === "Clouds") {
      setImg(clouds);
    } else {
      setImg(sun); // Default to sun
    }
  };

  const getWeatherDetails = async () => {
    console.log("Clicked");
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    console.log(response);
    let data = await response.json();
    console.log(data);
    console.log(data);

    if (data.cod === 200) {
      setWeatherData(data);
      setError("");
      handleWeather(data.weather[0].main);
    } else {
      setWeatherData(null);
      setError("Invalid City Name");
    }
  };

  return (
    <>
      <div className="h-[100vh] w-full bg-sky-500 flex justify-center items-center">
        <div className="max-h-[80vh] w-[60%] bg-sky-50 p-11 rounded-3xl">
          <div className="flex justify-center">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City Name"
              className="my-5 p-3 border-2 border-sky-500 rounded-full text-lg"
            />
            <button
              onClick={getWeatherDetails}
              className="bg-red-600 m-5 p-5 text-lg rounded-full hover:text-white"
            >
              <IoSearch />
            </button>
          </div>

          <div className="flex justify-center">
            <p>{error}</p>
          </div>

          {weatherData && (
            <div className="flex flex-col items-center gap-2">
              <img className="w-[200px]" src={img} />
              <p>{Math.round(weatherData.main.temp)} °C</p>
              <p>{weatherData.weather[0].main}</p>
              <p>{weatherData.name}</p>
              <p>{weatherData.sys.country}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

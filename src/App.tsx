import { useState } from "react";
import "./App.css";
import { IoSearch } from "react-icons/io5";
import sun from "./assets/sun.gif";
import drizzle from "./assets/drizzle.gif";
import foggy from "./assets/foggy.gif";
import clouds from "./assets/clouds.gif";
import rain from "./assets/rain.gif";
import feelsLike from "./assets/feels_like.gif";
import humidity from "./assets/humidity.gif";
import wind from "./assets/wind.gif";
import location from "./assets/location.gif";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
  }>;
  wind: {
    speed: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
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

    console.log(weatherData);
  };

  return (
    <>
      <div className="h-[100vh] w-full bg-sky-500 flex justify-center items-center">
        <div className="sm:h-[80vh] h-[100vh] w-[100%] md:w-[60%] bg-sky-50 p-11 rounded-3xl">
          <div className="flex justify-center">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City Name"
              className="my-5 p-3 border-2 border-sky-500 rounded-full text-lg"
            />
            <button
              onClick={getWeatherDetails}
              className="bg-sky-500 m-5 p-5 text-lg rounded-full hover:text-white"
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
              <p className="text-2xl font-bold">
                {Math.round(weatherData.main?.temp)} °C
              </p>
              <p className="text-2xl font-bold">
                {weatherData.weather[0]?.main}
              </p>
              <p className="text-2xl font-bold">{weatherData.name}</p>
              <p className="text-2xl font-bold">{weatherData.sys?.country}</p>

              <div className="grid grid-cols-2 justify-around mt-5 gap-11">
                <div className="flex items-center">
                  <img src={feelsLike} className="w-[50px]" />
                  <div>
                    <p>Feels Like</p>
                    <p>{weatherData.main?.feels_like ?? "N/A"} °C</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <img src={humidity} className="w-[50px]" />
                  <div>
                    <p>{weatherData.main?.humidity ?? "N/A"} %</p>
                    <p>Humidity</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <img src={wind} className="w-[50px]" />
                  <div>
                    <p>{weatherData.wind?.speed ?? "N/A"} Km/h</p>
                    <p>Wind Speed</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <img src={location} className="w-[50px]" />
                  <div>
                    <p>
                      Lat: -{" "}
                      {weatherData.coord?.lat
                        ? Math.round(weatherData.coord.lat)
                        : "N/A"}
                    </p>
                    <p>
                      Long: -{" "}
                      {weatherData.coord?.lon
                        ? Math.round(weatherData.coord.lon)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

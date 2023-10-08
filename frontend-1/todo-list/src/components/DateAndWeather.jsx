import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DateAndWeather() {
  const [weather, setWeather] = useState(null);

  let dates = new Date();

  const city = "Jakarta";

  const API_KEY = "93d5ab5080169004f0e6618fb2962fed";

  const getWeather = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then((res) => {
        setWeather(res.data.weather);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getWeather();
  }, []);

  const day = dates.toLocaleDateString("en-US", { weekday: "long" });
  const date = dates.getDate();
  const month = dates.toLocaleDateString("en-US", { month: "long" });
  const year = dates.getFullYear();

  return (
    <div className="w-full p-3 flex justify-around">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <p className="text-4xl text-gray-700 font-bold">{date}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-1xl text-gray-700 font-bold">{month}</p>
          <p className="text-1xl text-gray-700 font-bold">{year}</p>
        </div>
      </div>
      <div className=" flex flex-col items-center">
        <p className="text-2xl text-gray-700 font-bold">{day}</p>
        <div className="flex  items-center">
          <p className="text-base text-gray-400  font-semibold">
            {weather ? weather[0].main : "unknown"}
          </p>
          <img
            src={`http://openweathermap.org/img/w/${
              weather ? weather[0].icon : "unknown"
            }.png`}
            alt="..."
          />
        </div>
      </div>
    </div>
  );
}

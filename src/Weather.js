import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather() {
  let [city, setCity] = useState("");
  let [temperature, setTepmerature] = useState("");
  let [description, setDescription] = useState("");
  let [humidity, setHumidity] = useState("");
  let [wind, setWind] = useState("");
  let [icon, setIcon] = useState("");
  let [loaded, setLoaded] = useState(false);

  function showTemperature(response) {
    setLoaded(true);
    setTepmerature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=819bdbcfe78aaa2e79e6bdef77a5fff3&units=metric`;
    axios.get(url).then(showTemperature);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  let form = (
    <div className="Container">
      <form className="Search" onSubmit={handleSubmit}>
        <h2>Interested in the weather?</h2>
        <div className="row">
          <div className="col-9">
            <input
              className="box"
              type="search"
              onChange={updateCity}
              placeholder="Type a city..."
            />
          </div>

          <div className="col-3">
            <input className="button" type="submit" value="search" />
          </div>
        </div>
      </form>
    </div>
  );

  if (loaded) {
    return (
      <div className="Weather">
        {form}
        <div className="row">
          <div className="col-6">
            <ul>
              <div className="row">
                <div className="col-6">
                  <li className="temperature">{Math.round(temperature)}°C </li>
                </div>
                <div className="col-6">
                  <li>
                    <img className="Icon" src={icon} alt="Weather icon" />
                  </li>
                </div>
              </div>
            </ul>
          </div>

          <div className="col-6">
            <ul className="esentialsRight">
              <li className="description">{description}</li>
              <li>Humidity: {humidity}%</li>
              <li>Wind: {wind}m/s</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>{form}</div>;
  }
}

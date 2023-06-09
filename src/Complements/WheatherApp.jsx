import React, { useState, useEffect } from 'react';

const API_KEY = 'a462184b6683b1e4ec410178935e07d9';

function WeatherApp() {
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (location && country) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location},${country}&appid=${API_KEY}`
          );
          const data = await response.json();
          if (data.cod === '404') {
            setError('No se encontraron datos para la ubicación ingresada.');
            setWeatherData(null);
          } else {
            setWeatherData(data);
            setError(null);
          }
        } catch (error) {
          setError('Ocurrió un error al obtener los datos del clima.');
          setWeatherData(null);
        }
      }
    };

    fetchWeatherData();
  }, [location, country]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSearch = () => {
    if (location.trim() === '' || country.trim() === '') {
      setError('Por favor, ingresa una ubicación y un país.');
      setWeatherData(null);
      return;
    }

    setError(null);
  };

  return (
    <div>
      <h1>Consulta del Clima</h1>
      <div>
        <label>
          Ubicación:
          <select value={location} onChange={handleLocationChange}>
            <option value="">Seleccione una ubicación</option>
            <option value="tucuman">Tucumán</option>
            <option value="buenosaires">Buenos Aires</option>
            <option value="cordoba">Córdoba</option>
            {/* Agrega más opciones según tus necesidades */}
          </select>
        </label>
      </div>
      <div>
        <label>
          País:
          <input type="text" value={country} onChange={handleCountryChange} />
        </label>
      </div>
      <button onClick={handleSearch}>Consultar</button>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Información del Clima</h2>
          <p>Ubicación: {weatherData.name}</p>
          <p>País: {weatherData.sys.country}</p>
          <p>Temperatura: {weatherData.main.temp} °C</p>
          <p>Descripción: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;

import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather(lat: number, lon: number) {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&&units=metric`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

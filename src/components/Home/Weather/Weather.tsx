import { useEffect, useState } from 'react';
import { getWeather } from '@/src/services/weather';
import weatherDescKo from '@/src/data/weatherDescKo';
import * as S from '@/src/components/Home/Weather/styles';
import { WeatherData } from '@/src/components/Home/Weather/types';
import Pin from '@/src/assets/Pin.svg?react';
import Loading from '@/src/components/Common/Loading';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentTemperature, minTemperature, maxTemperature } from '@/src/recoil/atom/temperature';
import { currentCoordinate, currentAddress } from '@/src/recoil/atom/location';

function Weather() {
  const [weatherData, setWeatherData] = useState<null | WeatherData>(null);
  const [weatherDescKoData, setWeatherDescKoData] = useState('');
  const [Temp, setTemp] = useRecoilState(currentTemperature);
  const [minTemp, setMinTemp] = useRecoilState(minTemperature);
  const [maxTemp, setMaxTemp] = useRecoilState(maxTemperature);
  const [location, setLocation] = useRecoilState(currentCoordinate);
  const roadAddress = useRecoilValue(currentAddress);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setLocation({ latitude: lat, longitude: lon });
      getWeather(location.latitude, location.longitude).then((weather) => {
        setWeatherData(weather);
      });
    });
  }, []);

  useEffect(() => {
    if (weatherData) {
      const weatherId = weatherData.weather[0].id;
      const foundItem = weatherDescKo.find((item) => weatherId in item);
      setTemp(Math.floor(weatherData.main.temp));
      setMinTemp(Math.round(weatherData.main.temp_min));
      setMaxTemp(Math.round(weatherData.main.temp_max));

      if (foundItem) {
        const weatherDesc = foundItem[weatherId];
        setWeatherDescKoData(weatherDesc);
      }
    }
  }, [weatherData]);

  return (
    <>
      {weatherData ? (
        <div>
          <S.City>
            <div>
              <Pin />
              <p>{roadAddress.road}</p>
            </div>
            <p>{weatherDescKoData}</p>
          </S.City>
          <S.Temp>{Temp}</S.Temp>
          <S.TempMinMax>
            <p>{minTemp}</p>
            <div></div>
            <p>{maxTemp}</p>
          </S.TempMinMax>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Weather;

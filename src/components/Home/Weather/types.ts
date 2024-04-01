export type WeatherData = {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  weather: { id: number; icon: string }[];
};

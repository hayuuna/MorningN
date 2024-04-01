import { atom } from 'recoil';

export const currentTemperature = atom({
  key: 'currentTemperature',
  default: 0,
});

export const minTemperature = atom({
  key: 'minTemperature',
  default: 0,
});

export const maxTemperature = atom({
  key: 'maxTemperature',
  default: 0,
});

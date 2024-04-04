import { atom } from 'recoil';

export const currentCoordinate = atom({
  key: 'currentCoordinate',
  default: { latitude: 0, longitude: 0 },
});

export const currentAddress = atom({
  key: 'currentAddress',
  default: { si: '', gu: '', dong: '', road: '' },
});

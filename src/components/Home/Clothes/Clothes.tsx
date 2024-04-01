import { useRecoilValue } from 'recoil';
import { clothes } from '@/src/data/clothes';
import { currentTemperature } from '@/src/recoil/atom/temperature';
import { useEffect, useState } from 'react';
import * as S from '@/src/components/Home/Clothes/styles';

type ClothesData = [number, number, ...string[]];

function Clothes() {
  const temperature = useRecoilValue<number>(currentTemperature);
  const [clothesArray, setClothesArray] = useState<string[]>([]);
  const [minTemperature, setMinTemperature] = useState<number>(0);
  const [maxTemperature, setMaxTemperature] = useState<number>(0);

  function getMatchingClothes(temperature: number, clothes: ClothesData[]) {
    for (const [maxTemp, minTemp, ...items] of clothes) {
      if (temperature >= minTemp && temperature <= maxTemp) {
        setMinTemperature(minTemp);
        setMaxTemperature(maxTemp);
        setClothesArray(items);
        return;
      }
    }
    return;
  }

  useEffect(() => {
    getMatchingClothes(temperature, clothes);
  }, [temperature]);

  return (
    <div>
      <S.Temp>
        <p>{minTemperature}°C</p>
        <p>&nbsp;~&nbsp;</p>
        <p>{maxTemperature}°C</p>
      </S.Temp>
      <p>{clothesArray.join(', ')}</p>
    </div>
  );
}

export default Clothes;

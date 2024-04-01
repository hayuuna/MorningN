import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useState } from 'react';
import * as S from '@/src/components/Home/Day/styles';

dayjs.locale('ko');

function Day() {
  const currentMonth = dayjs().format('MM월');
  const currentDate = dayjs().format('DD');
  const currentDay = dayjs().format('ddd');
  const [currentTime, setCurrentTime] = useState(dayjs().format('A hh:mm:ss'));

  useEffect(() => {
    const Timer = setInterval(() => {
      setCurrentTime(dayjs().format('A hh:mm:ss'));
    }, 1000);

    return () => {
      clearInterval(Timer);
    };
  }, []);

  return (
    <S.Container>
      <div>
        <span>
          <S.Month>{currentMonth}</S.Month>
          <S.Day>{currentDay}</S.Day>
        </span>
        <S.Date>{currentDate}</S.Date>
      </div>
      <S.Time>{currentTime}</S.Time>
    </S.Container>
  );
}

export default Day;

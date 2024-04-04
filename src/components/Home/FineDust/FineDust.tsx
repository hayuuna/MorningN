import { useEffect, useState } from 'react';
import { getFineDust, getNearbyMsrstnList } from '@/src/services/finedust';
import { useRecoilValue, useRecoilState } from 'recoil';
import { currentCoordinate, currentAddress } from '@/src/recoil/atom/location';
import axios from 'axios';
import Loading from '../../Common/Loading';
import * as S from '@/src/components/Home/FineDust/styles';

interface Location {
  latitude: number;
  longitude: number;
}
interface TmCoordinate {
  x: number;
  y: number;
}

interface GradeProps {
  grade: string;
}

function Grade({ grade }: GradeProps) {
  switch (grade) {
    case '1':
      return <p style={{ color: 'green' }}>좋음!</p>;
    case '2':
      return <p style={{ color: 'green' }}>보통</p>;
    case '3':
      return <p style={{ color: 'red' }}>나쁨!</p>;
    case '4':
      return <p style={{ color: 'red' }}>매우 나쁨!!</p>;
  }
}

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;

function FineDust() {
  const location = useRecoilValue<Location>(currentCoordinate);
  const [locationObj, setLocationObj] = useRecoilState(currentAddress);
  const x = location.longitude;
  const y = location.latitude;
  const [tmCoordinate, setTmCoordinate] = useState<TmCoordinate>({ x: 0, y: 0 });
  const [pm10Value, setPm10Value] = useState(0);
  const [pm10ValueGrade, setPm10ValueGrade] = useState('');
  const [pm25Value, setPm25Value] = useState(0);
  const [pm25ValueGrade, setPm25ValueGrade] = useState('');

  // 좌표 -> 주소 변환
  async function getAddress() {
    if (x !== 0 && y !== 0) {
      try {
        await axios
          .get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${x}&y=${y}`, {
            headers: {
              Authorization: `KakaoAK ${KAKAO_CLIENT_ID}`,
            },
          })
          .then((res) => {
            const location = res.data.documents[0].road_address;
            setLocationObj({
              si: location.region_1depth_name,
              gu: location.region_2depth_name,
              dong: location.region_3depth_name,
              road: location.road_name,
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  // TM좌표 구하기
  async function getTmCoordinate() {
    try {
      axios
        .get(`https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${x}&y=${y}&input_coord=WGS84&output_coord=TM`, {
          headers: {
            Authorization: `KakaoAK ${KAKAO_CLIENT_ID}`,
          },
        })
        .then((res) => {
          setTmCoordinate(res.data.documents[0]);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAddress();
    getTmCoordinate();
    getNearbyMsrstnList(tmCoordinate.x, tmCoordinate.y)
      .then((res) => {
        return getFineDust(res.stationName);
      })
      .then((res) => {
        if (res.response.body.items.length > 0) {
          setPm10Value(res.response.body.items[0].pm10Value);
          setPm25Value(res.response.body.items[0].pm25Value);
          setPm10ValueGrade(res.response.body.items[0].pm10Grade);
          setPm25ValueGrade(res.response.body.items[0].pm25Grade);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  if (locationObj.road === '') {
    return <Loading />;
  }
  return (
    <S.Container>
      <S.PmValue grade={10}>
        <div>
          <p>미세먼지</p>
          <Grade grade={pm10ValueGrade} />
        </div>
        <S.PmValueNum>{pm10Value}</S.PmValueNum>
      </S.PmValue>
      <S.PmValue grade={25}>
        <div>
          <p>초미세먼지</p>
          <Grade grade={pm25ValueGrade} />
        </div>
        <S.PmValueNum>{pm25Value}</S.PmValueNum>
      </S.PmValue>
    </S.Container>
  );
}

export default FineDust;

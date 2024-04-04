import axios from 'axios';

const API_KEY = import.meta.env.VITE_FINEDUST_API_KEY;
const base_url = 'http://apis.data.go.kr/B552584/';

// 미세먼지 수치
export async function getFineDust(stationName: string) {
  try {
    const res = await axios.get(
      `${base_url}ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${stationName}&dataTerm=DAILY&ver=1.0&pageNo=1&numOfRows=200&returnType=json&serviceKey=${API_KEY}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

// 현재 가장 가까운 미세먼지 관측소
export async function getNearbyMsrstnList(x: number, y: number) {
  try {
    const res = await axios.get(
      `${base_url}MsrstnInfoInqireSvc/getNearbyMsrstnList?ver=1.1&tmX=${x}&tmY=${y}&returnType=json&serviceKey=${API_KEY}`
    );
    return res.data.response.body.items[1];
  } catch (err) {
    console.error(err);
  }
}

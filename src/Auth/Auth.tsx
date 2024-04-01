import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Data = {
  access_token: string;
};

function Auth() {
  const navigate = useNavigate();
  const AUTHORIZE_CODE: string | null = new URL(window.location.href).searchParams.get('code');
  const GRANT_TYPE: string = 'authorization_code';
  const REST_API_KEY: string = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const REDIRECT_URI: string = import.meta.env.VITE_REDIRECT_URI;
  const [, setData] = useState<Data | null>(null);

  useEffect(() => {
    if (AUTHORIZE_CODE) {
      axios
        .post(
          `https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
          {},
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .then((response) => {
          setData(response.data);
          const ACCESS_TOKEN = response.data.access_token;
          axios
            .post(
              'https://kapi.kakao.com/v2/user/me',
              {},
              {
                headers: {
                  Authorization: `Bearer ${ACCESS_TOKEN}`,
                  'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
              }
            )
            .then((response) => {
              const { kakao_account } = response.data;
              const { profile } = kakao_account;
              const { nickname, profile_image_url } = profile;
              // console.log(id, nickname, profile_image_url, thumbnail_image_url);
              localStorage.setItem('user', JSON.stringify({ name: nickname, image: profile_image_url }));
              navigate('/home');
            })
            .catch((error) => console.log('사용자 정보 받기 실패', error));
        })
        .catch((error) => console.log(error));
    }
  }, [AUTHORIZE_CODE, GRANT_TYPE, REST_API_KEY, REDIRECT_URI, navigate]);

  return null;
}

export default Auth;

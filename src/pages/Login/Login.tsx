import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/src/assets/logo.png';
import defaultUserImg from '@/src/assets/defaultUserImg.png';
import kakao from '@/src/assets/kakao.png';
import * as S from '@/src/pages/Login/styles';
import Add from '@/src/assets/Add.svg?react';

type UploadImage = {
  file: File;
  thumbnail: string;
  type: string;
};

const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function Login() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<UploadImage | null>(null);
  const [userName, setUserName] = useState<string>('');

  function handleClickFileInput() {
    fileInputRef.current?.click();
  }

  function uploadProfile(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);
      setImageFile({
        file: fileList[0],
        thumbnail: url,
        type: fileList[0].type.slice(0, 5),
      });
    }
  }

  function showImage() {
    if (!imageFile || imageFile === null) {
      return (
        <S.ProfileImg>
          <img src={defaultUserImg} alt="비어있는 프로필" />
        </S.ProfileImg>
      );
    }
    return (
      <S.ProfileImg>
        <img src={imageFile.thumbnail} alt={imageFile.type} onClick={handleClickFileInput} />
      </S.ProfileImg>
    );
  }

  function saveUserName(e: React.ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
  }

  function loginHandler() {
    if (userName === '') {
      return;
    }
    localStorage.setItem('user', JSON.stringify({ name: userName, image: imageFile?.thumbnail }));
    nicknameLoginHandler();
  }

  function kakaoLoginHandler() {
    window.location.href = KAKAO_AUTH_URL;
  }

  function nicknameLoginHandler() {
    navigate('/home');
  }

  return (
    <S.Container>
      <S.LogoImage src={logo} />
      <p>만나서 반갑습니다.</p>
      <p>사용하실 프로필을 설정해주세요.</p>

      <S.UserImage>
        {showImage()}
        <button type="button" onClick={handleClickFileInput}>
          <Add />
        </button>
        <input type="file" accept="image.jpg, image.jpeg, image.png" onChange={uploadProfile} ref={fileInputRef} />
      </S.UserImage>

      <S.NicknameInput placeholder="닉네임을 입력해주세요." onChange={saveUserName} />
      <S.NextButton onClick={loginHandler}>계속하기</S.NextButton>

      <S.Other>
        <p>간편하게 연결하기</p>
        <hr />
        <button onClick={kakaoLoginHandler}>
          <img src={kakao} />
        </button>
      </S.Other>
    </S.Container>
  );
}

export default Login;

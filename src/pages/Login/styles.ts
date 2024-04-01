import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LogoImage = styled.img`
  width: 200px;
  margin-bottom: 22px;
`;

export const ProfileImg = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 38px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserImage = styled.div`
  width: 140px;
  height: 140px;
  position: relative;
  margin: 0 auto;

  img {
    width: 100%;
  }

  input {
    display: none;
  }

  button {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    position: absolute;
    right: -14px;
    bottom: -40px;
    background-color: white;
  }
`;

export const NicknameInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.lightGray};
  margin-top: 8cap;
  padding: 0 10px;
  margin-bottom: 12px;
`;

export const NextButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
`;

export const Other = styled.div`
  width: 100%;
  margin-top: 46px;

  p {
    font-size: 14px;
    align-items: center;
  }

  button {
    width: 100%;
  }

  img {
    width: 100%;
  }
`;

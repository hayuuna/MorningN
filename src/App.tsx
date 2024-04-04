import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/src/styles/GlobalStyle';
import theme from '@/src/styles/theme';
import * as S from '@/src/styles/ContentStyle';
import { RecoilRoot } from 'recoil';
import Login from '@/src/pages/Login/Login';
import Home from '@/src/pages/Home/Home';
import Auth from '@/src/Auth/Auth';

type LocationState = {
  pathname: string;
};

function App() {
  const location: LocationState = useLocation();

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <S.Content
          style={{
            backgroundColor: location.pathname === '/' ? 'white' : '#F5F5F5',
          }}
        >
          <S.Wrap>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/oauth/kakao/callback" element={<Auth />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </S.Wrap>
        </S.Content>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;

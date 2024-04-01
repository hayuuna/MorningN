import { useState, useEffect, useRef } from 'react';
import * as S from '@/src/pages/Home/styles';
import Weather from '@/src/components/Home/Weather/Weather';
import Day from '@/src/components/Home/Day/Day';
import Container from '@/src/components/Home/Container/Container';
import Clothes from '@/src/components/Home/Clothes/Clothes';
import News from '@/src/components/Home/News/News';

function Home() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [width, setWidth] = useState<number>();
  const widthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setName(parsedUser.name);
        setImage(parsedUser.image);
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    } else {
      console.error('User data not found in localStorage');
    }
  }, []);

  useEffect(() => {
    if (widthRef.current) {
      const rect = widthRef.current.getBoundingClientRect();
      setWidth(rect.width);
    }
  }, [widthRef]);

  return (
    <S.Wrap>
      <Container size="long">
        <S.User>
          <div>
            <img src={image} />
          </div>
          <p>{name}</p>
        </S.User>
      </Container>

      <S.Flex>
        <Container size="small" widthRef={widthRef} heightNum={width}>
          <Day />
        </Container>

        <Container size="small" widthRef={widthRef} heightNum={width}>
          <Weather />
        </Container>
      </S.Flex>

      <Container size="small" widthRef={widthRef} heightNum={width}>
        <Clothes />
      </Container>

      <Container size="large">
        <News />
      </Container>
    </S.Wrap>
  );
}

export default Home;

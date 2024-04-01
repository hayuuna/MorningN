import { getNews } from '@/src/services/news';
import { useState, useEffect } from 'react';
import * as S from '@/src/components/Home/News/styles';
import PrevBtn from '@/src/assets/PrevBtn.svg?react';
import NextBtn from '@/src/assets/NextBtn.svg?react';

type NewsData = {
  title: string;
  url: string;
};

function News() {
  const [data, setData] = useState<NewsData[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  data.slice(0, 4);

  useEffect(() => {
    getNews().then((res) => setData(res));
  }, []);

  function nextPage() {
    setStartIndex(startIndex + 5);
  }

  function prevPage() {
    setStartIndex(Math.max(0, startIndex - 5));
  }

  return (
    <S.Container>
      <S.News>News</S.News>
      {data.slice(startIndex, startIndex + 5).map((item, index) => (
        <S.Title key={index} onClick={() => window.open(item.url)}>
          {item.title}
        </S.Title>
      ))}

      <S.Button>
        <button onClick={prevPage} disabled={startIndex === 0}>
          <PrevBtn />
        </button>
        <button onClick={nextPage} disabled={startIndex + 5 >= data.length}>
          <NextBtn />
        </button>
      </S.Button>
    </S.Container>
  );
}

export default News;

import { CircularProgress } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link';
import { useState } from 'react';

interface SearchCatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const result = await res.json();
  // console.log(result[0]);
  return result[0];
}

const Neko: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  const [spinner, setSpinner] = useState(false);

  const handleClick = async () => {
    setSpinner(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
    setTimeout(() => {
      setSpinner(false)
    }, 1000);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>猫画像アプリ</h1>
      {spinner ? <CircularProgress /> : <img src={catImageUrl} alt="" width={400} height="auto" />}
      <button onClick={handleClick} style={{ marginTop: 18 }}>今日の猫さん</button>
      <div>
        <Link href="/">
          <button style={{ marginTop: 18 }}>
            ホームへ戻る
          </button>
        </Link>
      </div>
    </div>
  );
};

// SSR(サーバーサイドレンダリング)
export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};


export default Neko
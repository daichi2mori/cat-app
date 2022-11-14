import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link';
import { useState } from 'react';


const Home: NextPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Link href="/neko">
        <button>
          猫画像生成はこちら
        </button>
      </Link>
    </div>
  );
};

export default Home;

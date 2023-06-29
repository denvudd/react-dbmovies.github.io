import { Result } from "antd";
import Head from "next/head";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Помилка — The Movie Database (TMDB)</title>
      </Head>
      <Result
        status="500"
        title={
          <strong>Щось пішло не так...</strong>
        }
        subTitle={
          <>
            <p>
              Вибачте, ми не хотіли цього, але це сталось
            </p>
            <p>Статус помилки: 500</p>
          </>
        }
      />
    </>
  );
}

import { Result } from "antd";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Сторінка не знайдена — The Movie Database (TMDB)</title>
      </Head>
      <Result
        status="404"
        title={
          <strong>Ой! Ми не можемо знайти сторінку, яку ви шукаєте</strong>
        }
        subTitle={
          <>
            <p>
              Ви намагалися надіслати запит на сторінку, якої не існує. Якщо ви
              вважаєте, що це помилка, повідомте нам про це на{" "}
              <a href="https://www.themoviedb.org/talk" target="_blank">
                форумах
              </a>
              .
            </p>
            <p>Статус помилки: 404</p>
          </>
        }
      />
    </>
  );
}

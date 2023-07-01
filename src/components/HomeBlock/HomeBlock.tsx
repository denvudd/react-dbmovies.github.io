import React from "react";
import { useGetTrendingAllQuery } from "@/redux/api/trending/slice";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";

import HomeSearch from "./HomeSearch/HomeSearch";
import HomeTrendingAll from "./HomeTrendingAll/HomeTrendingAll";
import HomeTrendingMovies from "./HomeTrendingMovies/HomeTrendingMovies";
import HomeTrendingTV from "./HomeTrendingTV/HomeTrendingTV";

import styles from "./HomeBlock.module.scss";
const HomeBlock: React.FC = () => {
  const { data: trendingAllData } = useGetTrendingAllQuery({
    time_window: "week",
  });
  const [getAccountDetails, { data: accountDetails }] =
    useLazyGetAccountDetailsQuery();

  React.useEffect(() => {
    const sessionId = localStorage.getItem("session_id");

    if (sessionId) {
      getAccountDetails({ session_id: sessionId }, true);
    }
  }, []);

  return (
    <div>
      <section
        className={styles.hero}
        style={{
          background: `linear-gradient(to right, rgb(3, 37, 65, 0.8) 0%, rgb(3, 37, 65, 0.5) 100%), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${
            trendingAllData?.results[
              Math.floor(Math.random() * trendingAllData.results.length)
            ].backdrop_path
          })`,
        }}
      >
        <div className="app-container">
          <div className={styles.heroContainer}>
            <div className={styles.title}>
              <h2>
                Ласкаво просимо
                {accountDetails && `, ${accountDetails.username}`}!
              </h2>
              <h3>Мільйони фільмів, серіалів і персон. Досліджуйте зараз.</h3>
            </div>
            <HomeSearch />
            <span className={styles.watermark}>
              *сайт лише копія для особистих цілей і НЕ претендує на{" "}
              <a href="https://www.themoviedb.org/">оригінальний</a> продукт.
            </span>
          </div>
        </div>
      </section>
      <HomeTrendingAll />
      <HomeTrendingMovies />
      <HomeTrendingTV />
    </div>
  );
};

export default HomeBlock;

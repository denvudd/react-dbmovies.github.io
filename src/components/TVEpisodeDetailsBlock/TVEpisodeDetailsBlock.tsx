import React from "react";

import Link from "next/link";
import CreditCard from "../UI/CreditCard/CreditCard";
import type { GuestStar } from "@/redux/api/tv/types";
import type { CrewMember } from "@/redux/api/types/common";

import styles from "./TVEpisodeDetailsBlock.module.scss";

interface TVEpisodeDetailsBlockProps {
  air_date: string;
  crew: CrewMember[];
  id: number;
  tvId: number;
  name: string;
  tvName: string;
  overview: string | null;
  runtime: number;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  episode_number: number;
  guest_stars: GuestStar[];
}

const TVEpisodeDetailsBlock: React.FC<TVEpisodeDetailsBlockProps> = ({
  air_date,
  crew,
  id,
  name,
  tvName,
  tvId,
  overview,
  runtime,
  season_number,
  still_path,
  vote_average,
  vote_count,
  episode_number,
  guest_stars,
}) => {
  const writter = crew.filter((crew) => crew.job === "Writer");
  const producer = crew.filter((crew) => crew.job === "Director");

  console.log(crew.filter((crew) => crew.job === "Writer"));

  return (
    <div className={styles.episode}>
      <div className="app-container">
        <div className={styles.inner}>
          <section className={styles.panel}>
            <h3>Повний опис серії</h3>
            <div className={styles.overview}>
              {overview
                ? overview
                : "(Немає опису українською. Допоможіть — додайте його)"}
            </div>
          </section>
          <section className={styles.panel}>
            <div className={styles.navigation}>
              <ul className={styles.bar}>
                <li>
                  <Link
                    href={`/tv/${tvId}/seasons/${season_number}/episode/${episode_number}/videos`}
                  >
                    Відеороліки
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/tv/${tvId}/seasons/${season_number}/episode/${episode_number}/images`}
                  >
                    Зображення
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/tv/${tvId}/seasons/${season_number}/episode/${episode_number}/cast`}
                  >
                    Акторський склад
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/tv/${tvId}/seasons/${season_number}/episode/${episode_number}/translations`}
                  >
                    Переклади
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.info}>
              <div className={styles.crew}>
                <h3>
                  Знімальна група <span>{crew.length}</span>
                </h3>
                <p>
                  <strong>Режисери: </strong>
                  {producer
                    ? producer.map((producer, index, array) => {
                        if (index === array.length - 1) {
                          return (
                            <Link key={producer.id} href={`/`}>
                              {`${producer.name}`}
                            </Link>
                          );
                        } else {
                          return (
                            <Link key={producer.id} href={`/`}>
                              {`${producer.name}, `}
                            </Link>
                          );
                        }
                      })
                    : "Невідомо"}
                </p>
                <p>
                  <strong>Сценаристи: </strong>
                  {writter
                    ? writter.map((writter, index, array) => {
                        if (index === array.length - 1) {
                          return (
                            <Link key={writter.id} href={`/`}>
                              {`${writter.name}`}
                            </Link>
                          );
                        } else {
                          return (
                            <Link key={writter.id} href={`/`}>
                              {`${writter.name}, `}
                            </Link>
                          );
                        }
                      })
                    : "Невідомо"}
                </p>
              </div>
              <div className={styles.guestStars}>
                <h3>
                  Запрошені зірки{" "}
                  {guest_stars && <span>{guest_stars.length}</span>}
                  <Link
                    href={`/tv/${tvId}/seasons/${season_number}/episode/${episode_number}/cast`}
                  >
                    Уся знімальна група й акторський склад
                  </Link>
                </h3>
                <ol className={styles.stars}>
                  {guest_stars &&
                    guest_stars.length !== 0 &&
                    guest_stars.map((star) => (
                      <CreditCard
                        id={star.id}
                        name={star.name}
                        poster={star.profile_path}
                        character={star.character}
                      />
                    ))}
                </ol>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TVEpisodeDetailsBlock;

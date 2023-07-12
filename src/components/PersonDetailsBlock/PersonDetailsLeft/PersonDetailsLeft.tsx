import React from "react";

import Image from "next/image";
import { calculateAgeFromDate } from "@/utils/calcAgeFromDate";
import type { PersonDetails } from "@/redux/api/people/types";

import styles from "./PersonDetailsLeft.module.scss";
import { formatReleaseDate } from "@/utils/formatReleaseDate";
import { checkDepartmentName } from "@/utils/checkDepartmentName";

interface PersonDetailsLeftProps {
  id: number;
  profile_path: string | null;
  also_known_as: string[];
  known_for_department: string;
  gender: PersonDetails["gender"];
  birthday: string;
  deathday: string | null;
  place_of_birth: string;
  name: string;
}

const PersonDetailsLeft: React.FC<PersonDetailsLeftProps> = ({
  id,
  profile_path,
  also_known_as,
  known_for_department,
  gender,
  birthday,
  deathday,
  place_of_birth,
  name,
}) => {
  const genderTypeChecker = (gender: PersonDetails["gender"]) => {
    switch (gender) {
      case 0:
        return "Не встановлено / Не вказано";
      case 1:
        return "Жінка";
      case 2:
        return "Чоловік";
      case 3:
        return "Небінарний";
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <div className={styles.poster}>
          <div className={styles.image}>
            <Image
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${profile_path}`
                  : "https://placehold.co/150x225/png/?text=Not+Found"
              }
              width={300}
              height={450}
              alt={`${name} profile`}
            />
          </div>
        </div>
      </section>
      <div className={styles.content}>
        <section className={styles.facts}>
          <h3>
            <bdi>Особиста інформація</bdi>
          </h3>
          <section>
            <p>
              <strong>Відомий (-а) за</strong>
              {checkDepartmentName(known_for_department)}
            </p>
            <p>
              <strong>Стать</strong>
              {genderTypeChecker(gender)}
            </p>
            <p>
              <strong>День народження</strong>
              {formatReleaseDate(birthday)}{" "}
              {!deathday && `(${calculateAgeFromDate(birthday)} років)`}
            </p>
            {deathday && (
              <p>
                <strong>День смерті</strong>
                {formatReleaseDate(deathday)} ({calculateAgeFromDate(birthday)}{" "}
                років)
              </p>
            )}
            <p>
              <strong>Місце народження</strong>
              {place_of_birth}
            </p>
            <p className={styles.alsoKnown}>
              <strong>Також відомий (-а) як</strong>
            </p>
            <ul>
              {also_known_as.map((name, index) => (
                <li key={index} className={styles.additionalName}>
                  {name}
                </li>
              ))}
            </ul>
          </section>
        </section>
      </div>
    </div>
  );
};

export default PersonDetailsLeft;

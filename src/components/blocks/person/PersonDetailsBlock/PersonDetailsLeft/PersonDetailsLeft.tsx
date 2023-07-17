import React from "react";
import { useGetPersonExternalIDsQuery } from "@/redux/api/people/slice";

import Image from "next/image";
import { calculateAgeFromDate } from "@/utils/calcAgeFromDate";
import { formatReleaseDate } from "@/utils/formatReleaseDate";
import { checkDepartmentName } from "@/utils/checkDepartmentName";
import type { PersonDetails } from "@/redux/api/people/types";

import styles from "./PersonDetailsLeft.module.scss";
import Link from "next/link";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import { Skeleton, Space, Tooltip, Typography } from "antd";
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
  const { data: social, isLoading: isSocialLoading } =
    useGetPersonExternalIDsQuery({ id });
  const externalIds = social ? Object.entries(social) : undefined;

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
              priority
            />
          </div>
        </div>
      </section>
      <div className={styles.content}>
        <section className={styles.facts}>
          {social && !isSocialLoading && (
            <div className={styles.social}>
              <Space size={10} className={styles.socialLinks}>
                {social && !isSocialLoading && social.facebook_id && (
                  <Tooltip
                    title={<span>Відвідайте Facebook</span>}
                    placement="bottom"
                    zIndex={90}
                  >
                    <Typography.Link
                      href={`https://www.facebook.com/${social.facebook_id}`}
                      target="_blank"
                      className={styles.socialLink}
                    >
                      <FacebookFilled
                        style={{
                          fontSize: "1.9em",
                          color: "#000",
                          marginBottom: "30px",
                        }}
                      />
                    </Typography.Link>
                  </Tooltip>
                )}

                {social && !isSocialLoading && social.twitter_id && (
                  <Tooltip
                    title={<span>Відвідайте Twitter</span>}
                    placement="bottom"
                    zIndex={90}
                  >
                    <Typography.Link
                      href={`https://twitter.com/${social.twitter_id}`}
                      target="_blank"
                      className={styles.socialLink}
                    >
                      <TwitterSquareFilled
                        style={{
                          fontSize: "1.9em",
                          color: "#000",
                          marginBottom: "30px",
                        }}
                      />
                    </Typography.Link>
                  </Tooltip>
                )}
                {social && !isSocialLoading && social.instagram_id && (
                  <Tooltip
                    title={<span>Відвідайте Instagram</span>}
                    placement="bottom"
                    zIndex={90}
                  >
                    <Typography.Link
                      href={`https://www.instagram.com/${social.instagram_id}`}
                      target="_blank"
                      className={styles.socialLink}
                    >
                      <InstagramFilled
                        style={{
                          fontSize: "1.9em",
                          color: "#000",
                          marginBottom: "30px",
                        }}
                      />
                    </Typography.Link>
                  </Tooltip>
                )}
                {social && !isSocialLoading && social.youtube_id && (
                  <Tooltip
                    title={<span>Відвідайте Youtube</span>}
                    placement="bottom"
                    zIndex={90}
                  >
                    <Typography.Link
                      href={`https://www.youtube.com/${social.youtube_id}`}
                      target="_blank"
                      className={styles.socialLink}
                    >
                      <YoutubeFilled
                        style={{
                          fontSize: "1.9em",
                          color: "#000",
                          marginBottom: "30px",
                        }}
                      />
                    </Typography.Link>
                  </Tooltip>
                )}
              </Space>
            </div>
          )}
          {isSocialLoading && (
            <Space size={10} className={styles.socialLinks}>
              {Array(3)
                .fill(1)
                .map((_, index) => (
                  <div className={styles.socialLink} key={index}>
                    <Skeleton.Avatar
                      active={true}
                      size="default"
                    />
                  </div>
                ))}
            </Space>
          )}
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

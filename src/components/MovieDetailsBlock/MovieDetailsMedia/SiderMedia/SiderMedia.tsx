import React from "react";
import {
  useGetMovieExternalIdsQuery,
  useGetMovieKeywordsQuery,
} from "@/redux/api/movies/slice";

import { Typography, Space, Tooltip } from "antd";
import Link from "next/link";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
} from "@ant-design/icons";
import ISO6391 from "iso-639-1";
import { formatBudget } from "@/utils/formatBudget";

import styles from "./SideMedia.module.scss";
interface SliderMediaProps {
  id: number;
  original_title: string;
  status:
    | "Rumored"
    | "Planned"
    | "In Production"
    | "Post Production"
    | "Released"
    | "Canceled";
  original_language: string;
  budget: number;
  revenue: number;
}

const SiderMedia: React.FC<SliderMediaProps> = ({
  id,
  original_language,
  original_title,
  status,
  budget,
  revenue,
}) => {
  const { data: keywords, isLoading: isKeywordsLoading } =
    useGetMovieKeywordsQuery(id);
  const { data: social, isLoading: isSocialLoading } =
    useGetMovieExternalIdsQuery(id);

  const checkStatus = (status: SliderMediaProps["status"]) => {
    switch (status) {
      case "Released":
        return "Випущено";
      case "Canceled":
        return "Відмінено";
      case "In Production":
        return "У виробництві";
      case "Planned":
        return "У планах";
      case "Post Production":
        return "Поствиробництво";
      case "Rumored":
        return "За чутками";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.facts}>
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
                >
                  <FacebookFilled
                    style={{ fontSize: "1.9em", color: "#000" }}
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
                >
                  <TwitterSquareFilled
                    style={{ fontSize: "1.9em", color: "#000" }}
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
                >
                  <InstagramFilled
                    style={{ fontSize: "1.9em", color: "#000" }}
                  />
                </Typography.Link>
              </Tooltip>
            )}
          </Space>
          <Space className={styles.info} size={8} direction="vertical">
            <Typography.Paragraph className={styles.infoBlock}>
              <h3>Оригінальна назва</h3>
              {original_title}
            </Typography.Paragraph>
            <Typography.Paragraph className={styles.infoBlock}>
              <h3>Статус</h3>
              {checkStatus(status)}
            </Typography.Paragraph>
            <Typography.Paragraph className={styles.infoBlock}>
              <h3>Мова оригіналу</h3>
              {ISO6391.getName(original_language)}
            </Typography.Paragraph>
            <Typography.Paragraph className={styles.infoBlock}>
              <h3>Бюджет</h3>
              {formatBudget(budget, "0,0,0")}$
            </Typography.Paragraph>
            <Typography.Paragraph className={styles.infoBlock}>
              <h3>Дохід</h3>
              {formatBudget(revenue, "0,0,0")}$
            </Typography.Paragraph>
          </Space>
          <div className={styles.keywords}>
            <h3>Ключові слова</h3>
            <ul className={styles.keywordsList}>
              {!isKeywordsLoading && keywords && keywords.length !== 0
                ? keywords.map((keyword, index) => (
                    <li key={index}>
                      <Link href={`/keyword/${keyword.id}/movie`}>{keyword.name}</Link>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiderMedia;

import React from "react";
import { Typography, Space, Popover } from "antd";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
} from "@ant-design/icons";
import styles from "./SideMedia.module.scss";
import { useGetMovieKeywordsQuery } from "@/redux/api/movies/slice";
import { formatBudget } from "@/utils/formatBudget";
import { formatFirstLetterToUppercase } from "@/utils/formatFirstLetterToUppercase";

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
    useGetMovieKeywordsQuery({ id });

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.facts}>
          <Space size={10} className={styles.socialLinks}>
            <Popover
              content={<span>Відвідайте Facebook</span>}
              placement="bottom"
            >
              <Typography.Link>
                <FacebookFilled style={{ fontSize: "1.9em", color: "#000" }} />
              </Typography.Link>
            </Popover>
            <Popover
              content={<span>Відвідайте Twitter</span>}
              placement="bottom"
            >
              <Typography.Link>
                <TwitterSquareFilled
                  style={{ fontSize: "1.9em", color: "#000" }}
                />
              </Typography.Link>
            </Popover>
            <Popover
              content={<span>Відвідайте Instagram</span>}
              placement="bottom"
            >
              <Typography.Link>
                <InstagramFilled style={{ fontSize: "1.9em", color: "#000" }} />
              </Typography.Link>
            </Popover>
          </Space>
          <Space className={styles.info} size={8} direction="vertical">
            <Typography.Paragraph className={styles.infoBlock}>
              <h3>Оригінальна назва</h3>
              {original_title}
            </Typography.Paragraph>
            <Typography.Paragraph className={styles.infoBlock}>
              <h3>Статус</h3>
              {status}
            </Typography.Paragraph>
            <Typography.Paragraph className={styles.infoBlock}>
              <h3>Мова оригіналу</h3>
              {formatFirstLetterToUppercase(original_language)}
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
                ? keywords.map((keyword) => (
                    <li>
                      <a href="">{keyword.name}</a>
                    </li>
                  ))
                : null}
              <li>
                <a href="">hero</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiderMedia;

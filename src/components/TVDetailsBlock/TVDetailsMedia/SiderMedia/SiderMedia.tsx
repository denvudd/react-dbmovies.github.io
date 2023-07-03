import React from "react";
import {
  useGetTVExternalIdsQuery,
  useGetTVKeywordsQuery,
} from "@/redux/api/tv/slice";

import { Typography, Space, Tooltip } from "antd";
import {
  LinkOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
} from "@ant-design/icons";
import ISO6391 from "iso-639-1";
import type { Network, TVDetailsApiResponse } from "@/redux/api/tv/types";

import styles from "./SiderMedia.module.scss";
import Link from "next/link";
import Image from "next/image";

interface SliderMediaProps {
  id: number;
  original_name: string;
  status: TVDetailsApiResponse["status"];
  original_language: string;
  networks: Network[];
  type: TVDetailsApiResponse["type"];
  homepage: string | null;
}

const SiderMedia: React.FC<SliderMediaProps> = ({
  id,
  original_language,
  original_name,
  status,
  type,
  networks,
  homepage,
}) => {
  const { data: keywords, isLoading: isKeywordsLoading } =
    useGetTVKeywordsQuery(id);
  const { data: social, isLoading: isSocialLoading } =
    useGetTVExternalIdsQuery(id);

  const checkStatus = (status: SliderMediaProps["status"]) => {
    switch (status) {
      case "Returning Series":
        return "Поновлено";
      case "Planned":
        return "У планах";
      case "In Production":
        return "У виробництві";
      case "Ended":
        return "Завершено";
      case "Canceled":
        return "Відмінено";
      case "Pilot":
        return "Пілот";
    }
  };

  const checkType = (type: SliderMediaProps["type"]) => {
    switch (type) {
      case "Documentary":
        return "Документальний";
      case "News":
        return "Новинний";
      case "Miniseries":
        return "Мінісеріал";
      case "Reality":
        return "Реаліті";
      case "Scripted":
        return "Художній";
      case "Talk Show":
        return "Ток-шоу";
      case "Video":
        return "Відео";
    }
  };

  console.log(networks);

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
                >
                  <InstagramFilled
                    style={{ fontSize: "1.9em", color: "#000" }}
                  />
                </Typography.Link>
              </Tooltip>
            )}
            {homepage && (
              <Tooltip
                title={<span>Відвідайте домашню сторінку</span>}
                placement="bottom"
                zIndex={90}
              >
                <Typography.Link href={homepage}>
                  <LinkOutlined style={{ fontSize: "1.9em", color: "#000" }} />
                </Typography.Link>
              </Tooltip>
            )}
          </Space>
          <Space className={styles.info} size={8} direction="vertical">
            <Typography.Paragraph className={styles.infoBlock}>
              <h3>Оригінальна назва</h3>
              {original_name}
            </Typography.Paragraph>
            <Typography.Paragraph className={styles.infoBlock}>
              <h3>Статус</h3>
              {checkStatus(status)}
            </Typography.Paragraph>
            <Typography.Paragraph className={styles.infoBlock}>
              <h3>Мережа</h3>
              <ul className={styles.networks}>
                {networks.map((network) => (
                  <li key={network.id}>
                    <Link href={`/network/${network.id}`} title={`${network.name}`}>
                      <Image
                        src={`https://image.tmdb.org/t/p/h30/${network.logo_path}`}
                        width={50}
                        height={30}
                        alt={`${network.name} logo`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Typography.Paragraph>
            <Typography.Paragraph className={styles.infoBlock}>
              <h3>Тип</h3>
              {checkType(type)}
            </Typography.Paragraph>
            <Typography.Paragraph className={styles.infoBlock}>
              <h3>Мова оригіналу</h3>
              {ISO6391.getName(original_language)}
            </Typography.Paragraph>
          </Space>
          <div className={styles.keywords}>
            <h3>Ключові слова</h3>
            <ul className={styles.keywordsList}>
              {!isKeywordsLoading && keywords && keywords.length !== 0
                ? keywords.map((keyword, index) => (
                    <li key={index}>
                      <a href="">{keyword.name}</a>
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

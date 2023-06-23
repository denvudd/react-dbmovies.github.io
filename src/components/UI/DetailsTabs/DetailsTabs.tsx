import React from "react";

import { Dropdown, MenuProps, Space } from "antd";
import Link from "next/link";
import { CaretDownOutlined } from "@ant-design/icons";
import ShareModal from "../ShareModal/ShareModal";

import styles from "./DetailsTabs.module.scss";

interface DetailsTabsProps {
  id: number;
  title: string;
  type?: "movie" | "tv";
}

const DetailsTabs: React.FC<DetailsTabsProps> = ({
  id,
  title,
  type = "movie",
}) => {
  const reviewItems: MenuProps["items"] = [
    {
      key: "main",
      label: <Link href={`/movies/${id}`}>Головне</Link>,
    },
    {
      key: "titles",
      label: <Link href={`/movies/${id}/titles`}>Альтернативні назви</Link>,
    },
    {
      key: "cast",
      label: <Link href={`/movies/${id}/cast`}>Актори та знімальна група</Link>,
    },
    {
      key: "releases",
      label: <Link href={`/movies/${id}/releases`}>Дати виходу</Link>,
    },
    {
      key: "translations",
      label: <Link href={`/movies/${id}/translations`}>Переклади</Link>,
    },
    { type: "divider" },
    {
      key: "changes",
      label: <Link href={`${id}/changes`}>Зміни</Link>,
    },
  ];

  const mediaItems: MenuProps["items"] = [
    {
      key: "backdrops",
      label: <Link href={`/`}>Світлини</Link>,
    },
    {
      key: "logos",
      label: <Link href={`${id}/titles`}>Логотипи</Link>,
    },
    {
      key: "posters",
      label: <Link href={`/`}>Постери</Link>,
    },
    {
      key: "videosSub",
      label: <Link href={`/`}>Відеороліки</Link>,
      children: [
        {
          key: "trailers",
          label: "Трейлери",
        },
      ],
    },
  ];

  const fandomItems: MenuProps["items"] = [
    {
      key: "reviews",
      label: "Рецензії",
    },
  ];

  const shareItems: MenuProps["items"] = [
    {
      key: "share",
      label: <ShareModal id={id} title={title} type={type} />,
    },
    {
      key: "facebook",
      label: (
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${
            type === "movie"
              ? `https://react-dbmovies.vercel.app/movies/${id}`
              : `https://react-dbmovies.vercel.app/tv/${id}`
          }`}
          target="_blank"
        >
          Facebook
        </a>
      ),
    },
    {
      key: "tweeter",
      label: (
        <a
          href={`https://twitter.com/intent/tweet?text=${title}%20@themoviedb&url=${
            type === "movie"
              ? `https://react-dbmovies.vercel.app/movies/${id}`
              : `https://react-dbmovies.vercel.app/tv/${id}
              &related=themoviedb`
          }`}
          target="_blank"
        >
          Tweet
        </a>
      ),
    },
  ];

  return (
    <div className={styles.head}>
      <div className="app-container">
        <div className={styles.inner}>
          <Dropdown
            overlayClassName={styles.dropdownRoot}
            menu={{ items: reviewItems }}
          >
            <Space size={5}>
              Огляд
              <CaretDownOutlined />
            </Space>
          </Dropdown>
          <Dropdown
            overlayClassName={styles.dropdownRoot}
            menu={{ items: mediaItems }}
          >
            <Space size={5}>
              Медіа
              <CaretDownOutlined />
            </Space>
          </Dropdown>
          <Dropdown
            overlayClassName={styles.dropdownRoot}
            menu={{ items: fandomItems }}
          >
            <Space size={5}>
              Фендом
              <CaretDownOutlined />
            </Space>
          </Dropdown>
          <Dropdown
            overlayClassName={styles.dropdownRoot}
            menu={{ items: shareItems }}
          >
            <Space size={5}>
              Поширити
              <CaretDownOutlined />
            </Space>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default DetailsTabs;

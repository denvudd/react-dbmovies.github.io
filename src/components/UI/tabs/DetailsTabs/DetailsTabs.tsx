import React from "react";

import { Dropdown, MenuProps, Space } from "antd";
import Link from "next/link";
import { CaretDownOutlined } from "@ant-design/icons";
import ShareModal from "../../ShareModal/ShareModal";

import styles from "./DetailsTabs.module.scss";

interface DetailsTabsProps {
  id: number;
  title: string;
  type?: "movie" | "tv" | "person";
}

const DetailsTabs: React.FC<DetailsTabsProps> = ({
  id,
  title,
  type = "movie",
}) => {
  const formattedType =
    type === "movie" ? "movies" : type === "tv" ? "tv" : "person";
  const isPersonTab = type === "person";

  const reviewItems: MenuProps["items"] = [
    {
      key: "main",
      label: <Link href={`/${formattedType}/${id}`}>Головне</Link>,
    },

    !isPersonTab
      ? {
          key: "titles",
          label: (
            <Link href={`/${formattedType}/${id}/titles`}>
              Альтернативні назви
            </Link>
          ),
        }
      : null,

    !isPersonTab
      ? {
          key: "cast",
          label: (
            <Link href={`/${formattedType}/${id}/cast`}>
              Актори та знімальна група
            </Link>
          ),
        }
      : null,

    type === "tv"
      ? {
          key: "episode_groups",
          label: (
            <Link href={`/${formattedType}/${id}/episode_groups`}>
              Групи серій
            </Link>
          ),
        }
      : null,

    type === "tv"
      ? {
          key: "seasons",
          label: <Link href={`/${formattedType}/${id}/seasons`}>Сезони</Link>,
        }
      : null,

    type === "movie"
      ? {
          key: "releases",
          label: (
            <Link href={`/${formattedType}/${id}/releases`}>Дати виходу</Link>
          ),
        }
      : null,

    {
      key: "translations",
      label: (
        <Link href={`/${formattedType}/${id}/translations`}>Переклади</Link>
      ),
    },
  ];

  const mediaItems: MenuProps["items"] = [
    !isPersonTab
      ? {
          key: "backdrops",
          label: (
            <Link href={`/${formattedType}/${id}/backdrops`}>Світлини</Link>
          ),
        }
      : null,
    !isPersonTab
      ? {
          key: "logos",
          label: <Link href={`/${formattedType}/${id}/logos`}>Логотипи</Link>,
        }
      : null,
    !isPersonTab
      ? {
          key: "posters",
          label: <Link href={`/${formattedType}/${id}/posters`}>Постери</Link>,
        }
      : null,
    !isPersonTab
      ? {
          key: "videos",
          label: (
            <Link href={`/${formattedType}/${id}/videos`}>Відеороліки</Link>
          ),
        }
      : null,
    isPersonTab
      ? {
          key: "profile-photo",
          label: (
            <Link href={`/${formattedType}/${id}/profiles`}>
              Фотографії профілю
            </Link>
          ),
        }
      : null,
  ];

  const fandomItems: MenuProps["items"] = [
    {
      key: "reviews",
      label: <Link href={`/${formattedType}/${id}/reviews`}>Рецензії</Link>,
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
      key: "twitter",
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
    <div className={styles.head + " details-tabs"}>
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
          {!isPersonTab && (
            <Dropdown
              overlayClassName={styles.dropdownRoot}
              menu={{ items: fandomItems }}
            >
              <Space size={5}>
                Фендом
                <CaretDownOutlined />
              </Space>
            </Dropdown>
          )}
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

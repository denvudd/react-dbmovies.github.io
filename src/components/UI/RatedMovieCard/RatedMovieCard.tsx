import React from "react";
import { useLazyGetAccountListsQuery } from "@/redux/api/account/slice";
import { usePostAddMovieToListMutation } from "@/redux/api/lists/slice";
import Link from "next/link";
import Image from "next/image";
import RatingBar from "../RatingBar/RatingBar";
import { Button, Modal, Rate, Select, Typography, message } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { formatReleaseDate } from "@/utils/formatReleaseDate";

import styles from "./RatedMovieCard.module.scss";
interface RatedMovieCardProps {
  id: number;
  sessionId: string;
  poster_path: string;
  vote_average: number;
  title: string;
  release_date: string;
  overview: string;
  rating: number;
}

const RatedMovieCard: React.FC<RatedMovieCardProps> = ({
  id,
  sessionId,
  poster_path,
  vote_average,
  title,
  release_date,
  overview,
  rating,
}) => {
  const [isFetch, setIsFetch] = React.useState(false);
  const [listId, setListId] = React.useState<string>("");
  const [
    fetchAccountLists,
    { data: accountLists, isLoading: isAccountListsLoading },
  ] = useLazyGetAccountListsQuery();
  const [addMovieToList, { data: movieList, isLoading }] =
    usePostAddMovieToListMutation();

  const [messageApi, contextMessageHolder] = message.useMessage();
  const [modal, contextModalHolder] = Modal.useModal();

  const onClickAddMovieToList = () => {
    const listModal = modal.info({
      title: `Додати "${title}" до списку?`,
    });

    if (sessionId !== "") {
      const onChangeList = (value: string) => {
        if (value !== "" && value) {
          setListId(value);
          listModal.update({
            okText: "Підтвердити",
            okButtonProps: { disabled: false },
          });
        }
      };

      fetchAccountLists({ session_id: sessionId }, true)
        .unwrap()
        .then((data) => {
          listModal.update({
            title: `Додати "${title}" до списку?`,
            content: (
              <div>
                <p className={styles.listLabel}>Додати до існуючих списків:</p>
                <Select
                  style={{ width: "100%" }}
                  placeholder={"Оберіть список"}
                  onChange={onChangeList}
                  loading={isAccountListsLoading}
                  options={
                    !isAccountListsLoading &&
                    data.results &&
                    data.results.length !== 0
                      ? data.results.map((list) => ({
                          value: list.id,
                          label: list.name,
                        }))
                      : undefined
                  }
                  notFoundContent={"Не знайдено жодного списка"}
                />
                <p className={styles.listLabel}>Або:</p>
                <Button type="primary">
                  <Link href={`/lists/new`}>Створити новий список</Link>
                </Button>
              </div>
            ),
            onOk() {
              setIsFetch(true);
            },
            onCancel() {},
            okText: "Оберіть список",
            okButtonProps: {
              disabled: true,
              title: "Оберіть список щоб продовжити",
            },
            closable: true,
          });
        });
    }
  };

  React.useEffect(() => {
    if (isFetch) {
      Modal.destroyAll();
      if (isFetch && sessionId) {
        addMovieToList({
          session_id: sessionId,
          list_id: listId,
          media_id: id,
        })
          .unwrap()
          .then((data) => {
            if (data.success) {
              messageApi.success(` ${data.status_message}`);
            }
          })
          .catch((error) => {
            if (error && error.data.status_code === 8) {
              messageApi.error(
                `Сталась помилка. Елемент "${title}" вже існує в списку #${listId}`,
                3
              );
            }
            console.log(error);
          })
          .finally(() => setIsFetch(false));
      }
    } else {
      return;
    }
  }, [isFetch]);

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <div className={styles.poster}>
          <Link href={`/movies/${id}`}>
            <Image width={150} height={225} alt={``} src={poster_path} />
          </Link>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.detailsMain}>
          <div className={styles.detailsHead}>
            <RatingBar size={38} rating={vote_average} />
            <div className={styles.title}>
              <div>
                <Link href={`/movies/${id}`}>
                  <h2>{title}</h2>
                </Link>
              </div>
              <span className={styles.release}>
                {formatReleaseDate(release_date)}
              </span>
            </div>
          </div>
          <div className={styles.overview}>
            <Typography.Paragraph ellipsis={{ rows: 2 }}>
              {overview}
            </Typography.Paragraph>
          </div>
        </div>
        <div className={styles.panel}>
          <ul className={styles.panelList}>
            <li className={styles.option}>
              Ваша оцінка:
              <Rate
                value={rating}
                count={10}
                disabled
                style={{ marginTop: "-5px" }}
              />
            </li>
            <li className={styles.option}>
              <Button
                shape="circle"
                onClick={onClickAddMovieToList}
                icon={<UnorderedListOutlined />}
              ></Button>
              Додати до списку
            </li>
          </ul>
        </div>
      </div>
      {contextMessageHolder}
      {contextModalHolder}
    </div>
  );
};

export default RatedMovieCard;

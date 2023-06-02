import React from "react";
import { useLazyGetAccountListsQuery } from "@/redux/api/account/slice";
import { usePostAddMovieToListMutation } from "@/redux/api/lists/slice";
import Link from "next/link";
import { Button, Modal, Select, message } from "antd";
import WideMovieCard from "../../../UI/WideMovieCard/WideMovieCard";

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
              messageApi.success(
                ` "${title}" був успішно доданий до списку #${listId}!`,
                3
              );
            } else {
              messageApi.success(`${data.status_message}`, 3);
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
    <div>
      <WideMovieCard
        id={id}
        title={title}
        overview={overview}
        vote_average={vote_average}
        release_date={release_date}
        rating={rating}
        poster_path={
          poster_path
            ? `https://image.tmdb.org/t/p/w150_and_h225_bestv2${poster_path}`
            : "https://placehold.co/150x225/png/?text=Not+Found"
        }
        isShowPanel
        isShowAddMovie
        isShowRate
        onClickAddMovieToList={onClickAddMovieToList}
      />
      {contextMessageHolder}
      {contextModalHolder}
    </div>
  );
};

export default RatedMovieCard;

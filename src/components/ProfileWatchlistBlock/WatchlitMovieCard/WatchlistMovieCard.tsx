import React from "react";
import {
  useLazyGetAccountListsQuery,
  usePostAddToWatchlistMutation,
} from "@/redux/api/account/slice";
import { usePostAddMovieToListMutation } from "@/redux/api/lists/slice";
import { message, Modal, Select, Button } from "antd";
import Link from "next/link";

import WideMovieCard from "@/components/UI/WideMovieCard/WideMovieCard";
import { usePostAddMovieRatingMutation } from "@/redux/api/movies/slice";

interface WatchlistMovieCardProps {
  id: number;
  priorityIndex?: number;
  sessionId: string;
  poster_path: string;
  vote_average: number;
  title: string;
  release_date: string;
  overview: string;
}

const WatchlistMovieCard: React.FC<WatchlistMovieCardProps> = ({
  id,
  priorityIndex,
  sessionId,
  poster_path,
  vote_average,
  title,
  release_date,
  overview,
}) => {
  const [isFetch, setIsFetch] = React.useState(false);
  const [isRateSubmit, setIsRateSubmit] = React.useState(false);
  const [listId, setListId] = React.useState<string>("");
  const [rate, setRate] = React.useState<number>(1);
  const [
    fetchAccountLists,
    { data: accountLists, isLoading: isAccountListsLoading },
  ] = useLazyGetAccountListsQuery();
  const [addMovieToList, { data: movieList, isLoading }] =
    usePostAddMovieToListMutation();
  const [
    removeFromWatchlist,
    {
      data: removeFromWatchlistResult,
      isLoading: isRemoveFromWatchlistLoading,
    },
  ] = usePostAddToWatchlistMutation();
  const [
    rateMovie,
    { data: rateMovieResult, isLoading: isRateMovieResultLoading },
  ] = usePostAddMovieRatingMutation();

  const [messageApi, contextMessageHolder] = message.useMessage();
  const [modal, contextModalHolder] = Modal.useModal();

  const onClickElementDelete = React.useCallback(
    (movieId: number, title: string) => {
      removeFromWatchlist({
        session_id: sessionId,
        media_type: "movie",
        media_id: movieId,
        watchlist: false,
      })
        .unwrap()
        .then((data) => {
          if (data.success) {
            messageApi.success(
              `"${title}" був успішно видалений зі списку!`,
              3
            );
          } else {
            messageApi.success(`${data.status_message}`, 3);
          }
        })
        .catch((error) => {
          if (error) {
            messageApi.error(
              `Сталась помилка! Елемента "${title}" не існує в списку!`,
              5
            );
          }
        });
    },
    []
  );

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
                <p className="list-label">Додати до існуючих списків:</p>
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
                <p className="list-label">Або:</p>
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

  const onClickRateMovie = (value: number) => {
    if (sessionId !== "") {
      if (value) {
        setRate(value);
        setIsRateSubmit(true);
      }
    }
  };

  React.useEffect(() => {
    if (isRateSubmit) {
      if (sessionId) {
        rateMovie({ session_id: sessionId, movie_id: id, rating: rate })
          .unwrap()
          .then((data) => {
            if (data.success && data.status_code === 12) {
              messageApi.success(
                `"${title}" був успішно оцінений! Його буде видалено зі списку "Переглянути пізніше" та зараховано як переглянутий`,
                6
              );
            } else {
              messageApi.success(`${data.status_message}`, 3);
            }
          })
          .catch((error) => {
            messageApi.error(
              `Сталась помилка! Код помилки: ${error.data.status_code}, текст помилки: ${error.data.status_message}`,
              5
            );
          })
          .finally(() => setIsRateSubmit(false));
      }
    }
  }, [isRateSubmit]);

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
        priorityIndex={priorityIndex && priorityIndex}
        title={title}
        overview={overview}
        vote_average={vote_average}
        release_date={release_date}
        poster_path={
          poster_path
            ? `https://image.tmdb.org/t/p/w150_and_h225_bestv2${poster_path}`
            : "https://placehold.co/150x225/png/?text=Not+Found"
        }
        isShowPanel
        isShowAddMovie
        isShowDelete
        isShowRate
        isRateReadonly={false}
        onClickElementDelete={() => {
          onClickElementDelete(id, title);
        }}
        onClickAddMovieToList={onClickAddMovieToList}
        onChangeMovieRate={onClickRateMovie}
      />
      {contextMessageHolder}
      {contextModalHolder}
    </div>
  );
};

export default WatchlistMovieCard;

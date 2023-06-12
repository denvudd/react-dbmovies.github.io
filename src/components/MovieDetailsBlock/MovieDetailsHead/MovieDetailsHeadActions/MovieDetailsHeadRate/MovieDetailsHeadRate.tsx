import React from "react";
import { usePostAddMovieRatingMutation } from "@/redux/api/movies/slice";

import { Modal, Rate, message } from "antd";
import StarFilled from "@ant-design/icons/lib/icons/StarFilled";
import classNames from "classnames";
import type { MovieAccountStatesApiResponse } from "@/redux/api/movies/types/MovieAccountStatesType";

import styles from "../MovieDetailsHeadActions.module.scss";
interface MovieDetailsHeadRateProps {
  id: number;
  sessionId: string | null;
  rated: MovieAccountStatesApiResponse["rated"];
  title: string;
}

const MovieDetailsHeadRate: React.FC<MovieDetailsHeadRateProps> = ({
  id,
  sessionId,
  rated,
  title,
}) => {
  const [
    rateMovie,
    { data: rateMovieResult, isLoading: isRateMovieResultLoading },
  ] = usePostAddMovieRatingMutation();
  const [rate, setRate] = React.useState<number>(1);
  const [isRateSubmit, setIsRateSubmit] = React.useState(false);

  const [messageApi, contextMessageHolder] = message.useMessage();
  const [modal, contextModalHolder] = Modal.useModal();

  const onClickRateMovie = React.useCallback(() => {
    if (sessionId) {
      const rateModal = Modal.info({
        title: `Оцінити "${title}"?`,
      });

      const onChangeRate = (value: number) => {
        if (value) {
          setRate(value);
          rateModal.update({
            okText: "Підтвердити",
            okButtonProps: { disabled: false },
          });
        }
      };

      rateModal.update({
        title: `Оцінити "${title}"?`,
        content: (
          <div>
            <p className="list-label">Оберіть вашу оцінку:</p>
            <Rate
              allowClear={false}
              defaultValue={5}
              count={10}
              onChange={onChangeRate}
            />
          </div>
        ),
        onOk() {
          setIsRateSubmit(true);
        },
        icon: <StarFilled />,
        onCancel() {},
        okText: "Оберіть оцінку",
        okButtonProps: {
          disabled: true,
          title: "Оберіть оцінку щоб продовжити",
        },
        closable: true,
      });
    }

    if (!sessionId) {
      return;
    }
  }, [sessionId]);

  React.useEffect(() => {
    if (isRateSubmit) {
      Modal.destroyAll();
      if (sessionId) {
        rateMovie({ session_id: sessionId, movie_id: id, rating: rate })
          .unwrap()
          .then((data) => {
            if (data.success && data.status_code === 12) {
              messageApi.success(`"${title}" був успішно оцінений!`, 3);
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

  return (
    <>
      <li className={styles.tooltip}>
        <button
          onClick={onClickRateMovie}
          className={classNames({
            [styles.rated]: rated,
          })}
        >
          <span>
            <StarFilled />
          </span>
        </button>
      </li>
      {contextMessageHolder}
      {contextModalHolder}
    </>
  );
};

export default MovieDetailsHeadRate;

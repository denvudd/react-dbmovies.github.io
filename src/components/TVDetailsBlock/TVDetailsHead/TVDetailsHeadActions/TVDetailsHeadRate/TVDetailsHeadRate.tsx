import React from "react";
import { usePostAddTVRatingMutation } from "@/redux/api/tv/slice";

import { Modal, Rate, message } from "antd";
import StarFilled from "@ant-design/icons/lib/icons/StarFilled";
import classNames from "classnames";
import type { TVAccountStatesApiResponse } from "@/redux/api/tv/types";

import styles from "../TVDetailsHeadAction.module.scss";

interface TVDetailsHeadRateProps {
  id: number;
  sessionId: string | null;
  rated: TVAccountStatesApiResponse["rated"];
  name: string;
}

const TVDetailsHeadRate: React.FC<TVDetailsHeadRateProps> = ({
  id,
  sessionId,
  rated,
  name,
}) => {
  const [
    rateTV,
    { data: rateTVResult, isLoading: isRateTVResultLoading },
  ] = usePostAddTVRatingMutation();
  const [rate, setRate] = React.useState<number>(1);
  const [isRateSubmit, setIsRateSubmit] = React.useState(false);

  const [messageApi, contextMessageHolder] = message.useMessage();
  const [modal, contextModalHolder] = Modal.useModal();

  const onClickRateMovie = React.useCallback(() => {
    if (sessionId) {
      const rateModal = Modal.info({
        title: `Оцінити "${name}"?`,
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
        title: `Оцінити "${name}"?`,
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
        rateTV({ session_id: sessionId, series_id: id, rating: rate })
          .unwrap()
          .then((data) => {
            if (data.success && data.status_code === 12) {
              messageApi.success(`"${name}" був успішно оцінений!`, 3);
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

export default TVDetailsHeadRate;

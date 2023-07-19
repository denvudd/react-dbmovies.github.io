import React from "react";
import { useSessionId } from "@/hooks/useSessionId";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import {
  useDeleteListMutation,
  usePostClearListMutation,
} from "@/redux/api/lists/slice";
import { useRouter } from "next/router";

import { Button, Popover, message, Modal } from "antd";
import Link from "next/link";
import ExclamationCircleFilled from "@ant-design/icons/lib/icons/ExclamationCircleFilled";
import ShareModal from "@/components/UI/ShareModal/ShareModal";

import styles from "./ListDetailsHead.module.scss";

interface ListDetailsHeadProps {
  name: string;
  listUsername: string;
  created_by: string;
  description: string;
  id: string;
  iso_639_1: string;
  isEmpty: boolean;
}

const ListDetailsHead: React.FC<ListDetailsHeadProps> = ({
  name,
  listUsername,
  created_by,
  description,
  id,
  iso_639_1,
  isEmpty,
}) => {
  const router = useRouter();
  const sessionId = useSessionId();

  const [
    getAccountDetails,
    { data: accountDetails, isLoading: isAccountUsernameLoading },
  ] = useLazyGetAccountDetailsQuery();
  const [deleteList] = useDeleteListMutation();
  const [clearList] = usePostClearListMutation();

  const [isClearConfirm, setIsClearConfirm] = React.useState(false);
  const [value, copy] = useCopyToClipboard();
  const [messageApi, contextMessageHolder] = message.useMessage();
  const [modal, contextModalHolder] = Modal.useModal();
  const { confirm } = Modal;

  const handleClickCopy = (value: string) => {
    copy(value);
    if (value !== null) {
      messageApi.success(`Текст скопійовано: ${value}`);
    }
  };

  const showDeleteConfirm = () => {
    if (sessionId) {
      confirm({
        title: "Видалити список?",
        icon: <ExclamationCircleFilled />,
        content: (
          <p>
            Ви впевенні що хочете видалити список "{name}"? Повернути видалені
            дані буде неможливо.
          </p>
        ),
        okText: "Так",
        okType: "danger",
        cancelText: "Ні",
        onOk() {
          deleteList({ session_id: sessionId, list_id: id });
          router.push(`/user/${accountDetails?.username}/lists`);
        },
        closable: true,
      });
    }
  };

  const showClearConfirm = () => {
    confirm({
      title: "Очистити список?",
      icon: <ExclamationCircleFilled />,
      content: <p>Ви впевнені що хочете очистити список "{name}"?</p>,
      okText: "Так",
      okType: "danger",
      cancelText: "Ні",
      onOk() {
        setIsClearConfirm(true);
      },
      closable: true,
    });
  };

  React.useEffect(() => {
    if (sessionId) {
      getAccountDetails({ session_id: sessionId });
    }
  }, [sessionId]);

  React.useEffect(() => {
    if (isClearConfirm && sessionId) {
      clearList({
        session_id: sessionId,
        list_id: Number(id),
        confirm: isClearConfirm,
      })
        .unwrap()
        .then(() => router.reload());
    }
  }, [isClearConfirm]);

  return (
    <div className={styles.head}>
      <section className="app-container">
        <div className={styles.content}>
          <h2>
            Список {`"${name}"`}{" "}
            <Popover
              color={value !== null ? `green` : ""}
              content={
                value !== null ? (
                  <span style={{ color: "#fff" }}>Скопійовано!</span>
                ) : (
                  <span>Скопіювати</span>
                )
              }
            >
              <span onClick={() => handleClickCopy(`${id}`)}>#{id}</span>
            </Popover>
          </h2>
          <h4>Мова списку: {iso_639_1.toUpperCase()}</h4>
          <ul className={styles.menu}>
            {!isAccountUsernameLoading && accountDetails && (
              <>
                <li className={styles.account}>
                  <Link href={`/user/${created_by}`}>
                    <img
                      src={`https://secure.gravatar.com/avatar/${accountDetails.avatar}.jpg?s=50`}
                      alt=""
                    />
                  </Link>
                  <p>
                    Лист користувача
                    <br />
                    <Link href={`/user/${created_by}`}>{created_by}</Link>
                  </p>
                </li>
                {!isAccountUsernameLoading &&
                  accountDetails &&
                  listUsername === accountDetails.username && (
                    <>
                      <li>
                        <Button onClick={showDeleteConfirm} size="large">
                          Видалити
                        </Button>
                      </li>
                      <li>
                        <Button
                          size="large"
                          disabled={isEmpty}
                          title={
                            isEmpty ? "У списку немає елементів" : undefined
                          }
                          onClick={showClearConfirm}
                          className={styles.buttonClear}
                        >
                          Очистити
                        </Button>
                      </li>
                    </>
                  )}
              </>
            )}
            <li>
              <Button size="large">
                <ShareModal
                  id={Number(id)}
                  title={`Поділитися ${name}`}
                  type="lists"
                  label="Поділитися"
                />
              </Button>
            </li>
          </ul>
          <h3>Про цей список</h3>
          <div className={styles.description}>
            <p>{description}</p>
          </div>
        </div>
      </section>
      {contextMessageHolder}
      {contextModalHolder}
    </div>
  );
};

export default ListDetailsHead;

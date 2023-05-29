import React from "react";
import { useGetAccountDetailsQuery } from "@/redux/api/account/slice";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Button, Popover, message, Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./ListDetailsHead.module.scss";
import { useDeleteListMutation } from "@/redux/api/lists/slice";

interface ListDetailsHeadProps {
  name: string;
  created_by: string;
  description: string;
  id: string;
  iso_639_1: string;
}

const ListDetailsHead: React.FC<ListDetailsHeadProps> = ({
  name,
  created_by,
  description,
  id,
  iso_639_1,
}) => {
  const router = useRouter();
  const [sessionId, setSessionId] = React.useState<string | null>("");

  const { avatar } = useGetAccountDetailsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      avatar: data?.avatar.tmdb ? data?.avatar.tmdb : data?.avatar.gravatar,
    }),
  });
  const [deleteList, { data, isLoading }] = useDeleteListMutation();
  

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [value, copy] = useCopyToClipboard();
  const [messageApi, contextMessageHolder] = message.useMessage();
  const [modal, contextModalHolder] = Modal.useModal();

  const handleClickCopy = (value: string) => {
    copy(value);
    if (value !== null) {
      messageApi.success(`Текст скопійовано: ${value}`);
    }
  };

  const onDelete = () => {
    deleteList({ session_id: sessionId, list_id: id });
    router.back();
  };

  const onConfirmModal = () => {
    setIsModalOpen(false);
    onDelete();
  };

  const onCancelModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    setSessionId(localStorage.getItem("session_id"));
  }, []);

  return (
    <div className={styles.head}>
      {contextMessageHolder}
      {contextModalHolder}
      <section className="app-container">
        <div className={styles.content}>
          <h2>
            Список {`"${name}"`}
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
            <li className={styles.account}>
              <Link href={`/user/${created_by}`}>
                <img
                  src={`https://secure.gravatar.com/avatar/${avatar}.jpg?s=50`}
                  alt=""
                />
              </Link>
              <p>
                Лист користувача
                <br />
                <Link href={`/user/${created_by}`}>{created_by}</Link>
              </p>
            </li>
            <li>
              <Button onClick={() => setIsModalOpen(true)} size="large">
                Видалити
              </Button>
            </li>
            <li>
              <Button size="large">Очистити</Button>
            </li>
          </ul>
          <h3>Про цей список</h3>
          <div className={styles.description}>
            <p>{description}</p>
          </div>
        </div>
      </section>
      <Modal
        title="Modal"
        open={isModalOpen}
        onOk={onConfirmModal}
        onCancel={onCancelModal}
        okText="Так"
        cancelText="Ні"
      >
        <p>Ви впевенні що хочете видалити список "{name}"?</p>
      </Modal>
    </div>
  );
};

export default ListDetailsHead;

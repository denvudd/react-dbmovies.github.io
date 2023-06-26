import React from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

import { CopyOutlined } from "@ant-design/icons";
import { Input, Modal, message } from "antd";
import type { InputRef } from "antd";

import styles from "./ShadeModal.module.scss";

interface ShareModalProps {
  id: number;
  title: string;
  type: "movie" | "tv";
}

const ShareModal: React.FC<ShareModalProps> = ({
  id,
  title,
  type = "movie",
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const inputRef = React.useRef<InputRef>(null);
  const [value, copy] = useCopyToClipboard();
  const [messageApi, contextMessageHolder] = message.useMessage();
  const link = `${
    type === "movie"
      ? `https://react-dbmovies.vercel.app/movies/${id}`
      : `https://react-dbmovies.vercel.app/tv/${id}`
  }`;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClickCopy = (value: string) => {
    copy(value);
    if (value !== null) {
      messageApi.success(`Посилання скопійовано: ${value}`);
    }
  };

  return (
    <>
      <div onClick={showModal}>
        <span>Поширити посилання</span>
      </div>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{ minWidth: "90px", minHeight: "50px" }}
      >
        <div className={styles.input}>
          <Input
            addonAfter={
              <CopyOutlined
                onClick={() => handleClickCopy(`${link}`)}
              />
            }
            defaultValue={link}
            ref={inputRef}
            onFocus={() => {
              inputRef.current!.focus({
                cursor: "all",
              });
            }}
          />
        </div>
      </Modal>
      {contextMessageHolder}
    </>
  );
};

export default ShareModal;
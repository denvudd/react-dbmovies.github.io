import React from "react";
import Modal from "antd/es/modal";
import { CaretRightFilled } from "@ant-design/icons";
import YouTube from "react-youtube";
import styles from "./VideoCard.module.scss";

interface VideoCardProps {
  videoKey: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoKey }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.video}>
        <div
          className={styles.videoWrapper}
          style={{
            backgroundImage: `url(https://i.ytimg.com/vi/${videoKey}/hqdefault.jpg)`,
          }}
        >
          <button onClick={showModal} className={styles.playTrailer}>
            <div className={styles.button}>
              <span>
                <CaretRightFilled size={30} />
              </span>
            </div>
          </button>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={hideModal}
        centered
        footer={null}
        width={"auto"}
        bodyStyle={{ padding: "0px", marginTop: "30px", minWidth: "600px" }}
      >
        <YouTube videoId={videoKey} className={styles.videoPlayer} />
      </Modal>
    </>
  );
};

export default VideoCard;

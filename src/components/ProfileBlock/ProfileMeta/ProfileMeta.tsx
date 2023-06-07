import React from "react";

import styles from "./ProfileMeta.module.scss";
import ProfileTabs from "@/components/UI/ProfileTabs/ProfileTabs";
interface ProfileMetaProps {
  accountId: number;
  sessionId: string;
  accountUsername: string;
}

const ProfileMeta: React.FC<ProfileMetaProps> = ({ accountId, sessionId, accountUsername }) => {
  return (
    <>
      <ProfileTabs
        activeTabIndex={0}
        tabs={[
          { label: "Огляд", link: `/user/${accountUsername}` },
          { label: "Списки", link: `/user/${accountUsername}/lists` },
          { label: "Оцінки", link: `/user/${accountUsername}/rated` },
          {
            label: "Перегляну пізніше",
            link: `/user/${accountUsername}/watchlist`,
          },
        ]}
      />
      <div className={styles.page}>
        <div className="app-container"></div>
      </div>
    </>
  );
};

export default ProfileMeta;

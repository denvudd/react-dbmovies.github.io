import React from "react";
import ProfileTabs from "@/components/UI/tabs/ProfileTabs/ProfileTabs";
import styles from "./ProfileMeta.module.scss";
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
          { label: "Уподобання", link: `/user/${accountUsername}/favorite` },
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

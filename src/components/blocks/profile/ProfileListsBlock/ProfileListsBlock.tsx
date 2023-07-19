import React from "react";
import { useLazyGetAccountListsQuery } from "@/redux/api/account/slice";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Button} from "antd";
import Link from "next/link";
import ProfileListGrid from "./ProfileListGrid/ProfileListGrid";
import ProfileTabs from "../../../UI/tabs/ProfileTabs/ProfileTabs";

import styles from "./ProfileListsBlock.module.scss";

interface ProfileListsBlockProps {
  account_id: number;
  session_id: string;
  accountUsername: string;
}

const ProfileListsBlock: React.FC<ProfileListsBlockProps> = ({
  account_id,
  session_id,
  accountUsername,
}) => {
  const [getLists, { data: lists, isLoading: isListsLoading }] =
    useLazyGetAccountListsQuery();

  React.useEffect(() => {
    getLists({ session_id: session_id, account_id: account_id }, true);
  }, []);
  return (
    <>
      <ProfileTabs
        activeTabIndex={2}
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
        <div className="app-container panel-details">
          {isListsLoading && (
            <div className={styles.loading}>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
              />
            </div>
          )}
          {!isListsLoading && lists && (
            <div className={styles.lists}>
              <div className={styles.listsHeader}>
                <h2 className={styles.pageTitle}>Мої списки</h2>
                <Button>
                  <Link href={`/lists/new`}>Створити список</Link>
                </Button>
              </div>
              <div className={styles.listsCards}>
                {lists.results.length === 0 && (
                  <div>Списків для цього аккаунта не знайдено.</div>
                )}
                {lists.results.length !== 0 && (
                  <ProfileListGrid lists={lists.results} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileListsBlock;

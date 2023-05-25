import React from "react";
import { useLazyGetAccountListsQuery } from "@/redux/api/account/slice";
import { Button, Tabs, TabsProps } from "antd";
import { formatFirstLetterToUppercase } from "@/utils/formatFirstLetterToUppercase";

import styles from "./ProfileMeta.module.scss";

interface ProfileMetaProps {
  accountId: number;
  sessionId: string;
}

const ProfileMeta: React.FC<ProfileMetaProps> = ({ accountId, sessionId }) => {
  const [tabKey, setTabKey] = React.useState("lists");
  const [getLists, { data: lists, isLoading: isListsLoading }] =
    useLazyGetAccountListsQuery();

  const handleTabChange = (key: string) => {
    setTabKey(key);
    switch (tabKey) {
      case "lists":
        getLists({ session_id: sessionId, account_id: accountId }, true);
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "lists",
      label: `Списки`,
      children: !isListsLoading && lists && lists.results.length !== 0 && (
        <div className={styles.lists}>
          <div className={styles.listsHeader}>
            <h2>Мої списки</h2>
            <Button>Створити список</Button>
          </div>
          <div className={styles.listsWrapper}>
            <div className={styles.listsCards}>
              {lists.results.map((list) => (
                <div key={list.id} className={styles.listCard}>
                  <div className={styles.listImage}>
                    <div className={styles.image}></div>
                  </div>
                  <div className={styles.listDetails}>
                    <h2>
                      <a href="">{list.name}</a>
                    </h2>
                    <div className={styles.listMeta}>
                      <span>{list.item_count} елементів</span>
                      <span>
                        {formatFirstLetterToUppercase(list.list_type)}
                      </span>
                    </div>
                    <p>Мова: {list.iso_639_1.toUpperCase()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "rates",
      label: `Оцінки`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: "watchLater",
      label: `Переглянути пізніше`,
      children: `Content of Tab Pane 3`,
    },
  ];

  React.useEffect(() => {
    handleTabChange(tabKey);
  }, [accountId, sessionId, tabKey]);

  return (
    <div className={styles.page}>
      <div className="app-container">
        <Tabs
          defaultActiveKey="lists"
          items={items}
          onChange={handleTabChange}
          size="large"
          centered
        />
      </div>
    </div>
  );
};

export default ProfileMeta;

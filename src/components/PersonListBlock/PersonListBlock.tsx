import React from "react";
import { useLazyGetPopularPersonsQuery } from "@/redux/api/person";

import ButtonTMDB from "../UI/ButtonTMDB/ButtonTMDB";
import { List, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import PersonCard from "../UI/PersonCard/PersonCard";
import type { ListPerson } from "@/redux/api/person/types";

import styles from "./PersonListBlock.module.scss";

interface PersonListBlockProps {}

const PersonListBlock: React.FC<PersonListBlockProps> = ({}) => {
  const [getPersonList, { data: personList, isLoading: isPersonListLoading }] =
    useLazyGetPopularPersonsQuery();
  const [initLoading, setInitLoading] = React.useState(true);
  const [initPage, setInitPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<ListPerson[]>([]);
  const [list, setList] = React.useState<ListPerson[]>([]);

  React.useEffect(() => {
    getPersonList(`language=uk-UA&page=1`)
      .unwrap()
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
        setInitPage(1);
      });
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    const nextPage = initPage + 1;
    setInitPage(nextPage);
    getPersonList(`language=uk-UA&page=${nextPage}`)
      .unwrap()
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
      });
    window.dispatchEvent(new Event("resize"));
  };

  const loadMore = !initLoading ? (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      <ButtonTMDB
        rounded
        onClick={onLoadMore}
        type="secondary"
        disabled={loading}
      >
        Показати більше
      </ButtonTMDB>
    </div>
  ) : null;

  return (
    <>
      <h2 className={styles.title}>Популярні персони</h2>
      {personList && personList.results.length !== 0 && (
        <Spin
          spinning={loading}
          indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
        >
          <List
            className="loadmore-list"
            loading={initLoading}
            itemLayout={"vertical"}
            loadMore={personList.results.length >= 20 ? loadMore : null}
            grid={{ gutter: 16, xxl: 5, xl: 4, lg: 4, md: 3, sm: 2, xs: 1 }}
            dataSource={list}
            renderItem={(person) => (
              <List.Item style={{ borderBottom: "none" }}>
                <PersonCard
                  id={person.id}
                  known_for={person.known_for}
                  name={person.name}
                  profile_path={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w235_and_h235_face/${person.profile_path}`
                      : `https://placehold.co/235x235/png/?text=No+Image`
                  }
                />
              </List.Item>
            )}
          />
        </Spin>
      )}
      {personList && personList.results.length === 0 && (
        <div className="empty-text--default">
          Для цього запиту немає результатів. Спробуйте пізніше.
        </div>
      )}
    </>
  );
};

export default PersonListBlock;

import React from "react";
import { useRouter } from "next/router";
import {
  useLazyGetKeywordDetailsQuery,
  useLazyGetTVDiscoverQuery,
} from "@/redux/api/discover/slice";

import Head from "next/head";
import { Dropdown, List, Spin } from "antd";
import DetailLayout from "@/layouts/DetailsLayout";
import WideElementCard from "@/components/UI/cards/WideElementCard/WideElementCard";
import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import ButtonTMDB from "@/components/UI/ButtonTMDB/ButtonTMDB";
import ResultBanner from "@/components/UI/banners/ResultBanner/ResultBanner";
import Link from "next/link";
import type { ListTV } from "@/redux/api/tv/types";
import type { MenuProps } from "antd";

const KeywordTVPage = () => {
  const router = useRouter();
  const [initLoading, setInitLoading] = React.useState(true);
  const [initPage, setInitPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<ListTV[]>([]);
  const [list, setList] = React.useState<ListTV[]>([]);
  const [getSearch, { data: searchResults }] = useLazyGetTVDiscoverQuery();
  const [
    getKeywordName,
    { data: keywordDetails, isLoading: isKeywordDetailsLoading },
  ] = useLazyGetKeywordDetailsQuery();

  React.useEffect(() => {
    if (router.query.keyword_id !== undefined) {
      getKeywordName(Number(router.query.keyword_id));
      getSearch(
        `language=uk-UA&with_keywords=${router.query.keyword_id}&page=1`
      )
        .unwrap()
        .then((res) => {
          setInitLoading(false);
          setData(res.results);
          setList(res.results);
          setInitPage(1);
        });
    }
  }, [router.query.keyword_id]);

  const onLoadMore = () => {
    setLoading(true);
    const nextPage = initPage + 1;
    setInitPage(nextPage);
    getSearch(
      `language=uk-UA&with_keywords=${router.query.keyword_id}&page=${nextPage}`
    )
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

  const items: MenuProps["items"] = [
    {
      key: "movies",
      label: (
        <Link
          href={`/keyword/${
            keywordDetails ? keywordDetails.id : undefined
          }/movie`}
        >
          Показати фільми
        </Link>
      ),
    },
    {
      key: "tv",
      label: (
        <Link
          href={`/keyword/${keywordDetails ? keywordDetails.id : undefined}/tv`}
        >
          Показати серіали
        </Link>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Пошук за ключовим словом — The Movie Database (TMDB)</title>
      </Head>
      {keywordDetails && !isKeywordDetailsLoading && (
        <ResultBanner
          title={`Пошук за ключовим словом "${keywordDetails.name}"`}
          total={
            <Dropdown menu={{ items }} trigger={["click"]}>
              <span style={{ cursor: "pointer" }}>
                {`${
                  searchResults ? searchResults.total_results : "0"
                } серіалів`}
                <DownOutlined
                  style={{
                    fontSize: "0.8em",
                    marginLeft: "5px",
                    strokeWidth: 60,
                  }}
                />
              </span>
            </Dropdown>
          }
        />
      )}
      <div className="app-container panel-details">
        <DetailLayout>
          {searchResults && searchResults.results.length !== 0 && (
            <Spin
              spinning={loading}
              indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
            >
              <List
                className="loadmore-list"
                loading={initLoading}
                itemLayout={"vertical"}
                loadMore={searchResults.results.length >= 20 ? loadMore : null}
                dataSource={list}
                renderItem={(item) => (
                  <List.Item style={{ borderBottom: "none" }}>
                    <WideElementCard
                      id={item.id}
                      title={item.name}
                      vote_average={item.vote_average}
                      release_date={item.first_air_date}
                      poster_path={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w150_and_h225_bestv2${item.poster_path}`
                          : "https://placehold.co/150x225/png/?text=Not+Found"
                      }
                      overview={item.overview}
                      type="tv"
                    />
                  </List.Item>
                )}
              />
            </Spin>
          )}
          {searchResults && searchResults.results.length === 0 && (
            <div className="empty-text--default">
              Нам не вдалось знайти результати за цим запитом.
            </div>
          )}
        </DetailLayout>
      </div>
    </>
  );
};

export default KeywordTVPage;

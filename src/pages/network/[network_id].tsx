import React from "react";
import { useRouter } from "next/router";
import {
  useLazyGetNetworkDetailsQuery,
  useLazyGetTVDiscoverQuery,
} from "@/redux/api/discover/slice";

import Head from "next/head";
import { List, Space, Spin } from "antd";
import DetailLayout from "@/layouts/DetailsLayout";
import WideElementCard from "@/components/UI/cards/WideElementCard/WideElementCard";
import {
  ContactsFilled,
  LinkOutlined,
  LoadingOutlined,
  PushpinFilled,
} from "@ant-design/icons";
import ButtonTMDB from "@/components/UI/ButtonTMDB/ButtonTMDB";
import ResultBanner from "@/components/UI/banners/ResultBanner/ResultBanner";
import Link from "next/link";
import type { ListTV } from "@/redux/api/tv/types";

const NetworkPage = () => {
  const router = useRouter();
  const [initLoading, setInitLoading] = React.useState(true);
  const [initPage, setInitPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<ListTV[]>([]);
  const [list, setList] = React.useState<ListTV[]>([]);
  const [getSearch, { data: searchResults }] = useLazyGetTVDiscoverQuery();
  const [
    getNetwork,
    { data: networkDetails, isLoading: isNetworkDetailsLoading },
  ] = useLazyGetNetworkDetailsQuery();

  React.useEffect(() => {
    if (router.query.network_id !== undefined) {
      getNetwork(Number(router.query.network_id));
      getSearch(
        `language=uk-UA&with_networks=${router.query.network_id}&page=1`
      )
        .unwrap()
        .then((res) => {
          setInitLoading(false);
          setData(res.results);
          setList(res.results);
          setInitPage(1);
        });
    }
  }, [router.query.network_id]);

  const onLoadMore = () => {
    setLoading(true);
    const nextPage = initPage + 1;
    setInitPage(nextPage);
    getSearch(
      `language=uk-UA&with_networks=${router.query.network_id}&page=${nextPage}`
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

  return (
    <>
      <Head>
        <title>Пошук за мережею — The Movie Database (TMDB)</title>
      </Head>
      {networkDetails && !isNetworkDetailsLoading && (
        <ResultBanner
          title={
            <img
              src={`https://image.tmdb.org/t/p/h30/${networkDetails.logo_path}`}
              alt={`${networkDetails.name} logo`}
            ></img>
          }
          total={`${
            searchResults ? searchResults.total_results : "0"
          } серіалів`}
          extraBar={
            <Space split={"|"} style={{marginTop: "20px", opacity: "0.7", fontSize: "1em"}} size={10}>
              <div>
                <Space size={5}>
                  <span>
                    <ContactsFilled />
                  </span>
                  {networkDetails.name}
                </Space>
              </div>
              <div>
                <Space size={5}>
                  <span>
                    <PushpinFilled />
                  </span>
                  {networkDetails.headquarters}
                </Space>
              </div>
              <Link style={{color: "#fff"}} href={networkDetails.homepage}>
                <Space size={5}>
                  <span>
                    <LinkOutlined />
                  </span>
                  Домашня сторінка
                </Space>
              </Link>
            </Space>
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

export default NetworkPage;

import React from "react";
import { useRouter } from "next/router";
import { useLazyGetSearchMultiQuery } from "@/redux/api/search/slice";

import GlobalSearchBlock from "@/components/GlobalSearchBlock/GlobalSearchBlock";
import ResultsSider from "@/components/GlobalSearchBlock/ResultsSider/ResultsSider";
import ListLayout from "@/layouts/ListLayout";
import Head from "next/head";

const SearchPage = () => {
  const router = useRouter();
  const [
    getSearch,
    { data: searchResults, isLoading: isSearchResultsLoading },
  ] = useLazyGetSearchMultiQuery();

  React.useEffect(() => {
    getSearch({
      query: router.query.query as string,
      params: "language=uk-UA",
    });
  }, [router.query.query]);

  console.log(searchResults);

  return (
    <>
      <Head>
        <title>Пошук — The Movie Database (TMDB)</title>
      </Head>
      <div className="app-container content-with-aside panel-details">
        <ListLayout siderTheme="light">
          {{
            sidebar: (
              <ResultsSider
                results={searchResults ? searchResults.results : undefined}
                totalResults={searchResults ? searchResults.total_results : 0}
              />
            ),
            mainContent: (
              <GlobalSearchBlock
                results={searchResults ? searchResults.results : undefined}
              />
            ),
          }}
        </ListLayout>
      </div>
    </>
  );
};

export default SearchPage;

import React from "react";

import Head from "next/head";
import DetailsSider from "@/components/UI/DetailsSider/DetailsSider";
import DetailsBanner from "@/components/UI/DetailsBanner/DetailsBanner";
import DetailsTabs from "@/components/UI/DetailsTabs/DetailsTabs";
import TVTranslationsBlock from "@/components/TVTranslationsBlock/TVTranslationsBlock";
import ListLayout from "@/layouts/ListLayout";

import type { GetServerSideProps } from "next/types";
import type { ApiError } from "@/redux/api/baseApi/types/ErrorType";
import type {
  PersonDetails,
  PersonTranslation,
  PersonTranslationsApiResponse,
} from "@/redux/api/people/types";
import PersonTranslationBlock from "@/components/PersonTranslationBlock/PersonTranslationBlock";

/* 
  The long cold start issue fix
  Relative issues: 
  #1 https://github.com/denvudd/react-dbmovies.github.io/issues/2
  #2 https://github.com/vercel/next.js/discussions/50783#discussioncomment-6139352
  #3 https://github.com/vercel/vercel/discussions/7961
  Documentation links:
  #1 https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#getserversideprops-with-edge-api-routes
  !! Doesn't work in dev mode !!
*/
export const config = {
  runtime: 'experimental-edge', // warn: using an experimental edge runtime, the API might change
}

type PersonTranslationsPageApiResponse = PersonDetails & {
  translations: PersonTranslationsApiResponse;
};

export interface PersonTranslationsPageProps {
  data: PersonTranslationsTransformedData;
}

interface PersonTranslationsTransformedData {
  translations: PersonTranslation[];
  profile_path: string | null;
  biography: string | null;
  id: number;
  name: string;
}

export const getServerSideProps: GetServerSideProps<{
  data: PersonTranslationsTransformedData;
}> = async (context) => {
  const { id } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?append_to_response=translations&language=uk-UA&api_key=684e3f73d1ca0e692a3016c028aabf72`
  );
  const response: PersonTranslationsPageApiResponse | ApiError =
    await res.json();

  if ("status_code" in response && response.status_code === 34) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  if ("id" in response && response.id) {
    const {
      translations,
      id: movieId,
      profile_path,
      biography,
      name,
    } = response;

    const transformedData: PersonTranslationsTransformedData = {
      translations: translations.translations,
      id: movieId,
      profile_path,
      biography,
      name,
    };
    return { props: { data: transformedData } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/505",
      },
    };
  }
};

const PersonTranslationsPage: React.FC<PersonTranslationsPageProps> = ({
  data,
}) => {
  const { profile_path, name, biography, translations, id } = data;

  const averageColor = {
    backgroundColor: `#e3e3e3`,
  };

  return (
    <>
      <Head>
        <title>
          {data && `${name} — Переклади — The Movie Database (TMDB)`}
        </title>
        <meta
          name="description"
          content={data ? (biography as string) : undefined}
        ></meta>
      </Head>
      <DetailsTabs id={id} title={`Поділитися ${name}`} type="tv" />
      <DetailsBanner
        id={id}
        title={name}
        releaseDate={null}
        posterPath={
          profile_path
            ? `https://image.tmdb.org/t/p/w58_and_h87_face/${profile_path}`
            : "https://placehold.co/58x/png/?text=Not+Found"
        }
        averageColor={averageColor}
        type="person"
        isBackdropLight={true}
      />
      <div className="app-container content-with-aside panel-details">
        <ListLayout siderTheme="light">
          {{
            sidebar: (
              <DetailsSider
                title={"Переклади"}
                totalCount={translations.length}
                items={translations}
                averageColor={{
                  backgroundColor: "rgba(1,180,228)",
                }}
                isBackdropLight={false}
              />
            ),
            mainContent: (
              <PersonTranslationBlock
                translations={translations}
              ></PersonTranslationBlock>
            ),
          }}
        </ListLayout>
      </div>
    </>
  );
};

export default PersonTranslationsPage;

import React from "react";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";
import { useSessionId } from "@/hooks/useSessionId";

import ProfileHead from "@/components/blocks/profile/ProfileBlock/ProfileHead/ProfileHead";
import ProfileRatedBlock from "@/components/blocks/profile/ProfileRatedBlock/ProfileRatedBlock";
import DetailLayout from "@/layouts/DetailsLayout";
import Head from "next/head";
import { withAuth } from "@/auth/withAuth";

const ProfileMovieRatedPage = () => {
  const sessionId = useSessionId();
  const [
    getAccountDetails,
    { data: accountDetails, isLoading: isAccountDetailsLoading },
  ] = useLazyGetAccountDetailsQuery();

  React.useEffect(() => {
    if (sessionId) {
      getAccountDetails({ session_id: sessionId }, true);
    }
  }, [sessionId]);

  return (
    <>
      <Head>
        <title>Мої оцінки — The Movie Database (TMDB)</title>
      </Head>
      <DetailLayout>
        {!isAccountDetailsLoading && accountDetails && (
          <ProfileHead {...accountDetails} />
        )}
        {!isAccountDetailsLoading && accountDetails && sessionId && (
          <ProfileRatedBlock
            account_id={accountDetails.id}
            session_id={sessionId}
            accountUsername={accountDetails.username}
            mediaType="movies"
          />
        )}
      </DetailLayout>
    </>
  );
};

export default withAuth(ProfileMovieRatedPage);

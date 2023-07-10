import React from "react";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";
import { useSessionId } from "@/hooks/useSessionId";

import ProfileHead from "@/components/ProfileBlock/ProfileHead/ProfileHead";
import ProfileFavoriteBlock from "@/components/ProfileFavoriteBlock/ProfileFavoriteBlock";
import DetailLayout from "@/layouts/DetailsLayout";
import Head from "next/head";
import { withAuth } from "@/auth/withAuth";

const ProfileRatedPage = () => {
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
        <title>Мої вподобання — The Movie Database (TMDB)</title>
      </Head>
      <DetailLayout>
        {!isAccountDetailsLoading && accountDetails && (
          <ProfileHead {...accountDetails} />
        )}
        {!isAccountDetailsLoading && accountDetails && sessionId && (
          <ProfileFavoriteBlock
            account_id={accountDetails.id}
            session_id={sessionId}
            accountUsername={accountDetails.username}
            mediaType="tv"
          />
        )}
      </DetailLayout>
    </>
  );
};

export default withAuth(ProfileRatedPage);

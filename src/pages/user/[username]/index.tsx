import React from "react";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";
import { useSessionId } from "@/hooks/useSessionId";

import DetailLayout from "@/layouts/DetailsLayout";
import ProfileHead from "@/components/blocks/profile/ProfileBlock/ProfileHead/ProfileHead";
import ProfileMeta from "@/components/blocks/profile/ProfileBlock/ProfileMeta/ProfileMeta";
import Head from "next/head";
import { withAuth } from "@/auth/withAuth";

const UserPage: React.FC = () => {
  const sessionId = useSessionId();
  const [
    getAccountDetails,
    { data: accountDetails, isLoading: isAccountDetailsLoading },
  ] = useLazyGetAccountDetailsQuery();

  React.useEffect(() => {
    if (sessionId) {
      getAccountDetails({ session_id: sessionId }, true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Мій профіль — The Movie Database (TMDB)</title>
      </Head>
      <DetailLayout>
        {!isAccountDetailsLoading && accountDetails && (
          <ProfileHead {...accountDetails} />
        )}
        {!isAccountDetailsLoading && accountDetails && sessionId && (
          <ProfileMeta
            accountId={accountDetails.id}
            sessionId={sessionId}
            accountUsername={accountDetails.username}
          />
        )}
      </DetailLayout>
    </>
  );
};

export default withAuth(UserPage);

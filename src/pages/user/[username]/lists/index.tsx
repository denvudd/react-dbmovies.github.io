import React from "react";

import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";
import { useSessionId } from "@/hooks/useSessionId";
import DetailLayout from "@/layouts/DetailsLayout";
import ProfileHead from "@/components/ProfileBlock/ProfileHead/ProfileHead";
import ProfileListsBlock from "@/components/ProfileListsBlock/ProfileListsBlock";
import Head from "next/head";
import { withAuth } from "@/auth/withAuth";

const UserLists: React.FC = () => {
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
        <title>Мої списки — The Movie Database (TMDB)</title>
      </Head>
      <DetailLayout>
        {!isAccountDetailsLoading && accountDetails && (
          <ProfileHead {...accountDetails} />
        )}
        {!isAccountDetailsLoading && accountDetails && sessionId && (
          <ProfileListsBlock
            account_id={accountDetails.id}
            session_id={sessionId}
            accountUsername={accountDetails.username}
          />
        )}
      </DetailLayout>
    </>
  );
};

export default withAuth(UserLists);

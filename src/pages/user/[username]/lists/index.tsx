import React from "react";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";

import DetailLayout from "@/layouts/DetailsLayout";
import ProfileHead from "@/components/ProfileBlock/ProfileHead/ProfileHead";
import ProfileListsBlock from "@/components/ProfileListsBlock/ProfileListsBlock";
import { withAuth } from "@/auth/withAuth";

const UserLists: React.FC = () => {
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const [
    getAccountDetails,
    { data: accountDetails, isLoading: isAccountDetailsLoading },
  ] = useLazyGetAccountDetailsQuery();

  React.useEffect(() => {
    const storedSessionId = localStorage.getItem("session_id");

    if (storedSessionId) {
      getAccountDetails({ session_id: storedSessionId }, true).then(() =>
        setSessionId(storedSessionId)
      );
    }
  }, []);

  return (
    <>
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

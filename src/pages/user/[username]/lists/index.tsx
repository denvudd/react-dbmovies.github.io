import React from "react";
import DetailLayout from "@/layouts/DetailsLayout";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";
import ProfileHead from "@/components/ProfileBlock/ProfileHead/ProfileHead";
import { withAuth } from "@/auth/withAuth";
import ProfileListsBlock from "@/components/ProfileListsBlock/ProfileListsBlock";

const UserLists: React.FC = () => {
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const [
    getAccountDetails,
    { data: accountDetails, isLoading: isAccountDetailsLoading },
  ] = useLazyGetAccountDetailsQuery();

  React.useEffect(() => {
    const storedSessionId = localStorage.getItem("session_id");

    getAccountDetails({ session_id: storedSessionId }, true).then(() =>
      setSessionId(storedSessionId)
    );
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
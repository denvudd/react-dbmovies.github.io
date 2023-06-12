import React from "react";
import DetailLayout from "@/layouts/DetailsLayout";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";
import ProfileHead from "@/components/ProfileBlock/ProfileHead/ProfileHead";
import ProfileMeta from "@/components/ProfileBlock/ProfileMeta/ProfileMeta";
import { withAuth } from "@/auth/withAuth";

const UserPage: React.FC = () => {
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const [
    getAccountDetails,
    { data: accountDetails, isLoading: isAccountDetailsLoading },
  ] = useLazyGetAccountDetailsQuery();

  React.useEffect(() => {
    const storedSessionId = localStorage.getItem("session_id");

    if (storedSessionId) {
      getAccountDetails({ session_id: storedSessionId }, true)
        .unwrap()
        .then(() => setSessionId(storedSessionId));
    }
  }, []);

  return (
    <>
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

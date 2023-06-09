import ProfileHead from "@/components/ProfileBlock/ProfileHead/ProfileHead";
import ProfileFavoriteBlock from "@/components/ProfileFavoriteBlock/ProfileFavoriteBlock";
import ProfileRatedBlock from "@/components/ProfileRatedBlock/ProfileRatedBlock";
import DetailLayout from "@/layouts/DetailsLayout";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";
import React from "react";

const ProfileRatedPage = () => {
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
          <ProfileFavoriteBlock
            account_id={accountDetails.id}
            session_id={sessionId}
            accountUsername={accountDetails.username}
          />
        )}
      </DetailLayout>
    </>
  );
};

export default ProfileRatedPage;

import React from "react";
import DetailLayout from "@/layouts/DetailsLayout";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";
import ProfileHead from "@/components/ProfileBlock/ProfileHead/ProfileHead";
import ProfileMeta from "@/components/ProfileBlock/ProfileMeta/ProfileMeta";

const MovideDetails: React.FC = () => {
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const [
    getAccountDetails,
    { data: accountDetails, isLoading: isAccountDetailsLoading },
  ] = useLazyGetAccountDetailsQuery();

  React.useEffect(() => {
    const storedSessionId = localStorage.getItem("session_id");
    
    getAccountDetails({ session_id: storedSessionId }, true)
      .unwrap()
      .then((data) => setSessionId(storedSessionId));
  }, []);

  return (
    <>
      <DetailLayout>
        {!isAccountDetailsLoading && accountDetails && (
          <ProfileHead {...accountDetails} />
        )}
        {!isAccountDetailsLoading && accountDetails && sessionId && (
          <ProfileMeta accountId={accountDetails.id} sessionId={sessionId} />
        )}
      </DetailLayout>
    </>
  );
};

export default MovideDetails;

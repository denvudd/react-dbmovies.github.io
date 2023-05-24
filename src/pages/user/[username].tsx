import React from "react";
import DetailLayout from "@/layouts/DetailsLayout";
import { GetServerSidePropsContext } from "next";
import MovieDetailsBlock from "@/components/MovieDetailsBlock/MovieDetailsBlock";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";
import ProfileHead from "@/components/ProfileBlock/ProfileHead/ProfileHead";

const MovideDetails: React.FC = () => {
  const [
    getAccountDetails,
    { data: accountDetails, isLoading: isAccountDetailsLoading },
  ] = useLazyGetAccountDetailsQuery();

  React.useEffect(() => {
    const session_id = localStorage.getItem("session_id");
    getAccountDetails({ session_id }, true)
      .unwrap()
      .then((data) => console.log(data));
  }, []);

  return (
    <>
      <DetailLayout>
        {!isAccountDetailsLoading && accountDetails && <ProfileHead {...accountDetails}/>}
      </DetailLayout>
    </>
  );
};

export default MovideDetails;

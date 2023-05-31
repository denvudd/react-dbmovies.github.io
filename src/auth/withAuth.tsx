import React, { useEffect } from "react";
import { useRouter } from "next/router";

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<P> => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    console.log(router.pathname);

    useEffect(() => {
      const token = localStorage.getItem("session_id");

      if (!token) {
        router.push("/login");
      } 
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};


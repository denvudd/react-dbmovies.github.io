import { useResponsive } from "ahooks";
import React from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const responsive = useResponsive();

  React.useEffect(() => {
    if (!responsive.lg) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [responsive]);

  return isMobile;
};
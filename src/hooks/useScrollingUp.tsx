import React from "react";

export const useScrollingUp = () => {
  const [scrollingUp, setScrollingUp] = React.useState(true);
  const [isStart, setIsStart] = React.useState(true);

  const prevScroll = React.useRef(0);

  const handleScroll = React.useCallback(() => {
    const currScroll = window.scrollY;
    const isScrolled = prevScroll.current > currScroll;
    setScrollingUp(isScrolled);
    prevScroll.current = currScroll;

    if (window.scrollY < 99) {
      setIsStart(true);
    } else {
      setIsStart(false);
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return { scrollingUp, isStart };
};
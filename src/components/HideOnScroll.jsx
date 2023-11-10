"use client";
import React from "react";
import { Slide } from "@mui/material";

function getScrollY(scroller) {
  return scroller.pageYOffset !== undefined
    ? scroller.pageYOffset
    : scroller.scrollTop !== undefined
    ? scroller.scrollTop
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
}

const useHideOnScroll = (options) => {
  const { threshold, scroller } = options;

  const scrollRef = React.useRef();
  const [hide, setHide] = React.useState(false);

  const handleScroll = React.useCallback(() => {
    const scrollY = getScrollY(scroller || window);
    const prevScrollY = scrollRef.current;
    scrollRef.current = scrollY;

    setHide(
      scrollY < prevScrollY
        ? false
        : scrollY > prevScrollY &&
          scrollY > (threshold != null ? threshold : 100)
        ? true
        : false
    );
  }, [scroller, threshold]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return hide;
};

export default function HideOnScroll(props) {
  const { children, threshold, scroller, ...other } = props;

  const hide = useHideOnScroll({ threshold, scroller });

  return (
    <Slide appear={false} direction="down" in={!hide} {...other}>
      {children}
    </Slide>
  );
}

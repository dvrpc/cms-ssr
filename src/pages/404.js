import React, { useEffect } from "react";

const NotFoundPage = ({ location: { pathname } }) => {
  useEffect(() => {
    //    location.href = `https://www2.dvrpc.org${pathname}`;
  }, [pathname]);
  return null;
};

export default NotFoundPage;

import React, { useEffect, useRef, useState } from "react";

const useQueryParamArray = (paramName) => {
  const [params, setParams] = useState(new Set());
  const firstRender = useRef(true);

  useEffect(() => {
    if (params.size !== 0) {
      let path = `?${paramName}=`;
      Array.from(params).map((param, idx, arr) => {
        param = param.replaceAll("&", "and");
        param = param.replaceAll(" ", "-");
        path += `${param}`;
        if (idx != arr.length - 1) path += ",";
      });
      window.history.replaceState(null, null, location.pathname + path);
    } else if (!firstRender.current && params.size === 0)
      window.history.replaceState(null, "", location.pathname);

    firstRender.current = false;
  }, [params, firstRender]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.size !== 0) {
      let urlArr = urlParams.get(paramName).split(",");
      urlArr = urlArr.map((param) => {
        param = param.replaceAll("and", "&");
        param = param.replaceAll("-", " ");
        return param;
      });
      setParams(new Set(urlArr));
    }
  }, [location.search]);

  return { params, setParams };
};

export default useQueryParamArray;

import React, { useEffect, useRef, useState } from "react";

const useQueryParamArray = (paramName) => {
  const [params, setParams] = useState(new Set());
  const firstRender = useRef(true);

  useEffect(() => {
    if (params.size !== 0) {
      let path = `?${paramName}=`;
      Array.from(params).map((param, idx, arr) => {
        path += `${param}`;
        if (idx != arr.length - 1) path += ",";
      });
      window.history.replaceState(null, null, path);
    } else if (!firstRender.current && params.size === 0)
      window.history.replaceState(null, "", location.pathname);

    firstRender.current = false;
  }, [params, firstRender]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.size !== 0) {
      const urlArr = urlParams.get(paramName).split(",");
      setParams(new Set(urlArr));
    }
  }, []);

  return { params, setParams };
};

export default useQueryParamArray;

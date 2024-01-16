import React, { useEffect } from "react";

const useQueryParamArray = (params) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    params.map((item) => {
      if (urlParams.has(item.paramName)) {
        let arr = urlParams.get(item.paramName).split(",");
        arr = arr.map((val) => val.replaceAll("and", "&").replaceAll("-", " "));
        item.setParams(new Set([...arr]));
      }
    });
  }, []);

  useEffect(() => {
    let path = "";
    params.map((item) => {
      const { paramName, params, setParams } = item;
      if (params.size !== 0) {
        if (!path.length) path = `?${paramName}=`;
        else path += `&${paramName}=`;
        Array.from(params).map((param, idx, arr) => {
          param = param.replaceAll("&", "and");
          param = param.replaceAll(" ", "-");
          path += param;
          if (idx !== arr.length - 1) path += ",";
        });
      }
    });
    window.history.replaceState(null, null, location.pathname + path);
  }, [params]);
};

export default useQueryParamArray;

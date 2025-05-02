import React, { useEffect, useState } from "react";

const useQueryParamArray = (params) => {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    let path = "";

    params.map((item) => {
      const { paramName, params, setParams } = item;

      if (firstRender && urlParams.has(paramName)) {
        if (typeof params === "object") {
          let arr = urlParams.get(paramName).split(",");
          arr = arr.map((val) =>
            val.replaceAll("and", "&").replaceAll("-", " ")
          );
          setParams(new Set([...arr]));
        } else item.setParams(parseInt(params) || params);
      }

      if (params.size !== 0 || params.length) {
        if (!path.length) path = `?${paramName}=`;
        else path += `&${paramName}=`;
        if (typeof params === "object") {
          Array.from(params).map((param, idx, arr) => {
            param = param.toString().replaceAll("&", "and");
            param = param.replaceAll(" ", "-");
            path += param;
            if (idx !== arr.length - 1) path += ",";
          });
        } else path += params;
      }

      if (firstRender) {
        window.history.replaceState(null, null, location.pathname + path);
        setFirstRender(false);
      } else window.history.pushState(null, null, location.pathname + path);
    });
  }, [params]);
};

export default useQueryParamArray;

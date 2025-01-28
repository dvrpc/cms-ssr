import React, { useEffect, useState } from "react";
import { load } from "recaptcha-v3";

const GenerateCaptcha = ({ action }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    (async () => {
      const recaptcha = await load(process.env.GATSBY_SITEKEY);
      const token = await recaptcha.execute(action);
      setToken(token);
    })();
  }, [setToken]);

  return { token };
};

export default GenerateCaptcha;

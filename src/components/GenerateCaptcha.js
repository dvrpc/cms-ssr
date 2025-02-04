import React, { useEffect, useState, useCallback } from "react";
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

  const verifyCaptcha = async (action) => {
    try {
      const req = await fetch("http://localhost:3000/recaptcha/v3", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, action }),
      });
      const res = await req.json();
      if (res.google_response.score > 0.8) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { token, verifyCaptcha };
};

export default GenerateCaptcha;

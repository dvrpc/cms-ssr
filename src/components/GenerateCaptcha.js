import React, { useEffect, useState, useCallback } from "react";
import { load } from "recaptcha-v3";

const GenerateCaptcha = ({ action }) => {
  const [token, setToken] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    (async () => {
      const recaptcha = await load(process.env.GATSBY_SITEKEY);
      const token = await recaptcha.execute(action);
      setToken(token);
    })();
  }, [setToken]);

  const verifyCaptcha = useCallback(
    async (token, action) => {
      try {
        const req = await fetch("http://localhost:3000/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, action }),
        });
        const res = await req.json();
        console.log(res);
        setScore(res.score);
      } catch (error) {
        console.log(error);
      }
    },
    [score]
  );

  return { token, score, verifyCaptcha };
};

export default GenerateCaptcha;

import React, { useEffect, useState, useCallback } from "react";

const GenerateCaptcha = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${process.env.GATSBY_SITEKEY}`;
    script.addEventListener("load", () => setLoaded(true));
    document.body.appendChild(script);
  }, [loaded]);

  const generateToken = async (action) => {
    if (!loaded) return;
    const token = await window.grecaptcha.enterprise.execute(
      process.env.GATSBY_SITEKEY,
      {
        action,
      }
    );
    return token;
  };

  const verifyCaptcha = async (token, action) => {
    try {
      const req = await fetch("https://alpha.dvrpc.org/recaptcha/v3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      const res = await req.json();
      if (res.google_response.score > 0.8) return true;
      else return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { generateToken, verifyCaptcha };
};

export default GenerateCaptcha;

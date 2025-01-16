import React, { useEffect, useCallback } from "react";
import {
  useGoogleRecaptcha,
  GoogleCaptchaProvider,
} from "react-google-recaptcha-v3";

const CaptchaForm = ({ action, onSubmit, children }) => {
  const generateCaptcha = async (action) => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }
    const token = await executeRecaptcha(action);
    return token;
  };

  const formSubmission = async (e) => {
    e.preventDefault();
    const token = generateCaptcha(action);
    try {
      const req = await fetch("https://alpha.dvrpc.org/recaptcha/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, action }),
      });
      const res = await req.json();
      if (res.score >= 0.8) onSubmit();
      else console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleCaptchaProvider reCaptchaKey={process.env.SITEKEY}>
      <form onSubmit={formSubmission}>{...children}</form>
    </GoogleCaptchaProvider>
  );
};

export default CaptchaForm;

import CustomLayout from "./wrapPageElement";

export const onRenderBody = (gatsbyUtils) => {
  const { setHtmlAttributes } = gatsbyUtils;

  setHtmlAttributes({ lang: "en" });
};

export const wrapPageElement = CustomLayout;

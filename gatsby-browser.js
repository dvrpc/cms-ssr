import CustomLayout from "./wrapPageElement";

import "./src/styles/global.css";

export const wrapPageElement = CustomLayout;

export const shouldUpdateScroll = ({ routerProps }) => {
  const { disableScrollUpdate } = routerProps.location.state ?? true;
  return !disableScrollUpdate;
};

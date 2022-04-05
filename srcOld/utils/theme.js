import color from "color";

const defaultTheme = {
  h1: "#0078ae",
  h2: "#2d799a",
  h3: "#4b6a77",
  bgPrimary: "#e7df8b",
  bgImage: ["https://www2.dvrpc.org/img/banner/full/philly1.jpg"],
  bgImage2x: [],
  bgCredits: "",
};

const createTheme = (theme, opts = { light: "#fff", dark: "#161e2e" }) => {
  const lightInfo = color(theme.bgPrimary).contrast(color(opts.light));
  const darkInfo = color(theme.bgPrimary).contrast(color(opts.dark));

  if (lightInfo > darkInfo) {
    theme.infoColor = opts.light;
  } else {
    theme.infoColor = opts.dark;
  }

  if (lightInfo < 4.5 && darkInfo < 4.5) {
    console.error("Insufficient color contrast: ", theme);
  }
  return theme;
};

export default defaultTheme;
export { createTheme };

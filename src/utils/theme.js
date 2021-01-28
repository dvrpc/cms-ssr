import colorContrast from "color-contrast";

const defaultTheme = {
  h1: "#0078ae",
  h2: "#2d799a",
  h3: "#4b6a77",
  bgPrimary: "#e7df8b",
  bgImage: ["https://www2.dvrpc.org/img/banner/full/philly1.jpg"],
  bgCredits: "",
};

const createTheme = (theme, opts = { light: "#fff", dark: "#161e2e" }) => {
  const lightInfo = colorContrast(theme.bgPrimary, opts.light);
  const darkInfo = colorContrast(theme.bgPrimary, opts.dark);

  if (lightInfo > darkInfo) {
    theme.infoColor = opts.light;
  } else {
    theme.infoColor = opts.dark;
  }

  const lightNav = colorContrast(theme.bgNav, opts.light);
  const darkNav = colorContrast(theme.bgNav, opts.dark);

  if (lightNav > darkNav) {
    theme.navColor = opts.light;
  } else {
    theme.navColor = opts.dark;
  }

  if (
    (lightInfo < 4.5 && darkInfo < 4.5) ||
    (lightNav < 4.5 && darkNav < 4.5)
  ) {
    console.error("Insufficient color contrast: ", theme);
  }
  return theme;
};

export default defaultTheme;
export { createTheme };

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
  const light = colorContrast(theme.bgPrimary, opts.light);
  const dark = colorContrast(theme.bgPrimary, opts.dark);

  if (light > dark) {
    theme.navColor = opts.light;
  } else {
    theme.navColor = opts.dark;
  } 

  if (light < 4.5 && dark < 4.5) {
    console.error("Insufficient color contrast: ", theme);
  }
  return theme;
};

export default defaultTheme;
export { createTheme };

import express from "express";
import path from "path";
import gatsyExpress from "gatsby-plugin-express";
import { exec } from "child_process";
import Convert from "ansi-to-html";

const KEY = "01cc1fffa5e86b4705b50a97e96bd446";

const app = express();
const convert = new Convert();

app.get("/_build", (req, res) => {
  if (req.query.key === KEY) {
    res
      .set({ "Content-Type": "text/html; charset=utf-8" })
      .write(
        "<body style='background:black;color:white;margin:0;padding:1em'><pre>"
      );
    const stream = exec("npm run build", {
      env: { ...process.env, FORCE_COLOR: true },
    });
    stream.stdout
      .setEncoding("utf-8")
      .on("data", (data) => res.write(convert.toHtml(data)));
    stream.stderr
      .setEncoding("utf-8")
      .on("data", (data) => res.write(convert.toHtml(data)));
    stream.stdout.on("end", () => exec("pm2 restart cms-dev"));
  } else {
    res.status(401).send("Unauthorized");
  }
});
app.use(express.static(path.resolve(__dirname, "../dist/")));
app.use(
  gatsyExpress("dist/gatsby-express.json", {
    publicDir: path.resolve(__dirname, "../dist/"),
    template: path.resolve(__dirname, "../dist/404/index.html"),
    redirectSlashes: true,
  })
);

const port = process.env.PORT || 8000;
app.listen(port);
console.log(`listening on port ${port}\t\thttp://localhost:${port}`);

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multipart = require("connect-multiparty");
const bodyParser = require("body-parser");
const fs = require("fs");
const uuid = require("uuid/v1");

const app = express();

// app.use((req, res, next) => {
//   console.log("REQ", req);
//   next();
// });

app.use(morgan("dev"));
app.use(multipart());
app.use(cors());
// app.use(express.limit("15mb"));
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "100mb",
    parameterLimit: 1000000
  })
);
app.use(bodyParser.text({ limit: "100mb" }));

app.post("/img", (req, res) => {
  const { imagen } = req.body;
  const base64 = imagen.split(";base64,")[1];
  console.log("REQQQQQQ1", base64.substring(0, 100));
  fs.writeFile(
    `./imagen/${uuid()}.jpg`,
    base64,
    { encoding: "base64" },
    err => {
      console.log("e", err);
    }
  );
  return res.send({
    ok: 200
  });
});

app.post("/video", (req, res) => {
  const { imagen } = req.body;
  const base64 = imagen.split(";base64,")[1];
  console.log("REQQQQQQ1", base64.substring(0, 100));
  fs.writeFile(`./video/${uuid()}.mp4`, base64, { encoding: "base64" }, err => {
    console.log("e", err);
  });
  return res.send({
    ok: 200
  });
});

app.post("/doc", (req, res) => {
  const { imagen } = req.body;
  const base64 = imagen.split(";base64,")[1];
  console.log("REQQQQQQ1", base64.substring(0, 100));
  fs.writeFile(`./file/${uuid()}.doc`, base64, { encoding: "base64" }, err => {
    console.log("e", err);
  });
  return res.send({
    ok: 200
  });
});

app.listen(3000, () => console.log("Run"));

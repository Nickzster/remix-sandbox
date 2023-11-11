import { createRequestHandler } from "@remix-run/express";
import { broadcastDevReady } from "@remix-run/node";
import express from "express";

// notice that the result of `remix build` is "just a module"
import * as build from "../build/index.js";

const app = express();

app.use(express.json());

const router = express.Router();

router.get("/test", [], async (req, res) => {
  return res.status(200).json({ msg: "Hello, world!" });
});

router.post("/test", [], async (req, res) => {
  console.log(req.body);

  const username = req.body.form?.username || "INVALID";
  const password = req.body.form?.password || "INVALID";

  if (username === password && username === "INVALID")
    return res.status(400).json({ msg: "invalid login" });

  if (username === "foo" && password === "bar")
    return res.status(200).json({ msg: "successfully logged in as foo" });

  return res.status(400).json({ msg: "failed to login" });
});

app.use(express.static("public"));

app.use("/api", router);

// and your app is "just a request handler"
app.use("/", createRequestHandler({ build }));

const PORT = process.env.PORT || 3000;

app.listen(51000, () => {
  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build);
  }
  console.log(`App listening on http://localhost:${51000}`);
});

import Mock from "mockjs";

Mock.setup({
  timeout: "50-200"
});

const req = require.context("./modules", true, /\.js$/);
req.keys().forEach(req);

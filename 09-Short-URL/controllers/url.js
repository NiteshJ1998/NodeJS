const { nanoid } = require("nanoid");
const URL = require("../models/url");

const URL = async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ errr: "url is required" });
  const createShortID = nanoid(8);

  await URL.create({
    shortId: createShortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: createShortID });
};

module.exports = {
  handleGenerateNewShortURL,
};

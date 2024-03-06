const Advert = require("../models/Advert.model");
const sanitize = require("mongo-sanitize");
const getImageFileType = require("../utils/getImageFileType");
const fs = require("fs");

exports.getAll = async (req, res) => {
  try {
    const adverts = await Advert.find().populate("user");
    res.json(adverts);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const adv = await Advert.findById(req.params.id).populate("user");
    if (!adv) res.status(404).send({ message: "Not found" });
    else res.json(adv);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.postNewAdv = async (req, res) => {
  try {
    const { title, text, date, price, location, user } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";

    if (
      title &&
      text &&
      date &&
      price &&
      location &&
      user &&
      req.file &&
      ["image/png", "image/jpeg", "image/gif"].includes(fileType)
    ) {
      const stringPattern = new RegExp(/^[a-zA-Z0-9.,! ]+$/);

      if (
        !title.match(stringPattern) ||
        !text.match(stringPattern) ||
        !location.match(stringPattern) ||
        !user.match(stringPattern)
      ) {
        fs.unlinkSync(`public/uploads/${req.file.filename}`);
        return res.status(400).send({ message: "Wrong input!" });
      } else {
        const titleClean = sanitize(title);
        const textClean = sanitize(text);
        const dateClean = sanitize(date);
        const priceClean = sanitize(price);
        const locationClean = sanitize(location);

        const newAdvert = new Advert({
          title: titleClean,
          text: textClean,
          date: dateClean,
          img: req.file.filename,
          price: priceClean,
          location: locationClean,
          user: req.session.user.id,
        });
        await newAdvert.save();
        res.send({ message: "OK", newAdvert });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const adv = await Advert.findById(req.params.id);
    if (adv) {
      await Advert.deleteOne({ _id: req.params.id });
      await fs.unlinkSync(`public/uploads/${adv.img}`);
      res.send({ message: "OK", adv });
    } else res.status(404).send({ message: "Not found..." });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.edit = async (req, res) => {
  try {
    let { title, text, date, price, location, user } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";

    const adv = await Advert.findById(req.params.id);
    if (!adv) {
      return res.status(404).send({ message: "Not found" });
    }

    if (title && text && date && price && location && user) {
      const stringPattern = new RegExp(/^[a-zA-Z0-9.,! ]+$/);

      if (
        !title.match(stringPattern) ||
        !text.match(stringPattern) ||
        !location.match(stringPattern) ||
        !user.match(stringPattern) ||
        !(title.length >= 10 && title.length <= 50) ||
        !(text.length >= 20 && text.length <= 1000)
      ) {
        if (req.file) {
          fs.unlinkSync(`public/uploads/${req.file.filename}`);
        }
        return res.status(400).send({ message: "Wrong input!" });
      }

      const titleClean = sanitize(title);
      const textClean = sanitize(text);
      const dateClean = sanitize(date);
      const priceClean = sanitize(price);
      const locationClean = sanitize(location);
      const userClean = sanitize(user);

      adv.title = titleClean;
      adv.text = textClean;
      adv.date = dateClean;
      adv.price = priceClean;
      adv.location = locationClean;
      adv.user = userClean;

      if (
        req.file &&
        ["image/png", "image/jpeg", "image/gif"].includes(fileType)
      ) {
        if (adv.img) {
          fs.unlinkSync(`public/uploads/${adv.img}`);
        }
        adv.img = req.file.filename;
      }

      await adv.save();
      return res.status(200).send({ message: "OK", adv });
    } else {
      return res.status(400).send({ message: "Missing fields" });
    }
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

exports.search = async (req, res) => {
  try {
    const searchPhrase = req.params.searchPhrase;
    const regex = new RegExp(searchPhrase.split("").join(".*"), "i");
    const adverts = await Advert.find({ title: regex });

    if (!adverts || adverts.length === 0)
      res.status(404).send({ message: "Not found" });
    else res.json(adverts);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

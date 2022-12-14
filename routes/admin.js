const express = require("express");
const { redirect } = require("express/lib/response");
const res = require("express/lib/response");
const router = express.Router();
const Model = require("../models/model");
const postModel = require("../models/postmodel");
const bcrypt = require("bcrypt");

//Post Method
router.post("/signup", async (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hash_password) => {
    if (err) {
      res.status(500).json(err);
    } else {
      const data = new Model({
        name: req.body.name,
        age: req.body.age,
        username: req.body.username,
        password: hash_password,
      });
      await Model.find({ username: req.body.username }).then(async (value) => {
        if (value.length > 0) {
          res.status(400).json({
            status: false,
            message: "username is in use",
          });
        } else {
          try {
            const dataToSave =await data.save();
            res.status(200).json({
              status: "success",
              data: dataToSave,
            });
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
        }
      });
    }
  });
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json({ msg: `Hello ${req.params.username}`, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.put("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await Model.findByIdAndUpdate(id, updatedData, this.true);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with "${data.name}" has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get post
router.get("/getPost/:id", async (req, res) => {
  try {
    const data = await postModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getAllPosts", async (req, res) => {
  try {
    const data = await postModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getcookies", (req, res) => {
  res.json(req.cookies);
});

module.exports = router;

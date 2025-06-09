const express = require("express");
const router = express.Router();
const { Posts } = require("../models");

router.get('/', async (req, res) => {
    const postList = await Posts.findAll();
    res.json(postList);
});

router.get("/byID/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Posts.findByPk(id)
        res.json(post);
    }
    catch(error) {
        res.send(error)
    }
}); 

router.post('/', async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
});

module.exports = router;
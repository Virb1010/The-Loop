const express = require("express");
const router = express.Router();
const { Comments, User } = require("../models");
const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(403).json({ error: "Invalid token" });
  }
}


router.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const comments = await Comments.findAll({
      where: { PostId: postId },
      include: [{ model: User, attributes: ['firstName', 'lastName'] }],
      order: [['createdAt', 'ASC']]
    });

    const formatted = comments.map(comment => ({
      content: comment.content,
      likes: comment.likes,
      dislikes: comment.dislikes,
      createdAt: comment.createdAt,
      author: `${comment.User.firstName} ${comment.User.lastName}`
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Failed to load comments" });
  }
});

router.post("/posts/:postId", authenticateJWT, async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;
  const userId = req.user.id;

    if (!content || content.trim() === "") {
        return res.status(400).json({ error: "Comment content is required" });
    }

    try {
        const comment = await Comments.create({
        content,
        PostId: postId,
        UserId: userId
    });

    const user = await User.findByPk(userId);

    res.json({
        content: comment.content,
        likes: comment.likes,
        dislikes: comment.dislikes,
        createdAt: comment.createdAt,
        author: `${user.firstName} ${user.lastName}`
    });

    } catch (err) {
        console.error("Comment post error:", err);
        res.status(500).json({ error: "Could not post comment" });
    }
});


module.exports = router;

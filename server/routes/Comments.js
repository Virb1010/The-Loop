const express = require("express");
const router = express.Router();
const { Comments, CommentLikes, User } = require("../models");
const { authenticateJWT } = require("../utils/AuthenticateJWT");

router.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const comments = await Comments.findAll({
      where: { PostId: postId },
      include: [{ model: User, attributes: ['firstName', 'lastName'] }],
      order: [['createdAt', 'ASC']]
    });

    const formatted = await Promise.all(
      comments.map(async (comment) => {
        const likes = await CommentLikes.count({
          where: { CommentId: comment.id, isLike: true }
        });

        const dislikes = await CommentLikes.count({
          where: { CommentId: comment.id, isLike: false }
        });

        return {
          id: comment.id,
          content: comment.content,
          likes,
          dislikes,
          createdAt: comment.createdAt,
          author: `${comment.User.firstName} ${comment.User.lastName}`,
          userId: comment.UserId
        };
      })
    );

    res.json(formatted);
  } catch (err) {
    console.error("Failed to load comments:", err);
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
      id: comment.id,
      content: comment.content,
      likes: 0,
      dislikes: 0,
      createdAt: comment.createdAt,
      author: `${user.firstName} ${user.lastName}`,
      userId: comment.UserId
    });
  } catch (err) {
    console.error("Comment post error:", err);
    res.status(500).json({ error: "Could not post comment" });
  }
});

router.post("/like/:commentId", authenticateJWT, async (req, res) => {
  const { commentId } = req.params;
  const { isLike } = req.body;
  const userId = req.user.id;

  const existing = await CommentLikes.findOne({
    where: { UserId: userId, CommentId: commentId }
  });

  if (existing) {
    if (existing.isLike === isLike) {
      await existing.destroy();
      return res.json({ message: "Removed reaction" });
    } else {
      existing.isLike = isLike;
      await existing.save();
      return res.json({ message: "Reaction updated" });
    }
  } else {
    await CommentLikes.create({ isLike, UserId: userId, CommentId: commentId });
    return res.json({ message: "Reaction added" });
  }
});

router.delete("/:commentId", authenticateJWT, async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  try {
    const comment = await Comments.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.UserId !== userId) {
      return res.status(403).json({ error: "You do not have permission to delete this comment" });
    }

    await comment.destroy();
    return res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Delete comment error:", err);
    res.status(500).json({ error: "Could not delete comment" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Posts, PostLikes } = require("../models");
const { authenticateJWT } = require("../utils/AuthenticateJWT")

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.findAll({
      order: [['createdAt', 'DESC']]
    });

    const enrichedPosts = await Promise.all(
      posts.map(async (post) => {
        const likes = await PostLikes.count({ where: { PostId: post.id, isLike: true } });
        const dislikes = await PostLikes.count({ where: { PostId: post.id, isLike: false } });

        return {
          ...post.toJSON(),
          likes,
          dislikes
        };
      })
    );

    res.json(enrichedPosts);
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    res.status(500).json({ error: "Failed to load posts" });
  }
});

router.get("/byID/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Posts.findByPk(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const likes = await PostLikes.count({ where: { PostId: id, isLike: true } });
    const dislikes = await PostLikes.count({ where: { PostId: id, isLike: false } });

    return res.json({
      ...post.toJSON(),
      likes,
      dislikes
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to load post" });
  }
});

router.post('/', async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
});

router.post("/like/:postId", authenticateJWT, async (req, res) => {
  const { postId } = req.params;
  const { isLike } = req.body;
  const userId = req.user.id;

  const existing = await PostLikes.findOne({
    where: { UserId: userId, PostId: postId },
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
    await PostLikes.create({ isLike, UserId: userId, PostId: postId });
    return res.json({ message: "Reaction added" });
  }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
    const post = await Posts.findByPk(postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.UserId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this post' });
    }

    await post.destroy();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Failed to delete post:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

module.exports = router;
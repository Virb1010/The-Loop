import { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Modal } from 'react-bootstrap';
import CategoryIconMap from '../utils/modules/CategoryIconMaps';
import API_BASE_URL from '../utils/API_Base_URL';
import { AuthContext } from '../AuthContext';

function Post() {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState("");
  const [postLikesCount, setPostLikesCount] = useState(0);
  const [postDislikesCount, setPostDislikesCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const isGuest = user?.isGuest;
  const userId = user?.id;

  useEffect(() => {
    fetchPostData();
    fetchComments();
  }, [postId]);

  const fetchPostData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/byID/${postId}`);
    if (!response.data || !response.data.id) {
      navigate('/');
    } else {
      setPost(response.data);
      setPostLikesCount(response.data.likes);
      setPostDislikesCount(response.data.dislikes);
      document.title = response.data.title;
    }
  } catch (err) {
    console.error("Failed to fetch post:", err);
    navigate('/');
  }
};

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/comments/posts/${postId}`);
      setComments(response.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    }
  };

  const handleGuestBlock = () => {
    setModalType("auth-required");
    setShowModal(true);
  };

  const handleNewCommentSubmit = async () => {
    if (!newCommentContent.trim()) return;
    if (isGuest) return handleGuestBlock();

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${API_BASE_URL}/comments/posts/${postId}`,
        { content: newCommentContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewCommentContent("");
      fetchComments();
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  const handlePostLike = async (isLike) => {
    if (isGuest) return handleGuestBlock();

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${API_BASE_URL}/posts/like/${postId}`,
        { isLike },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchPostData();
    } catch (err) {
      console.error("Failed to react to post:", err);
    }
  };

  const handleCommentLike = async (commentId, isLike) => {
    if (isGuest) return handleGuestBlock();

    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${API_BASE_URL}/comments/like/${commentId}`,
        { isLike },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchComments();
    } catch (err) {
      console.error("Failed to react to comment:", err);
    }
  };

  const confirmDelete = (type, id) => {
    setModalType(type);
    setDeleteTargetId(id);
    setShowModal(true);
  };

  const executeDelete = async () => {
    const token = localStorage.getItem("accessToken");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (modalType === 'post') {
        await axios.delete(`${API_BASE_URL}/posts/${deleteTargetId}`, config);
        navigate('/');
      } else if (modalType === 'comment') {
        await axios.delete(`${API_BASE_URL}/comments/${deleteTargetId}`, config);
        fetchComments();
      }
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="PostPage">
      <div className="PostPageTitle">{post.title}</div>
      <div className="PostPageBodyDiv">
        <Card
          className="PostPageSideBar p-3"
          style={{ backgroundColor: '#2f2f2f', color: '#f3efe9' }}
        >
          <div className="w-100 text-center">
            <Button
              variant="outline-light"
              style={{ fontSize: '1.2rem' }}
              onClick={() => navigate(-1)}
            >
              Return to Home Screen
            </Button>
          </div>

          <div className="mt-2">{post.author}</div>

          <div className="mt-3 d-flex align-items-center justify-content-center gap-2">
            <span>{post.category}</span>
            {CategoryIconMap[post.category] && (
              <img
                src={CategoryIconMap[post.category]}
                alt={`${post.category} icon`}
                width={60}
                height={60}
              />
            )}
          </div>

          {post.createdAt && (
            <div className="mt-2" style={{ fontSize: '0.9rem', color: '#ccc' }}>
              {new Date(post.createdAt).toLocaleString()}
            </div>
          )}

          <div className="d-flex gap-4 justify-content-center mt-3">
            <Button
              variant="success"
              className="d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
              onClick={() => handlePostLike(true)}
            >
              <i className="bi bi-hand-thumbs-up-fill" style={{ color: 'white' }}></i>
            </Button>
            <span className="align-self-center">{postLikesCount}</span>

            <Button
              variant="danger"
              className="d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
              onClick={() => handlePostLike(false)}
            >
              <i className="bi bi-hand-thumbs-down-fill" style={{ color: 'white' }}></i>
            </Button>
            <span className="align-self-center">{postDislikesCount}</span>
          </div>

          {userId === post.UserId && (
            <div className="text-center mt-4" style={{ cursor: 'pointer' }} onClick={() => confirmDelete('post', post.id)}>
              <i className="bi bi-trash3-fill fs-4 text-danger"></i>
            </div>
          )}
        </Card>

        <div className="PostPageContent">
          {post.content}

          <div className="PostPageComments mt-4">
            <h4>Leave a Comment</h4>

            <textarea
              className="form-control mb-2"
              rows="3"
              placeholder="Write your comment..."
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
            />

            <div className="text-end">
              <Button variant="primary" onClick={handleNewCommentSubmit}>
                Post Comment
              </Button>
            </div>

            <hr />

            <h5>Comments</h5>

            {comments.length === 0 && <p>No comments yet.</p>}

            {comments.map((comment) => (
              <Card key={comment.id} className="mb-3 p-3">
                <div>
                  <strong>{comment.author}</strong> • {new Date(comment.createdAt).toLocaleString()}
                  {comment.userId === userId && (
                    <i
                      className="bi bi-trash3-fill text-danger ms-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => confirmDelete('comment', comment.id)}
                    ></i>
                  )}
                </div>
                <div className="mt-3">{comment.content}</div>

                <div className="d-flex gap-3 mt-3">
                  <Button
                    variant="success"
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: '36px', height: '36px' }}
                    onClick={() => handleCommentLike(comment.id, true)}
                  >
                    <i className="bi bi-hand-thumbs-up-fill" style={{ color: 'white' }}></i>
                  </Button>
                  <span className="align-self-center">{comment.likes}</span>

                  <Button
                    variant="danger"
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: '36px', height: '36px' }}
                    onClick={() => handleCommentLike(comment.id, false)}
                  >
                    <i className="bi bi-hand-thumbs-down-fill" style={{ color: 'white' }}></i>
                  </Button>
                  <span className="align-self-center">{comment.dislikes}</span>
                </div>

              </Card>
            ))}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          {modalType === 'auth-required' ? (
            <>
              <p className="fs-5">You must be signed in to complete this action.</p>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => navigate('/Welcome')}>Sign In</Button>
              </div>
            </>
          ) : (
            <>
              <p className="fs-5">Are you sure you wish to delete this content? This cannot be undone.</p>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button variant="danger" onClick={executeDelete}>Delete</Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Post;

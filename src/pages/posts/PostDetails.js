import {
  Card,
  Container,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import postApi from "../../api/postApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useStore from "../../store";
import CommentList from "../comments/CommentList";
import CommentForm from "../comments/CommentForm";

const PostDetails = () => {
  const { id } = useParams()
  const [post, setPost] = useState({})
  const store = useStore()
  const navigate = useNavigate()

  const setComments = (newComment) => {
    const comments = post.comments
    const comment = comments.find(comment => comment.id === newComment.id)
    if (comment) {
      // edit old comment to new comment
      var _post = post
      const index = _post.comments.findIndex(comment => comment.id === newComment.id)
      _post.comments[index] = newComment
      setPost(_post)
    } else {
      // add new comment
      post.comments.push(newComment)
      setPost(post)
    }
  }

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`, { replace: true, state: { post } })
  }

  const handleDelete = async () => {
    try {
      store.actions.setIsLoadingRequest(true)
      await postApi.delete(id)
      store.actions.setIsLoadingRequest(false)
      navigate('/posts', { replace: true })
    } catch (error) {
      store.actions.setIsLoadingRequest(false)
      console.log(error.message)
    }
  }

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await postApi.get(id)
        setPost(response.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    getPost()
  }, [id])

  return (
    <Container className="post-details">
      <Card>
        <Card.Title>{post.title}</Card.Title>
        {store.isLoggedIn && (post.user?.id === store.currentUser.id)
          ? (<DropdownButton
            variant="light"
            title={<i className="bi bi-three-dots"></i>}
          >
            <Dropdown.Item onClick={handleEdit}><i className="bi bi-pencil"></i> Edit post</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleDelete}><i className="bi bi-trash"></i> Delete post</Dropdown.Item>
          </DropdownButton>)
          : null}
        <div>
          {post.user?.email}
        </div>
        <div>
          {post.content}
        </div>
      </Card>

      <h1>Comments</h1>
      <CommentList postId={id} comments={post.comments} />
      {store.isLoggedIn
        ? <CommentForm postId={id} setComments={setComments} comment={null} />
        : null}
    </Container>
  );
}

export default PostDetails;
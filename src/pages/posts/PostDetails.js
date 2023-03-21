import {
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Col
} from "react-bootstrap";
import postApi from "../../api/postApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useStore from "../../store";
import CommentIndex from "../comments/CommentIndex";
import moment from "moment";

const PostDetails = () => {
  const { id } = useParams()
  const [post, setPost] = useState({})
  const store = useStore()
  const navigate = useNavigate()

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
      <Container className="border border-1 rounded p-5 mt-2 mb-5">
        <Row>
          <Col lg={11}>
            <h2>{post.title}</h2>
          </Col>
          <Col className="text-end">
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
          </Col>
        </Row>
        <Row>
          <Col>{post.user?.email}</Col>
        </Row>
        <Row>
          <Col>
            <span>posted {moment(post.created_at).fromNow()}</span>
            {post.updated_at > post.created_at
              ? (<span>, edited {moment(post.updated_at).fromNow()} </span>)
              : null
            }
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>{post.content}</Col>
        </Row>
      </Container>

      <CommentIndex postId={id} />
    </Container>
  );
}

export default PostDetails;
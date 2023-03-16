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

const PostDetails = () => {
  const { id } = useParams()
  const [post, setPost] = useState({})
  const isLoggedIn = useStore((state) => state.isLoggedIn)
  const currentUser = useStore((state) => state.currentUser)
  const navigate = useNavigate()

  const handleEdit = () => {
    console.log(post);

    navigate(`/posts/${post.id}/edit`, { replace: true, state: { post } })
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
        {isLoggedIn && (post.user?.id === currentUser.id)
          ? (<DropdownButton
            variant="light"
            title={<i className="bi bi-three-dots"></i>}
          >
            <Dropdown.Item onClick={handleEdit}><i className="bi bi-pencil"></i> Edit post</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#"><i className="bi bi-trash"></i> Delete post</Dropdown.Item>
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
      {post.comments?.map((comment) => {
        return (
          <div className="comment" key={comment.id}>
            <p>{comment.user.email}</p>
            <p>{comment.body}</p>
            <p>{comment.created_at}</p>
            <p>{comment.updated_at}</p>
          </div>
        )
      })}
    </Container>
  );
}

export default PostDetails;
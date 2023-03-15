import { Card, Container } from "react-bootstrap";
import postApi from "../../api/postApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PostDetails = () => {
  const { id } = useParams()
  const [post, setPost] = useState({})

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
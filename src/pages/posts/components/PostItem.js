import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

const PostItem = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/posts/" + post.id);
  }

  return (
    <Card className="m-2 cursor-pointer" onClick={handleClick}>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PostItem;
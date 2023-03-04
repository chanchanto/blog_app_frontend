import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams()

  return (
    <Card className="post-details">
      <Card.Title>post details: {id}</Card.Title>
      <Card.Text> Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nam eligendi omnis alias ratione accusantium quis repellendus, tempore, modi dignissimos animi rem dolor id placeat enim facere repellat quibusdam! Nostrum! </Card.Text>
    </Card>
  );
}

export default PostDetails;
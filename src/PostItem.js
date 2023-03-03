import Card from 'react-bootstrap/Card';

const PostItem = ({ post }) => {
  return (
    <Card className="m-2">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PostItem;
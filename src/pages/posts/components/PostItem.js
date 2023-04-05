import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import moment from "moment";

const PostItem = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/posts/" + post.id);
  }

  return (
    <Card className="mx-2 my-3 cursor-pointer" onClick={handleClick}>
      <Card.Body>
        <Card.Title>
          <LinesEllipsis
            text={post.title}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </Card.Title>
        <div className="pb-3">
          <LinesEllipsis
            text={post.content}
            maxLine="3"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </div>
        <Row className="text-black-50">
          <Col>{post.user.email}</Col>
          <Col className="text-end">
            {moment(post.created_at).fromNow()}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default PostItem;
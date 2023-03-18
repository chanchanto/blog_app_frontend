import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import moment from "moment";

const Comment = ({ comment }) => {
  return (
    <Container className="mx-0 my-2 py-2">
      <div className="comment">
        <Row>
          <Col>
            {comment.user.email}
          </Col>
        </Row>
        <Row>
          <Col>
            <span>commented: {moment(comment.created_at).fromNow()}</span>
            {comment.updated_at > comment.created_at
              ? (<span>, edited: {moment(comment.updated_at).fromNow()} </span>)
              : null
            }
          </Col>
        </Row>
        <div>{comment.body}</div>
      </div>
    </Container>
  );
}

export default Comment;
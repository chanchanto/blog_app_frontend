import { Container } from "react-bootstrap";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  return (
    <Container>
      {comments && comments.length
        ? comments?.map((comment) => {
          return (
            <Comment comment={comment} key={comment.id} />
          )
        })
        : 'No comment yet'
      }
    </Container>
  );
}

export default CommentList;
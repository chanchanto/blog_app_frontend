import { Container } from "react-bootstrap";
import Comment from "./Comment";

const CommentList = ({ postId, comments }) => {
  return (
    <Container>
      {comments && comments.length
        ? comments?.map((comment) => {
          return (
            <Comment postId={postId} comment={comment} key={comment.id} />
          )
        })
        : 'No comment yet'
      }
    </Container>
  );
}

export default CommentList;
import { Container } from "react-bootstrap";
import Comment from "./Comment";

const CommentList = ({ postId, comments, handleEdit, handleDelete }) => {
  return (
    <Container>
      {comments && comments.length
        ? comments?.map((comment) => {
          return (
            <Comment
              postId={postId}
              comment={comment}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              key={comment.id} />
          )
        })
        : 'No comment yet'
      }
    </Container>
  );
}

export default CommentList;
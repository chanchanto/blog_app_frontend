import { Container } from "react-bootstrap";
import Comment from "./CommentItem";
import { NavLink } from "react-router-dom"

const CommentList = ({ postId, comments, handleEdit, handleDelete }) => {
  return (
    <Container className="p-0">
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
        : <p>No comment yet. <NavLink to="/Login">Login</NavLink> to post your comments.</p>
      }
    </Container>
  );
}

export default CommentList;
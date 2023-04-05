import { Container } from "react-bootstrap";
import Comment from "./CommentItem";
import { NavLink } from "react-router-dom"
import useStore from "../../../store";

const CommentList = ({ postId, comments, handleEdit, handleDelete }) => {
  const store = useStore()

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
        : (<p className="mb-5">
          No comment yet.
          {
            store.isLoggedIn
            ? null
            : <span> <NavLink to="/Login">Login</NavLink> to post your comments.</span>
          }
        </p>)
      }
    </Container>
  );
}

export default CommentList;
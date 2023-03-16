import PostForm from "./components/PostForm";
import { useLocation } from "react-router-dom";

const PostEdit = () => {
  const { state } = useLocation();
  const post = state.post;

  return (
    <div>
      <PostForm post={post} />
    </div>
  );
}

export default PostEdit;
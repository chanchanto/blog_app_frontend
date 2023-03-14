import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostList from "./components/PostList";
import postApi from "../../api/postApi";

const PostIndex = () => {
  const pageTitle = 'Posts'
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const params = {};
        const response = await postApi.getAll(params)
        setPosts(response.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    getAllPosts()
  }, [])

  return (
    <Container fluid>
      <h1>{pageTitle}</h1>
      <PostList posts={posts} />
    </Container>
  );
}

export default PostIndex;
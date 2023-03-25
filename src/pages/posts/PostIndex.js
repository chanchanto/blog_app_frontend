import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PostList from "./components/PostList";
import postApi from "../../api/postApi";
import Pagination from "./components/Pagination";
import { toast } from 'react-toastify';

const PostIndex = () => {
  const pageTitle = 'Posts'
  const [posts, setPosts] = useState([])

  const postPerPage = 9
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + postPerPage
  const currentPosts = posts.slice(itemOffset, endOffset)

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const params = {};
        const response = await postApi.getAll(params)
        setPosts(response.data)
      } catch (error) {
        toast.error(error.message)
      }
    }

    getAllPosts()
  }, [])

  return (
    <Container fluid>
      <h2>{pageTitle}</h2>
      <span>Displaying posts {itemOffset + 1} - {endOffset} of {posts.length}</span>
      <PostList posts={currentPosts} />
      <Pagination
        itemsLength={posts.length}
        setItemOffset={setItemOffset}
        itemsPerPage={9}
      />
    </Container>
  );
}

export default PostIndex;
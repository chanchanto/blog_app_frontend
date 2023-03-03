import { useState } from "react";
import { Container } from "react-bootstrap";
import PostList from "./PostList";

const Home = () => {
  const pageTitle = 'Posts'
  const [posts, setPosts] = useState([
    { title: 'Lorem', content: 'lorem ipsum', author: 'u1', id: 1 },
    { title: 'Lorem', content: 'lorem ipsum', author: 'u2', id: 2 },
    { title: 'Lorem', content: 'lorem ipsum', author: 'u2', id: 3 },
    { title: 'Lorem', content: 'lorem ipsum', author: 'u2', id: 4 },
    { title: 'Lorem', content: 'lorem ipsum', author: 'u2', id: 5 },
    { title: 'Lorem', content: 'lorem ipsum', author: 'u2', id: 6 }
  ])

  return (
    <Container fluid>
      <h1>{pageTitle}</h1>
      <PostList posts={posts} />
    </Container>
  );
}

export default Home;
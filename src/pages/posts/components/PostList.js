import { Row, Col } from "react-bootstrap";
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  return (
    <Row>
      {posts?.map((post) => {
        return (
          <Col xs={6} md={4} lg={3} key={post.id} >
            <PostItem post={post} />
          </Col>
        )
      })}
    </Row>
  );
}

export default PostList;
import { Row, Col } from "react-bootstrap";
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  return (
    <Row className="justify-content-center">
      {posts?.map((post) => {
        return (
          <Col sm={12} md={6} lg={4} key={post.id} >
            <PostItem post={post} />
          </Col>
        )
      })}
    </Row>
  );
}

export default PostList;
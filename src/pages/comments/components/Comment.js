import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import moment from "moment";
import useStore from "../../../store";
import { useState } from "react";
import CommentForm from "./CommentForm";

const Comment = ({ comment, handleEdit, handleDelete }) => {
  const store = useStore()
  const [showForm, setShowForm] = useState(false)

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  return (
    <Container className="mx-0 my-2 py-2">
      <div className="comment">
        <Row>
          <Col>
            <Row>{comment.user.email}</Row>
            <Row>
              <Col className="p-0">
                <span>commented {moment(comment.created_at).fromNow()}</span>
                {comment.updated_at > comment.created_at
                  ? (<span>, edited {moment(comment.updated_at).fromNow()} </span>)
                  : null
                }
              </Col>
            </Row>
          </Col>
          <Col className="text-end">
            {store.isLoggedIn && (comment.user?.id === store.currentUser.id)
              ? (<DropdownButton
                variant="light"
                title={<i className="bi bi-three-dots"></i>}
              >
                <Dropdown.Item onClick={toggleForm}>
                  <i className="bi bi-pencil"></i> Edit comment
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => handleDelete(comment.id)}>
                  <i className="bi bi-trash"></i> Delete comment
                </Dropdown.Item>
              </DropdownButton>)
              : null}
          </Col>
        </Row>
        <div>
          {store.isLoggedIn && (comment.user?.id === store.currentUser.id) && showForm
            ? (<CommentForm
              comment={comment}
              handleSubmit={handleEdit}
              toggleForm={toggleForm}
            />)
            : comment.body
          }
        </div>
      </div>
    </Container>
  );
}

export default Comment;
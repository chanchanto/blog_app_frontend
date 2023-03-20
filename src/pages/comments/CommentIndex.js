import commentApi from "../../api/commentApi";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";
import { Container } from "react-bootstrap";
import useStore from "../../store";
import { useEffect, useState } from "react";

const CommentIndex = ({ postId }) => {
  const [comments, setComments] = useState([])
  const store = useStore()

  const handleCreate = async (newComment) => {
    try {
      store.actions.setIsLoadingRequest(true)
      const response = await commentApi.create(postId, newComment)
      store.actions.setIsLoadingRequest(false)

      comments.push(response.data)
      setComments(comments)
    } catch (error) {
      store.actions.setIsLoadingRequest(false)
      console.log(error.message)
    }
  }

  const handleEdit = async (id, editedComment) => {
    try {
      store.actions.setIsLoadingRequest(true)
      const response = await commentApi.edit(postId, id, editedComment)
      store.actions.setIsLoadingRequest(false)

      const index = comments.findIndex(comment => comment.id === id)
      comments[index] = response.data
      setComments(comments)
    } catch (error) {
      store.actions.setIsLoadingRequest(false)
      console.log(error.message)
    }
  }

  const handleDelete = async (commentId) => {
    try {
      store.actions.setIsLoadingRequest(true)
      await commentApi.delete(postId, commentId)
      store.actions.setIsLoadingRequest(false)

      let _comments = comments.filter(comment => comment.id !== commentId)
      setComments(_comments)
    } catch (error) {
      store.actions.setIsLoadingRequest(false)
      console.log(error.message)
    }
  }

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await commentApi.get(postId)
        setComments(response.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    getComments()
  }, [postId])

  return (
    <Container>
      <h1>Comments</h1>
      <CommentList
        postId={postId}
        comments={comments}
        handleEdit={handleEdit}
        handleDelete={handleDelete} />
      {store.isLoggedIn
        ? <CommentForm
          comment={null}
          handleSubmit={handleCreate}
        />
        : null}
    </Container>
  );
}

export default CommentIndex;
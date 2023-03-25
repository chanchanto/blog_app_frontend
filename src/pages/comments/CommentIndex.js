import commentApi from "../../api/commentApi";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";
import { Container } from "react-bootstrap";
import useStore from "../../store";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

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

      toast.success('Created comment sucessfully')
    } catch (error) {
      store.actions.setIsLoadingRequest(false)
      toast.error(error.message)
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

      toast.success('Edited comment sucessfully')
    } catch (error) {
      store.actions.setIsLoadingRequest(false)
      toast.error(error.message)
    }
  }

  const handleDelete = async (commentId) => {
    try {
      store.actions.setIsLoadingRequest(true)
      await commentApi.delete(postId, commentId)
      store.actions.setIsLoadingRequest(false)

      let _comments = comments.filter(comment => comment.id !== commentId)
      setComments(_comments)

      toast.success('Deleted comment sucessfully')
    } catch (error) {
      store.actions.setIsLoadingRequest(false)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await commentApi.get(postId)
        setComments(response.data)
      } catch (error) {
        toast.error(error.message)
      }
    }

    getComments()
  }, [postId])

  return (
    <Container>
      <h2>Comments ({comments.length})</h2>
      <CommentList
        postId={postId}
        comments={comments}
        handleEdit={handleEdit}
        handleDelete={handleDelete} />
      {store.isLoggedIn
        ? (<><h2>Write new comment</h2>
          <CommentForm
            comment={null}
            handleSubmit={handleCreate}
          />
        </>
        )
        : null}
    </Container>
  );
}

export default CommentIndex;
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import commentApi from '../../api/commentApi';
import useStore from '../../store';

const CommentSchema = Yup.object().shape({
  body: Yup.string()
    .required('Required')
});

const CommentForm = ({ postId, setComments, comment }) => {
  const store = useStore()

  const formik = useFormik({
    initialValues: {
      body: comment ? comment.body : ''
    },
    validationSchema: CommentSchema,
    onSubmit: values => {
      const handler = async () => {
        try {
          store.actions.setIsLoadingRequest(true)
          const response = comment
            ? await commentApi.edit(postId, comment.id, values)
            : await commentApi.create(postId, values)
          store.actions.setIsLoadingRequest(false)
          console.log(response.data)

          setComments(response.data) // set post comments
        } catch (error) {
          store.actions.setIsLoadingRequest(false)
          console.log(error.message)
        }
      }
      handler()
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          as="textarea"
          name="body"
          placeholder="Comment"
          style={{ height: '100px' }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          className={formik.touched.body && formik.errors.body ? "has-error" : null}
        />
        {formik.touched.body && formik.errors.body ? (
          <div className="error-message">{formik.errors.body}</div>
        ) : null}
      </Form.Group>
      <Button variant="primary" type="submit">
        {comment ? 'Edit comment' : 'Create new comment'}
      </Button>
    </Form>
  );
}

export default CommentForm;
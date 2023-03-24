import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CommentSchema = Yup.object().shape({
  body: Yup.string()
    .required('Required')
});

const CommentForm = ({ comment, handleSubmit, toggleForm }) => {
  const formik = useFormik({
    initialValues: {
      body: comment ? comment.body : ''
    },
    validationSchema: CommentSchema,
    onSubmit: values => {
      if (comment) {
        handleSubmit(comment.id, values)
        toggleForm()
      } else {
        handleSubmit(values)
      }
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control
          as="textarea"
          name="body"
          placeholder="Your new comment"
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
      <div className="d-flex justify-content-end pt-2">
        {comment
          ? (<Button
            className="ms-3"
            variant="outline-primary"
            type="button"
            onClick={toggleForm}
          >Cancel</Button>)
          : null
        }
        <Button
          className="ms-3"
          variant="primary"
          type="submit">
          {comment ? 'Edit comment' : 'Create new comment'}
        </Button>
      </div>
    </Form>
  );
}

export default CommentForm;
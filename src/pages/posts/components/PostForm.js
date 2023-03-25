import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import postApi from '../../../api/postApi';
import useStore from '../../../store';
import { toast } from 'react-toastify';

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .required('* Required'),
  content: Yup.string()
    .required('* Required'),
  // tags: Yup.string()
});

const PostForm = ({ post }) => {
  const pageTitle = 'Write new post'
  const store = useStore()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      title: post ? post.title : '',
      content: post ? post.content : '',
      tags: post && post.tags ? post.tags.join(',') : ''
    },
    validationSchema: PostSchema,
    onSubmit: values => {
      const handler = async () => {
        try {
          store.actions.setIsLoadingRequest(true)
          const response = post
            ? await postApi.edit(post.id, values)
            : await postApi.create(values)
          store.actions.setIsLoadingRequest(false)

          post
            ? toast.success('Edited post sucessfully')
            : toast.success('Created post sucessfully')
          navigate('/posts/' + response.data.id);
        } catch (error) {
          store.actions.setIsLoadingRequest(false)
          toast.error(error.message)
        }
      }
      handler()
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h2 className="text-center">{pageTitle}</h2>
      <Form.Group>
        <FloatingLabel label="Title" className="mt-3">
          <Form.Control
            type="text"
            name="title"
            placeholder="Title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={formik.touched.title && formik.errors.title ? "has-error" : null}
          />
        </FloatingLabel>
        {formik.touched.title && formik.errors.title ? (
          <div className="text-danger">{formik.errors.title}</div>
        ) : null}
      </Form.Group>
      <Form.Group>
        <FloatingLabel label="Content" className="mt-3">
          <Form.Control
            as="textarea"
            name="content"
            placeholder="Your new comment"
            style={{ height: "200px" }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            className={formik.touched.content && formik.errors.content ? "has-error" : null}
            autoComplete="on"
          />
        </FloatingLabel>
        {formik.touched.content && formik.errors.content ? (
          <div className="text-danger">{formik.errors.content}</div>
        ) : null}
      </Form.Group>
      {/* <Form.Group>
        <Form.Label>Tags</Form.Label>
        <Form.Control
          type="text"
          name="tags"
          placeholder="tag1, tag2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.tags}
          className={formik.touched.tags && formik.errors.tags ? "has-error" : null}
        />
        {formik.touched.tags && formik.errors.tags ? (
          <div className="text-danger">{formik.errors.tags}</div>
        ) : null}
      </Form.Group> */}
      <div className="d-flex justify-content-center mt-4">
        <Button variant="primary" type="submit">
          {post ? 'Edit post' : 'Create new post'}
        </Button>
      </div>
    </Form>
  );
}

export default PostForm;
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import postApi from '../../../api/postApi';
import useStore from '../../../store';

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required'),
  content: Yup.string()
    .required('Required'),
  tags: Yup.string()
});

const PostForm = () => {
  const store = useStore()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      tags: ''
    },
    validationSchema: PostSchema,
    onSubmit: values => {
      const login = async () => {
        try {
          store.actions.setIsLoadingRequest(true)
          const response = await postApi.create(values)
          console.log(response.data)

          navigate('/posts/' + response.data.id);
        } catch (error) {
          store.actions.setIsLoadingRequest(false)
          console.log(error.message)
        }
      }
      login()
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className={formik.touched.title && formik.errors.title ? "has-error" : null}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="error-message">{formik.errors.title}</div>
        ) : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          type="text"
          name="content"
          placeholder="Content"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.content}
          className={formik.touched.content && formik.errors.content ? "has-error" : null}
          autoComplete="on"
        />
        {formik.touched.content && formik.errors.content ? (
          <div className="error-message">{formik.errors.content}</div>
        ) : null}
      </Form.Group>
      <Form.Group>
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
          <div className="error-message">{formik.errors.tags}</div>
        ) : null}
      </Form.Group>
      <Button variant="primary" type="submit">Create new post</Button>
    </Form>
  );
}
 
export default PostForm;
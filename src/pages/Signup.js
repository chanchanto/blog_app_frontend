import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authApi from '../api/authApi';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('* Invalid email')
    .required('* Required'),
  password: Yup.string()
    .required('* Required')
    .min(8, '* Minimum 8 characters'),
  password_confirmation: Yup.string()
    .required('* Required')
    .oneOf([Yup.ref('password')], '* Password\'s not match'),
});

const Signup = () => {
  const pageTitle = 'Sign up'
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      const signup = async () => {
        try {
          const response = await authApi.signup(values)
          toast.success('Signed up sucessfully')
          navigate('/login')
        } catch (error) {
          toast.error(error.message)
        }
      }
      signup()
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h2 className="text-center">{pageTitle}</h2>
      <Form.Group className="px-5 mx-5">
        <FloatingLabel label="Email" className="mt-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.name && formik.errors.name ? "has-error" : null}
          />
        </FloatingLabel>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-danger">{formik.errors.email}</div>
        ) : null}
      </Form.Group>
      <Form.Group className="px-5 mx-5">
        <FloatingLabel label="Password" className="mt-3">
          <Form.Control
            type="password"
            name="password"
            placeholder="******"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={formik.touched.password && formik.errors.password ? "has-error" : null}
            autoComplete="on"
          />
        </FloatingLabel>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-danger">{formik.errors.password}</div>
        ) : null}
      </Form.Group>
      <Form.Group className="px-5 mx-5">
        <FloatingLabel label="Password confirmation" className="mt-3">
          <Form.Control
            type="password"
            name="password_confirmation"
            placeholder="******"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password_confirmation}
            className={formik.touched.password_confirmation && formik.errors.password_confirmation ? "has-error" : null}
            autoComplete="on"
          />
        </FloatingLabel>
        {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
          <div className="text-danger">{formik.errors.password_confirmation}</div>
        ) : null}
      </Form.Group>
      <div className="d-flex justify-content-center mt-4">
        <Button variant="primary" type="submit">Sign up</Button>
      </div>
    </Form>
  );
}

export default Signup;
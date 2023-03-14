import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authApi from '../api/authApi';
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Minimum 8 characters'),
  password_confirmation: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password')], 'Password\'s not match'),
});

const Signup = () => {
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
          console.log(response)
          navigate('/login')
        } catch (error) {
          console.log(error.message)
        }
      }
      signup()
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="example.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={formik.touched.name && formik.errors.name ? "has-error" : null}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error-message">{formik.errors.email}</div>
        ) : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
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
        {formik.touched.password && formik.errors.password ? (
          <div className="error-message">{formik.errors.password}</div>
        ) : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Password confirmation</Form.Label>
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
        {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
          <div className="error-message">{formik.errors.password_confirmation}</div>
        ) : null}
      </Form.Group>
      <Button variant="primary" type="submit">Sign up</Button>
    </Form>
  );
}

export default Signup;
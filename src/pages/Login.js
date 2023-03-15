import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authApi from '../api/authApi';
import useStore from '../store';
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Minimum 8 characters')
});

const Login = () => {
  const store = useStore()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: values => {
      const login = async () => {
        try {
          store.actions.setIsLoadingRequest(true)
          const response = await authApi.login(values)
          console.log(response.data)

          localStorage.setItem('token', response.headers.authorization)
          localStorage.setItem('currentUser', JSON.stringify(response.data.user))
          store.actions.setIsLoggedIn(true)
          store.actions.setIsLoadingRequest(false)

          navigate('/');
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
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="example.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={formik.touched.email && formik.errors.email ? "has-error" : null}
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
      <Button variant="primary" type="submit">Login</Button>
    </Form>
  );
}

export default Login;
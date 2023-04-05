import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authApi from '../api/authApi';
import useStore from '../store';
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('* Invalid email')
    .required('* Required'),
  password: Yup.string()
    .required('* Required')
    .min(8, '* Minimum 8 characters')
});

const Login = () => {
  const pageTitle = 'Login'
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
          store.actions.setIsLoggedIn(true)
          store.actions.setIsLoadingRequest(false)
          store.actions.setCurrentUser(response.data.user)

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
            className={formik.touched.email && formik.errors.email ? "has-error" : null}
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
      <div className="d-flex justify-content-center mt-3">
        <Button variant="primary" type="submit">Login</Button>
      </div>
    </Form >
  );
}

export default Login;
// router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import PostIndex from './pages/posts/PostIndex';
import PostDetails from './pages/posts/PostDetails';
import PostCreate from './pages/posts/PostCreate';
import PostEdit from './pages/posts/PostEdit';
import ProtectedRoute from './pages/ProtectedRoute';

// layouts
import RootLayout from './pages/layouts/RootLayout';

// css
import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="posts">
        <Route index element={<PostIndex />} key="index" />
        <Route path=":id" element={<PostDetails />} key="show" />
        <Route
          path="create"
          element={<ProtectedRoute> <PostCreate /> </ProtectedRoute>}
          key="create" />
        <Route
          path=":id/edit"
          element={<ProtectedRoute> <PostEdit /> </ProtectedRoute>}
          key="edit" />
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = () => {

  return (
    <div className="root-layout">
      <Header />
      <main>
        <Container className="px-5 py-4">
          <Outlet />
        </Container>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </main>
    </div>
  );
}

export default RootLayout;
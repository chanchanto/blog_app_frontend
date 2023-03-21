import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container } from "react-bootstrap";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Header />
      <main>
        <Container className="px-5 py-4">
          <Outlet />
        </Container>
      </main>
    </div>
  );
}

export default RootLayout;
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import { Sidebar } from "../components/Sidebar";
import bgImage from "../assets/background.png";

function ManagePage() {
  return (
    <>
      <Header />

      <div style={background}>
        <div style={container}>
          <Sidebar />

          <div style={content}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

const background = {
  minHeight: "calc(100vh - 80px)",
  width: "100%",
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "40px 0px",
};

const container = {
  width: "1000px",
  background: "#f2f2f2",
  borderRadius: "25px",
  border: "10px solid #b9a8d4",
  display: "flex",
  overflow: "hidden",
};

const content = {
  flex: 1,
  padding: "30px",
};

export default ManagePage;
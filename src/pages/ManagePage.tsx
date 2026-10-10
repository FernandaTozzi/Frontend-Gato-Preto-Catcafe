import { useAuth } from "../features/auth/useAuth";
import styles from "./ManagePage.module.css";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header/Header";
import { Sidebar } from "../components/layout/Sidebar/Sidebar";
import bgImage from "../assets/Background.png";

function ManagePage() {
  const { user } = useAuth();
  return (
    <>
      <Header />

      <div style={background}>
        <div style={{...container, width: user?.tipoUsuario === "ADM" ? "1000px" : "640px"}} className={styles.container}>
          {user?.tipoUsuario === "ADM" && <Sidebar />}

          <div style={content} className={styles.content}>
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
  maxWidth: "100%",
  background: "#ffffff",
  borderRadius: "25px",
  border: "10px solid #b9a8d4",
  display: "flex",
  overflow: "hidden",
};

const content = {
  flex: 1,
  minWidth: 0,
  padding: "30px",
};

export default ManagePage;
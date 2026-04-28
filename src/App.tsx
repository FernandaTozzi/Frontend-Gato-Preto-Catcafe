import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import CatsPage from "./pages/CatsPage";
import bgImage from "./assets/background.png";

function App() {
  return (
    <BrowserRouter>
      <div style={background}>
        <div style={container}>
          
          {/* SIDEBAR */}
          <Sidebar />

          {/* CONTEÚDO */}
          <div style={content}>
            <Routes>
              <Route path="/" element={<CatsPage />} />
              <Route path="/cats" element={<CatsPage />} />
            </Routes>
          </div>

        </div>
      </div>
    </BrowserRouter>
  );
}

const background = {
  minHeight: "100vh",
  backgroundImage: `url(${bgImage})`,
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
export default App;
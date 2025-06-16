import { Route, Routes } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import CreatePage from "@/pages/CreatePage";
import DeletePage from "@/pages/DeletePage";
import EditPage from "@/pages/EditPage";

const App = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/delete/:id" element={<DeletePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

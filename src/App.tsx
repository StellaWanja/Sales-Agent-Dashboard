import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import MainSidebar from "./components/MainSidebar";
import Dashboard from "./pages/Dashboard";
import SchoolManagement from "./pages/SchoolManagement";
import Error from "./pages/Error";
import { useEffect, useState } from "react";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.hash]);

  return (
    <div className="flex m-0 w-full">
      <div
        style={{
          flex: "0 0 auto",
          overflow: "auto",
        }}
      >
        <MainSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          overflow: "auto",
          transition: "margin-left 0.3s",
          marginLeft: sidebarCollapsed ? "80px" : "250px",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="school-management" element={<SchoolManagement />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

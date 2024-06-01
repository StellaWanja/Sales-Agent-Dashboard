import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainSidebar from "./components/MainSidebar";
import Dashboard from "./pages/Dashboard";
import SchoolManagement from "./pages/SchoolManagement";
import Error from "./pages/Error";

function App() {
  return (
    <div className="flex h-[100vh] m-0 w-full">
      <MainSidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="school-management" element={<SchoolManagement />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Agency from "./Components/Agency/Agency.jsx";
import CreateAgencyForm from "./Components/Pages/CreateAgency.jsx";
import ClientEdit from "./Components/Pages/ClientEdit.jsx";
import TopClient from "./Components/top-client/topClient.jsx";
import Client from "./Components/Client/Clients.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Navbar />}>
          <Route path="/Agencies" element={<Agency />} />
          <Route path="/Clients" element={<Client />} />
          <Route path="/Agencies/Create" element={<CreateAgencyForm />} />
          <Route path="/Clients/:clientId" element={<ClientEdit />} />
          <Route path="/top-clients" element={<TopClient />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

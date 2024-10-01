import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Userlisting from "./component/Userlisting";
import Adduser from "./component/Adduser";
import Updateuser from "./component/Updateuser";
import Home from "./component/Home";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./component/ErrorBoundary";
import NavBar from "./component/NavBar";
function App() {
  return (
    <ErrorBoundary>
      <div className="bg-bg-secondary">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<Userlisting />} />
            <Route path="/user/add" element={<Adduser />} />
            <Route path="/user/edit/:code" element={<Updateuser />} />
          </Routes>
        </Router>
        <ToastContainer className="toast-position" position="bottom-right" />
      </div>
    </ErrorBoundary>
  );
}

export default App;

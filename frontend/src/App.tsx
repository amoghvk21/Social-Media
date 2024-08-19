import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import { useContext } from "react";
import Login from "./components/Login";

/*
function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
    </Router>
  );
}
*/

function App() {
    let auth = localStorage.getItem("email"); // Check local storage for an email to see if authenticated

    if (!auth) {
        return (
            <>
                <Navbar />
                <Login />
            </>
        );
    } else {
        return (
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/create" element={<CreatePost />} />
                </Routes>
            </Router>
        );
    }
}

export default App;

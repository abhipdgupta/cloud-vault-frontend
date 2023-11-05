import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Layout from "./pages/layout";
import { Folder } from "./pages/folders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/u" element={<Layout />}>
          <Route path=":username/:folder_id" element={<Folder />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

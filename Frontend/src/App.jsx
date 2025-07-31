import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
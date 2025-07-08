import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <main className="w-3/4 p-10 bg-white overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;

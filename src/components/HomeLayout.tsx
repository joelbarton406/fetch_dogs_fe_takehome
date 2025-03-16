import { Outlet } from "react-router-dom";
import { Header } from "./Header";

function HomeLayout() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-">
        <Outlet />
      </div>
    </>
  );
}

export default HomeLayout;

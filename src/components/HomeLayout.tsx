import { Outlet } from "react-router-dom";
import { Header } from "./Header";

function HomeLayout() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center ">
        <Outlet />
      </div>
    </>
  );
}

export default HomeLayout;

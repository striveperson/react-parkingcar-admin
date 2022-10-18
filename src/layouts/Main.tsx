import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";

const Main = () =>{
  return(
    <div id="content-wrap">
      <Sidebar/>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default Main;
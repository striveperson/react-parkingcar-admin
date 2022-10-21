import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import classes from './Main.module.scss';
import Sidebar from "./sidebar/Sidebar";

const Main = () =>{
  return(
    <div id={classes['content-wrap']}>
      <Sidebar/>
      <main>
        <Suspense>
        <Outlet/>
        </Suspense>
      </main>
    </div>
  );
}

export default Main;
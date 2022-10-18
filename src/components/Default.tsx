import { Suspense } from "react";

import Header from "../layouts/Header";
import Main from "../layouts/Main";

const Default = () => {
  return (
      <Suspense fallback={<div>loading</div>}>
        <Header/>
        <Main/>
      </Suspense>
  )
}

export default Default;
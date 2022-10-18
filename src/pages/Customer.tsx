import { Route, Routes, useNavigate } from "react-router-dom";

import CustomerDetail from "../components/customer/CustomerDetail";
import CustomerList from "../components/customer/CustomerList";
import CustomerRegister from "../components/customer/CustomerRegister";

const Customer = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  }

  return(
    <Routes>
      <Route path="customer">
        <Route index element={<CustomerList/>} />
        <Route path=":id/detail" element={<CustomerDetail onBackClick={handleBackClick} />}  />
        <Route path=":id" element={<CustomerRegister/>}  />
      </Route>
    </Routes>
  )
}

export default Customer;
import { lazy } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import CustomerList from "../components/customer/CustomerList";

const CustomerRegister = lazy(() => import("../components/customer/CustomerRegister"));
const CustomerDetail = lazy(() => import("../components/customer/CustomerDetail"));

const Customer = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  }

  const handleNavigateUpdate = (id: number) => {
      navigate(`/customers/customer/${id}`);
  }

  return(
    <Routes>
      <Route path="customer">
        <Route index element={<CustomerList onClickRegister={handleNavigateUpdate} />} />
        <Route path=":id/detail" element={<CustomerDetail onBackClick={handleBackClick} onClickUpdate={handleNavigateUpdate} />} />
        <Route path=":id" element={<CustomerRegister onBackClick={handleBackClick} />} />
      </Route>
      <Route path="*" element={<Navigate to={'customer'}/>}/>
    </Routes>
  )
}

export default Customer;
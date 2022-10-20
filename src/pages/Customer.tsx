import { Route, Routes, useNavigate } from "react-router-dom";

import CustomerDetail from "../components/customer/CustomerDetail";
import CustomerList from "../components/customer/CustomerList";
import CustomerRegister from "../components/customer/CustomerRegister";

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
    </Routes>
  )
}

export default Customer;
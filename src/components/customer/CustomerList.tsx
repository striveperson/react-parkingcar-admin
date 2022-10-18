import { Suspense } from "react";
import { useNavigate } from "react-router-dom";

import { useCustomerList } from "../../queries/customer/useCustomer";

const CustomerList = () => {
  const navigate = useNavigate();
  const {data, isLoading} = useCustomerList({ page: 1, count:10});
  const customers = data?.list;
  const totalCount = data?.totalCount;


  const emptyCustomers = (!customers || customers.length === 0) ?
    (
      <tbody>
        <tr>
          <td colSpan={8}>등록(검색)된 고객이 없습니다.</td>
        </tr>
      </tbody>
    ) : '';

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div id="contents" className="customer-wrap">
      <div className="title">
        <p>고객 관리</p>
      </div>
        {/* <form onSubmit="onSubmit()">
          <div className="filter-wrap">
            <div className="filter">
              <dl>
                <dt>검색어</dt>
                <dd>
                  <input type="text" name="searchKey" [(ngModel)]="req.searchKey" placeholder="아파트명 입력">
                </dd>
              </dl>
            </div>
            <button type="submit" className="black_white_btn btn_search">검색</button>
          </div>
        </form> */}
  <div className="cont-wrap">
    <div className="cont-top">
      <div className="subtit">
        <p>검색결과</p>
        <p className="count">[{totalCount}] 건</p>
      </div>
      <div className="right-wrap">
        <button type="button" className="orange_white_btn mg5r" onClick={() => navigate('-1')}>등록</button>
      </div>
    </div>
    <div className="cont">
      <div className="tbl-wrap">
        <table className="tbl_ht01">
          <thead>
            <tr>
            <th>No.</th>
            <th>아파트명</th>
            <th>이용 등급</th>
            <th>주소</th>
            <th>이름</th>
            <th>전화번호</th>
            <th>등록일</th>
            <th>사용여부</th>
            </tr>
          </thead>
            {emptyCustomers}
            <tbody>
            {
              customers?.map((customer, i) => 
                <tr key={customer.aptId} onClick={() => navigate(`${customer.aptId}/detail`)}>
                  <td>{ (i + 1)}</td>
                  <td>{customer.aptName}</td>
                  <td>{customer.grade === 'F' ? '무료' : '유료'}</td>
                  <td>{customer.aptAddr}</td>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.regDt}</td>
                  <td>{customer.activate === 'Y' ? '사용' : '미사용'}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      {/* <app-pagination #pagination (pageEvent)="onPageClick($event)"></app-pagination> */}
    </div>
  </div>
</div>
</Suspense>
  )};

export default CustomerList;
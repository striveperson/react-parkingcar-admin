import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Apart } from "../../models/Apart";
import { useCustomer } from "../../queries/customer/useCustomer";

type CustomerDetailProps = {
  onBackClick: () => void,
  onClickUpdate: (id: number) => void,
}

const CustomerDetail = ({onBackClick, onClickUpdate}: CustomerDetailProps) => {
  const params = useParams();
  const id = +params.id!;
  const {data} = useCustomer(id);

  useEffect(() => {
    if (data && data.code === 200) {
      setCustomer(data.info);
    }
  },[data])

  const [customer, setCustomer] = useState<Apart>();
  if (!customer) {
    return <></>
  }

  return (
    <div id="contents" className="customer-detail-wrap">
      <div className="title">
        <p>고객 관리 &gt; 고객 상세</p>
      </div>
      <div className="cont-wrap">
        <div className="box-wrap w100p">
          <div className="box">
            <div className="subtit">
              <p>고객 기본 정보</p>
            </div>
            <div className="cont">
              <div className="tbl-wrap">
                <table className="tbl_hl01">
                  <tbody>
                    <tr>
                      <th>아파트명</th>
                      <td>{customer.aptName}</td>
                      <th>아파트 주소</th>
                      <td>{customer.aptAddr}</td>
                    </tr>
                    <tr>
                      <th>아이디</th>
                      <td>{customer.account}</td>
                      <th>이용 등급</th>
                      <td>{customer.grade === 'F' ? '무료' : '유료'}</td>
                    </tr>
                    <tr>
                      <th>이름</th>
                      <td>{customer.name}</td>
                      <th>전화번호</th>
                      <td>{customer.phone}</td>
                    </tr>
                    <tr>
                      <th>등록된 차량 수</th>
                      <td>{customer.cars}개</td>
                      <th>등록된 사용자 수</th>
                      <td>{customer.users}명</td>
                    </tr>
                    <tr>
                      <th>등록일</th>
                      <td>{customer.regDt}</td>
                      <th>사용여부</th>
                      <td>{customer.activate === 'Y' ? '사용' : '미사용'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-wrap">
          <button type="button" className="gray_white_btn btn_list" onClick={onBackClick}>목록</button>
          <button type="button" className="orange_white_btn btn_list" onClick={() => onClickUpdate(customer.aptId)} >수정</button>
        </div>
      </div>
  </div>
  );
}

export default CustomerDetail;
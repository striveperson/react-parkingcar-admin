import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import Address from "../../models/Address";
import { ParkingCarResp } from "../../models/response/ParkingCarResp";
import { useDoubleCheck } from "../../queries/auth/useAuth";
import { useCustomer, useRegisterCustomer, useUpdateCustomer } from "../../queries/customer/useCustomer";
import ErrorMessage from "../../UI/ErrorMessage";
import SearchApartModal from "../../UI/modal/SearchApartModal";
import { customerRegisterSchema, customerUpdateSchema } from "./resolvers/customerResolvers";

export interface ApartFormData {
  aptId: number;
  aptName: string;
  aptAddr: string;
  account: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  activate: string;
}


/**
 * 
 * TODO 
 * 주소 찾기 모달
 * 
 * 랜더링 언제 언제 되는지
 */

type CustomerRegisterProps = {
  onBackClick: () => void,
}

const CustomerRegister = ({onBackClick}: CustomerRegisterProps) => {
  const param = useParams();
  const id = +(param.id!);
  const isRegisterMode = id === -1;
  
  const {register, getValues, reset, handleSubmit, formState: {errors}} = useForm<ApartFormData>({
    defaultValues: {activate: 'Y'},
    resolver: id === -1 ? customerRegisterSchema : customerUpdateSchema
  });

  const [isDoubleCheck, setIsDoubleCheck] = useState(false);
  
  const navigate = useNavigate();
  const {data} = useCustomer(id);
  useEffect(() => {
    if (!data) {
      return;
    }

    if (data?.code === 200) {
      reset({...data.info});
      setIsDoubleCheck(true);
    } else {
      alert(data?.message);
      navigate('/customers/customer');
    }
  },[data, navigate, reset]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  }

  const {mutate: checkAccount} = useDoubleCheck();
  const onClickDoubleCheck = () => {
    checkAccount(getValues("account"), { onSuccess: (data) => {
      if (data.code === 200) {
        alert('사용 가능한 아이디입니다');
        setIsDoubleCheck(true);
      } else {
        alert(data.message);
      }
    }});
  }

  const { mutate: registerMutate } = useRegisterCustomer();
  const { mutate: updateMutate } = useUpdateCustomer();
  const onSubmit = (apart: ApartFormData) => {
    if (!isDoubleCheck) {
      alert('아이디 중복체크를 해주세요');
      return;
    }

    if (id === -1) {
      registerMutate(apart, {onSuccess: handleSuccess});
    } else {
      updateMutate(apart, {onSuccess: handleSuccess})
    }
  }
  
  const handleSuccess = (response: ParkingCarResp) => {
    if (response.code === 200) {
      navigate(-1)
    } else {
      alert(response.message);
    }
  }

  const handleChangedAddress = ({aptName, aptAddr}: Address) => {
    reset({aptName, aptAddr});
    toggleModal(false);
  }

  return (
    <React.Fragment>
      <div id="contents" className="customer-register-wrap">
        <div className="title">
          <p>고객 관리 &gt; 고객 {isRegisterMode ? '등록' : '수정'}</p>
          <span><span className="important">*</span>는 필수 입력사항 입니다.</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="cont-wrap">
            <div className="box-wrap w100p">
              <div className="box">
                <div className="subtit">
                  <p>고객 기본 정보</p>
                </div>
                <div className="cont">
                  <div className="tbl-wrap">
                    <table className="tbl_hl01">
                      <thead></thead>
                      <tbody>
                      <tr>
                        <th>아파트명<span className="important">*</span></th>
                        <td>
                            <input type="text" {...register("aptName")} disabled />
                        </td>
                      </tr>
                      <tr>
                        <th>아파트 주소<span className="important">*</span></th>
                        <td>
                            <input type="text" {...register("aptAddr")} disabled />
                            <button type="button" className="gray_white_btn btn_list btn_search_apart mg20" onClick={() => toggleModal(true)}>
                              아파트찾기
                            </button>
                        </td>
                      </tr>
                      <tr>
                        <th>아이디<span className="important">*</span></th>
                        <td>
                            <input type="text" {...register("account")} disabled={!isRegisterMode} />
                            {
                              isRegisterMode && !isDoubleCheck &&
                              <button 
                                type="button" 
                                className="gray_white_btn btn_list mg20" 
                                onClick={onClickDoubleCheck}
                              >
                                중복확인
                              </button>
                            }
                            <ErrorMessage errors={errors.account} />
                        </td>
                      </tr>
                      <tr>
                        <th>비밀번호<span className="important">*</span></th>
                        <td>
                          <input type="password" {...register("password")} />
                            <ErrorMessage errors={errors.password} />
                        </td>
                      </tr>
                      <tr>
                        <th>비밀번호 확인<span className="important">*</span></th>
                        <td>
                          <input type="password" {...register("confirmPassword")} 
                          />
                          <ErrorMessage errors={errors.confirmPassword} />
                        </td>
                      </tr>
                      <tr>
                        <th>이름<span className="important">*</span></th>
                        <td>
                          <input type="text" {...register("name")} />
                          <ErrorMessage errors={errors.name} />
                        </td>
                      </tr>
                      <tr>
                        <th>전화번호<span className="important">*</span></th>
                        <td>
                          <input type="tel" {...register("phone")} 
                          />
                          <ErrorMessage errors={errors.phone} />
                        </td>
                      </tr>
                      <tr>
                        <th>사용여부<span className="important">*</span></th>
                        <td>
                          <ul>
                            <li>
                              <input type="radio" id="activate1" value="Y" {...register("activate")} />
                              <label htmlFor="activate1">사용</label>
                            </li>
                            <li>
                              <input type="radio" id="activate2" value="N" {...register("activate")} />
                              <label htmlFor="activate2">미사용</label>
                            </li>
                          </ul>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-wrap">
              <button type="button" className="gray_white_btn btn_list" onClick={onBackClick}>목록</button>
              <button className="orange_white_btn btn_list">{isRegisterMode ? '등록' : '수정'}</button>
            </div>
          </div>
        </form>
      </div>
      <SearchApartModal onToggleModal={toggleModal} onSaveAddress={handleChangedAddress} isOpen={isModalOpen}/>
    </React.Fragment>
  );
}

export default CustomerRegister;
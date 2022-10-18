import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { ParkingCarResp } from "../../models/response/ParkingCarResp";
import { useCustomer, useRegisterCustomer, useUpdateCustomer } from "../../queries/customer/useCustomer";
import ErrorMessage from "../../UI/ErrorMessage";
import { PHON_REGEX } from "../../validates/regexes";

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
 * disable, enable 처리
 * 중복확인
 * 등록 / 수정 텍스트 변경
 * 주소 찾기 모달
 * 랜더링 언제 언제 되는지
 */
const CustomerRegister = () => {
  const {register, setValue, getValues, reset, handleSubmit, formState: {errors}} = useForm<ApartFormData>({defaultValues: {activate: 'Y'}});
  
  const navigate = useNavigate();

  const param = useParams();
  const id = +(param.id!);
  const {data} = useCustomer(id);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data?.code === 200) {
      reset({...data.info});
      register('account', {disabled: true} )
    } else {
      alert(data?.message);
      navigate('/customers/customer');
    }
  },[data, navigate, reset]);

  const {mutate: registerMutate} = useRegisterCustomer();
  const {mutate: updateMutate} = useUpdateCustomer();
  const onSubmit = (apart: ApartFormData) => {
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

  return (
    <div id="contents" className="customer-register-wrap">
      <div className="title">
        <p>고객 관리 &gt; 고객 등록 / 수정</p>
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
                        <input type="text" {...register("aptName", {required: true})} />
                      </td>
                    </tr>
                    <tr>
                      <th>아파트 주소<span className="important">*</span></th>
                      <td>
                        <input type="text" {...register("aptAddr", {required: true})} />
                        <button type="button" className="gray_white_btn btn_list btn_search_apart mg20">
                          아파트찾기
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th>아이디<span className="important">*</span></th>
                      <td>
                        <input type="text" {...register("account", {
                            required: true, 
                            maxLength: {value: 80, message: '아이디는 80자 이하입니다'},
                          })} 
                        />
                        <button type="button" className="gray_white_btn btn_list mg20">중복확인</button>
                          <ErrorMessage errors={errors.account} />
                      </td>
                    </tr>
                    <tr>
                      <th>비밀번호<span className="important">*</span></th>
                      <td>
                        <input type="password" {...register("password", {required: true})} />
                          <ErrorMessage errors={errors.password} />
                      </td>
                    </tr>
                    <tr>
                      <th>비밀번호 확인<span className="important">*</span></th>
                      <td>
                        <input type="password" {...register("confirmPassword", {required: true})} />
                        {/* TODO matching */}
                        {
                           <ErrorMessage errors={errors.confirmPassword} />
                        }
                      </td>
                    </tr>
                    <tr>
                      <th>이름<span className="important">*</span></th>
                      <td>
                        <input type="text" {...register("name", {required: true})} />
                        {
                          errors.name?.type === 'required' && <div className="cred">이름을 입력해주세요</div>
                        }
                      </td>
                    </tr>
                    <tr>
                      <th>전화번호<span className="important">*</span></th>
                      <td>
                        <input type="tel" {...register("phone", {
                          required: true, 
                          maxLength: {value: 11, message: '전화번호는 11자리입니다.'}, 
                          pattern: {value: PHON_REGEX, message: '전화번호 형식은 010-xxxx-xxxx 입니다'}
                          })} 
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
            <button type="button" className="gray_white_btn btn_list">목록</button>
            <button className="orange_white_btn btn_list">등록 / 수정</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CustomerRegister;
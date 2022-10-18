import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SignInResp, useSignInMutation } from '../../../queries/auth/useAuth';
import { authActions } from '../../../store/auth';
import classes from './SignIn.module.scss';


export type LoginData = {
  account: string;
  password: string;
}

const SignIn = () => {
  const {register, handleSubmit, formState: {errors}} =  useForm<LoginData>();
  const {mutate} = useSignInMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: LoginData) => {
    // mutate.mutateAsync(data).then(data => {
    //   console.log(data, 'component')
    // })
    mutate(data, {onSuccess: (response) => {
      const resp: SignInResp  = response.data;
      
      if (resp.code === 200) {
        const {name, type} = resp.info;
        dispatch(authActions.login({name, role: type}));
        navigate('/customers/customer', {replace: true});
      }
    }});
  };

  return (
    <div className={classes['login-wrap']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.loginbox}>
          <h2>주차 관리</h2>
          <div className={classes.inputbox}>
            <dl>
              <dt>아이디</dt>
              <dd>
                <input type="text" {...register("account", {required: true, maxLength: 80})} />
                {errors.account?.type === 'required' && <div className='cred'>아이디는 필수 입력값 입니다</div>}
                {errors.account?.type === 'maxLength' && <div className='cred'>아이디는 80자 미만입니다</div>}
              </dd>
            </dl>
            <dl>
              <dt>비밀번호</dt>
              <dd>
                <input type="current-password" {...register("password", {required: true})} />
                {errors.password?.type === 'required' && <div className='cred'>Password is required</div>}
              </dd>
            </dl>
            <button className={classes['btn_submit']}>로그인</button>
          </div>
          <div className={classes.routingbox}>
            <a href="/sign-up">
              <p>회원가입 &gt;</p>
            </a>
            <div className={classes['btn-wrap']}>
              <p className={classes['btn_forgot']}> 아이디 찾기 &gt;</p>
              <p className={classes['btn_forgot']}>비밀번호 찾기 &gt;</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
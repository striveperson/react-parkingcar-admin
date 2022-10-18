import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useSignOutMutation } from "../queries/auth/useAuth";
import { RootState } from "../store";
import { authActions } from "../store/auth";
import classes from './Header.module.scss';
import sidebarList from "./sidebar/sidebarList";

const Header = () => {
  const {name, role} = useSelector((state: RootState) => state.auth);
  const convertRoleToName = (): string => {
    switch (role) {
      case 'A':
        return '슈퍼 관리자';
      case 'M':
        return '일반 관리자';
      default:
        return '고객'
    }
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {mutate} = useSignOutMutation();

  const handleLogout = () => {
    mutate(undefined , {
      onSuccess: () => {
        dispatch(authActions.logout());
        navigate('/sign-in', {replace: true});
      }
    });
  }

  const location = useLocation();

  const headerGNBList = sidebarList.map(item => {
    const activeClass = location.pathname.split('/')[1] === item.href ? classes.on : '';
    
    return (
      <li key={item.href} className={`${classes['gnb_l1']} ${ activeClass}`} >
        <Link to={`${item.href}/${item.children?.[0].href}`} className={classes['gnb_a1']}>{item.title}</Link>
      </li>
    );
  })

  return (
    <header id={classes['header-wrap']}>
      <div id={classes.header}>
        <div id={classes.logo}>주차 관리 시스템 management system</div>
        <div className={classes['account-wrap']}>
          <p className={classes.membername}><span className={classes.grade}>{convertRoleToName()}</span>
            <Link to="myinfo"> {name} 님<i className="fas fa-pencil-alt"></i></Link>
          </p>
          <button type="button" className={classes['btn-login']} onClick={handleLogout}>로그아웃</button>
        </div>
      </div>
      <div className={classes['gnb-wrap']}>
        <ul className={classes['gnb']}>
          {headerGNBList}
        </ul>
      </div>
    </header>
  );
}

export default Header;
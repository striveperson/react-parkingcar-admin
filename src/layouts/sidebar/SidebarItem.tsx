import { Link, useLocation } from 'react-router-dom';

import $ from 'jquery';
import './SideBar.scss';
import { SidebarItemType } from './sidebarItemType';

type SideBarItemProps = {
  item: SidebarItemType;
}

const SidebarItem = ({item}: SideBarItemProps) => {
  const location = useLocation();

  if (location?.pathname.split('/')[1] !== item.href) {
    return null;
  }

  const onClickToggle = (event: any): boolean => {
    $(event.target).next(".depth2-wrap").slideToggle(200);
    $(event.target).parent(".lnb_l1").toggleClass("close_li");
    return false;
  }

  const childrenItems = item.children!.map(child => {
      const classNameActive = `lnb_l2 ${location.pathname.split('/')[2] === child.href ? 'on' : ''}`;
      
      return (
        <li key={child.href} className={classNameActive}>
          <Link to={`${item.href}/${child.href}`} className='lnb_a2'>{child.title}</Link>
        </li>
      );
    })
  
  return(
      <li className='lnb_l1 has-sub'>
        <a onClick={onClickToggle} className='lnb_a1'>{item.title}</a>
        <div className='depth2-wrap'>
          <ul className='depth2'>
            { childrenItems }
          </ul>
        </div>
      </li>
  );

}

export default SidebarItem;
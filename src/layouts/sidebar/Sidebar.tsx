import './SideBar.scss';
import SidebarItem from './SidebarItem';
import sidebarList from './sidebarList';


const Sidebar = () => {
  return (
    <div className='lnb-wrap'>
    <ul className='lnb'>
      {sidebarList.map(item => <SidebarItem key={item.href} item={item} />)}
    </ul>
  </div>
  );
}

export default Sidebar;
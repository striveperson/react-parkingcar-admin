import { SidebarItemType } from "./sidebarItemType";

const sidebarList: SidebarItemType[] = [
  {
    href: 'customers',
    title: '고객 관리',
    children: [
      {
        href: 'customer',
        title: '고객 관리',
      },
    ]
  },
  {
    href: 'cars',
    title: '차량 관리',
    children: [
      {
        href: 'car',
        title: '차량 관리',
      },
    ]
  },
  {
    href: 'parkings',
    title: '주차 관리',
    children: [
      {
        href: 'parking',
        title: '주차 이력 조회',
      },
      {
        href: 'violation',
        title: '위반 이력 조회',
      },
      {
        href: 'visit',
        title: '방문 이력 관리',
      },
    ]
  },
  {
    href: 'users',
    title: '사용자 관리',
    children: [
      {
        href: 'user',
        title: '사용자 관리',
      },
    ]
  },
  {
    href: 'settings',
    title: '설정 관리',
    children: [
      {
        href: 'parking-spot',
        title: '주차장 정보 관리',
      },
      {
        href: 'violation-reason',
        title: '위반 사유 관리',
      },
    ]
  },
  {
    href: 'admins',
    title: '관리자 관리',
    children: [
      {
        href: 'admin',
        title: '관리자 관리',
      },
    ]
  },
  {
    href: 'boards',
    title: '공지사항 관리',
    children: [
      {
        href: 'notice',
        title: '공지사항 관리',
      },
      {
        href: 'qna',
        title: '1:1 문의 관리',
      },
    ]
  },
]

export default sidebarList;
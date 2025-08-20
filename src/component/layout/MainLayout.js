import React, { useEffect, useState } from 'react';
import {
  DashboardOutlined,
  FolderAddOutlined,
  FolderOpenOutlined,
  CaretDownOutlined,
  FundViewOutlined,
  LogoutOutlined,
  RetweetOutlined,
  UserOutlined,
  FormOutlined,
  SnippetsOutlined,
  ExclamationCircleOutlined,
  UsergroupAddOutlined,
  TagOutlined ,
  DiffOutlined,
  UnorderedListOutlined,
  BorderlessTableOutlined,
  ApartmentOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, Spin, message } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/image/logo.png';
import ProfileImage from '../assets/image/user_50px.png';
import { getRoleMenu, getUser, isLogin, logout ,Config} from '../../config/helper';
import FlagKH from '../assets/flags/kh.png';
import dayjs from 'dayjs';

const { Header, Content, Sider } = Layout;

const MainLayout = () => {
  const user = getUser();
  const permission_menu = getRoleMenu();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [language, setLanguage] = useState('KH');
  const [loading, setLoading] = useState(false);
  const [itemsMenu, setItemsMenu] = useState([]);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    if (!isLogin()) {
      navigate('/');
    }
    const itemsMenuAll = generateMenuItems(language);
    const updatedMenu = itemsMenuAll
      .map(item => {
        if (item.children) {
          const filteredChildren = item.children.filter(child =>
            permission_menu.some(p => p.route === child.key)
          );
          return filteredChildren.length ? { ...item, children: filteredChildren } : null;
        } else {
          return permission_menu.some(p => p.route === item.key) ? item : null;
        }
      })
      .filter(Boolean);

    setItemsMenu(updatedMenu);
  }, [navigate, language, permission_menu]);

  const generateMenuItems = (lang) => [
    {
      key: 'home',
      icon: <DashboardOutlined />,
      label: lang === 'KH' ? 'ផ្ទាំងគ្រប់គ្រង' : 'Dashboard',
    },
    {
      key: 'about-labor',
      icon: <DiffOutlined />,
      label: lang === 'KH' ? 'អំពីមន្ទីរពិសោធន៍' : 'About Labor',
    },
    {
      key: 'service-package',
      icon: <ExclamationCircleOutlined />,
      label: lang === 'KH' ? 'កញ្ចប់ពិនិត្យសុខភាព' : 'Service Package',
    },
    {
      key: 'servicelabornews',
      icon: <FundViewOutlined />,
      label: lang === 'KH' ? 'ព័ត៌មានទូទៅ' : 'Service Labor News',
    },
    {
      key: 'servicelistpackage',
      icon: <BorderlessTableOutlined />,
      label: lang === 'KH' ? 'សេវាកម្មមន្ទីរពិសោធន៍​​' : 'Service List Package ',
    },
    {
      key: 'servicepartcontact',
      icon: <UnorderedListOutlined />,
      label: lang === 'KH' ? 'ទំនាក់ទំនង' : 'Service Part Contact',
    },
    {
      key: 'documents',
      icon: <ApartmentOutlined />,
      label: lang === 'KH' ? 'ឯកសាររដ្ឋបាល' : 'Documents',
    },
    {
      key: 'marquee',
      icon: <SnippetsOutlined />,
      label: lang === 'KH' ? 'អក្សររត់' : 'Show Marquee',
    },
    {
      key: 'image-slide-show',
      icon: <TagOutlined />,
      label: lang === 'KH' ? 'ជា​រូបភាព Show' : 'Slide Show',
    },
    {
      key: 'sub3',
      icon: <RetweetOutlined />,
      label: lang === 'KH' ? 'បង្កើតគណនី' : 'System',
      children: [
        {
          key: 'user-page',
          icon: <UsergroupAddOutlined />,
          label: lang === 'KH' ? 'គណនីប្រើប្រាស់' : 'User',
        },
        {
          key: 'role-page',
          icon: <UserOutlined />,
          label: lang === 'KH' ? 'កំណត់តួនាទី' : 'Role',
        },
      ],
    },
     {
      key: 'social-media-google',
      icon: <GlobalOutlined />,
     
      label: lang === 'KH' ? 'បណ្តាញសង្គម' : 'Socail Media And Google',
    },
    {
      key: 'view-website',
      icon: <CaretDownOutlined />,
      label: lang === 'KH' ? 'មើលវេសាយ' : 'View Website',
    },
  ];

  const onClickMenu = (event) => {
    if (event.key === 'logout') {
      triggerLogout();
      return;
    }
    navigate(event.key);
  };

  // const triggerLogout = () => {
  //   setLogoutLoading(true);
  //   const hide = message.loading('ប្រព័ន្ធដំណើរការចាកចេញ...', 0);

  //   // Delay to show animation
  //   setTimeout(() => {
  //     hide();
  //     logout();
  //     // Wait for fade-out before redirect
  //     setTimeout(() => {
  //       navigate('/');
  //     }, 400);
  //   }, 1000);
  // };

  const triggerLogout = () => {
  setLogoutLoading(true);

  // show AntD message spinner
  const hide = message.loading('ប្រព័ន្ធដំណើរការចាកចេញ...', 0);

  // simulate delay for animation
  setTimeout(() => {
    hide();         // close message
    logout();       // clear storage/session

    // Smooth redirect only once → login page
    navigate("/login", { replace: true });
  }, 1200);
};



  if (!user) return null;

  return (
    <Layout
      style={{
        minHeight: '100vh',
        opacity: logoutLoading ? 0.4 : 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: collapsed ? 40 : 220,
              transition: 'width 0.3s',
              objectFit: 'contain',
            }}
          />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']} onClick={onClickMenu}>
          {itemsMenu.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key} icon={child.icon}>
                    {child.label}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: '#fff',
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingInline: 25,
            boxShadow: '0 2px 8px #f0f1f2',
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 'bold' }}>
            {dayjs().format('ថ្ងៃdddd, D MMMM YYYY')}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={FlagKH}
              alt="Cambodia Flag"
              style={{
                width: 24,
                height: 16,
                objectFit: 'contain',
                borderRadius: 2,
              }}
            />
            <div style={{ textAlign: 'right', lineHeight: 1.6 }}>
              <div>{user?.RoleCode || 'User'}</div>
              <div>សួស្តី {user?.lastName || 'User'}!</div>
            </div>
            <img
              src={user?.image ? `${Config.image_path}${user.image}` : ProfileImage}
              alt="User Profile"
              style={{
                width: 48,
                height: 48,
                objectFit: 'cover',
                borderRadius: '50%',
                border: '1px solid #ddd',
              }}
            />
            <Button
              type="primary"
              size="small"
              icon={<LogoutOutlined />}
              loading={logoutLoading}
              style={{
                marginLeft: 15,
                backgroundColor: '#ff4d4f',
                borderColor: '#ff4d4f',
                borderRadius: '10px',
              }}
              onClick={triggerLogout}
            >
              ចាកចេញ
            </Button>
          </div>
        </Header>

        <Content
          style={{
            margin: '16px',
            background: '#fff',
            padding: 24,
            filter: logoutLoading ? 'blur(2px)' : 'none',
            pointerEvents: logoutLoading ? 'none' : 'auto',
            transition: 'filter 0.3s ease',
          }}
        >
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Spin size="large" tip="Loading..." />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

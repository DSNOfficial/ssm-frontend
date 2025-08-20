import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Layout, Menu, Drawer, Button, FloatButton, Spin, Grid } from 'antd';
import { HomeOutlined, MenuOutlined, ArrowUpOutlined } from '@ant-design/icons';
import FooterPageView from '../../view/component/FooterPageView';
import SocialPageHeaderView from '../../view/component/SocialPageHeaderView';
import Logo from '../assets/image/logo.png';
import './logoanimation.module.css';
import './MainLayoutView.css';

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const translations = {
  en: {
    home: "Home",
    aboutUs: "About Hospital",
    department: "Departments",
    news: "News",
    partners: "Partners",
    contact: "Contact",
    history: "History",
    structure: "Structure",
    admin: "Administration",
    accounting: "Accounting",
    technical: "Technical",
    doc: "Documents",
    vision: "Vision",
    mission: "Mission",
    paitientOut: "Outpatient",
    paitientIn: "Inpatient",
    packageH: "Service Packages",
    training: "Training",
  },
  kh: {
    home: "ទំព័រដើម",
    aboutUs: "អំពីមន្ទីរពិសោធន៍",
    department: "កញ្ចប់ពិនិត្យសុខភាព",
    news: "ព័ត៌មានទូទៅ",
    partners: "សេវាមន្ទីរពិសោធន៍",
    contact: "ទំនាក់ទំនង",
    history: "ប្រវត្តិ",
    structure: "រចនាសម្ព័ន្ធ",
    admin: "រដ្ឋបាល",
    accounting: "គណនេយ្យ",
    technical: "បច្ចេកទេស",
    doc: "ឯកសារ",
    vision: "ចក្ខុវិស័យ",
    mission: "បេសកកម្ម",
    paitientOut: "អ្នកជំងឺក្រៅ",
    paitientIn: "អ្នកជំងឺក្នុង",
    packageH: "កញ្ចប់សេវា",
    training: "បណ្តុះបណ្តាល",
  }
};

const MainLayoutView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'kh');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const screens = useBreakpoint();

  const isMobile = screens.xs;
  const isTablet = screens.md;
  const isDesktop = screens.lg || screens.xl || screens.xxl;

  const t = translations[language];

  const handleLanguageChange = () => {
    const newLang = language === 'kh' ? 'en' : 'kh';
    setLoading(true);
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    setTimeout(() => setLoading(false), 500);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleMenuClick = (key) => {
    setLoading(true);
    setTimeout(() => {
      navigate(key);
      setLoading(false);
      if (isMobile) setDrawerVisible(false);
    }, 500);
  };

  const handleLogoInteraction = (start) => {
    setIsAnimating(start);
  };

  useEffect(() => {
    const handleResize = debounce(() => setIsAnimating(false), 100);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SocialPageHeaderView />

      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
          backgroundColor: '#FFFFFF',
          fontFamily: 'KhmerOSSiemReap'
        }}
      >
        <NavLink to="/">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: isMobile ? 150 : 250, marginTop: 10 }}
            className={isAnimating ? "logo-image animated" : "logo-image"}
            onMouseDown={() => handleLogoInteraction(true)}
            onMouseUp={() => handleLogoInteraction(false)}
            onTouchStart={() => handleLogoInteraction(true)}
            onTouchEnd={() => handleLogoInteraction(false)}
          />
        </NavLink>

        {(isDesktop || isTablet) && (
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            style={{ flex: 1, justifyContent: 'flex-end', fontFamily: 'KhmerOSSiemReap' }}
          >
            <Menu.Item key="/" onClick={() => handleMenuClick('/')}>
              <HomeOutlined /> {t.home}
            </Menu.Item>
            <Menu.Item key="/page/about-labor/2" onClick={() => handleMenuClick('/page/about-labor/2')}>
              {t.aboutUs}
            </Menu.Item>
            <Menu.Item key="/page/service-package-labor" onClick={() => handleMenuClick('/page/service-package-labor')}>
              {t.department}
            </Menu.Item>
            <Menu.Item key="/page/service-package-labor-News" onClick={() => handleMenuClick('/page/service-package-labor-News')}>
              {t.news}
            </Menu.Item>
            <Menu.Item key="/page/service-list-package" onClick={() => handleMenuClick('/page/service-list-package')}>
              {t.partners}
            </Menu.Item>
            <Menu.Item key="/page/service-contact" onClick={() => handleMenuClick('/page/service-contact')}>
              {t.contact}
            </Menu.Item>
            <Menu.Item key="lang" onClick={handleLanguageChange}>
              {language === 'kh' ? 'English' : 'ភាសាខ្មែរ'}
            </Menu.Item>
          </Menu>
        )}

        {isMobile && (
          <Button type="text" icon={<MenuOutlined />} onClick={toggleDrawer} style={{ color: 'black' }} />
        )}
      </Header>

      <Drawer
        title={<img src={Logo} alt="Logo" style={{ width: 150 }} />}
        placement="right"
        closable={false}
        onClose={toggleDrawer}
        open={drawerVisible}
        styles={{
          body: { padding: 0, fontFamily: 'KhmerOSSiemReap' },
        }}
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['home']}
          onClick={({ key }) => handleMenuClick(key)}
        >
          <Menu.Item key="/">
            <HomeOutlined /> {t.home}
          </Menu.Item>

          <SubMenu key="about-us" title={t.aboutUs}>
            <Menu.Item key="/page/history">{t.history}</Menu.Item>
            <Menu.Item key="/page/structure">{t.structure}</Menu.Item>
            <Menu.Item key="/page/administration">{t.admin}</Menu.Item>
            <Menu.Item key="/page/account">{t.accounting}</Menu.Item>
            <Menu.Item key="/page/technical">{t.technical}</Menu.Item>
            <Menu.Item key="/page/books">{t.doc}</Menu.Item>
            <Menu.Item key="/page/vision/2">{t.vision}</Menu.Item>
            <Menu.Item key="/page/mission/1">{t.mission}</Menu.Item>
          </SubMenu>

          <SubMenu key="departments" title={t.department}>
            <Menu.Item key="/page/patient-out">{t.paitientOut}</Menu.Item>
            <Menu.Item key="/page/patient-in">{t.paitientIn}</Menu.Item>
            <Menu.Item key="/page/package-patient">{t.packageH}</Menu.Item>
          </SubMenu>

          <SubMenu key="news" title={t.news}>
            <Menu.Item key="/page/trainers">{t.training}</Menu.Item>
          </SubMenu>

          <Menu.Item key="/page/about-labor">{t.partners}</Menu.Item>
          <Menu.Item key="/page/contact">{t.contact}</Menu.Item>
          <Menu.Item key="lang" onClick={handleLanguageChange}>
            {language === 'kh' ? 'English' : 'ភាសាខ្មែរ'}
          </Menu.Item>
        </Menu>
      </Drawer>

      <Spin spinning={loading} tip="ប្រព័ន្ធកំពុងដំណើរការ... សូមរងចាំ">
        <Content style={{ flex: '1 0 auto', fontFamily: 'KhmerOSSiemReap' }}>
          <Outlet />
        </Content>
      </Spin>

      <Footer style={{ flexShrink: 0, paddingInline: "revert" }}>
        <FooterPageView />
      </Footer>

      <FloatButton.BackTop type="primary" shape="circle" icon={<ArrowUpOutlined />} size="large" />
    </Layout>
  );
};

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

export default MainLayoutView;

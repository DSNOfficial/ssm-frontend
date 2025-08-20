import React from 'react';
import { TikTokOutlined, FacebookOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Flex, Input } from 'antd';
import { BiLogoTelegram } from "react-icons/bi";
// import GoogleTranslatePageView from './GoogleTranslatePageView';
import { NavLink } from 'react-router-dom';
import GoogleTranslatePage from './GoogleTranslatePage';

const { Search } = Input;
 const searchColor ={
  backgroundColor:"#39408"
 }

const onSearch = (value, _e, info) => console.log(info?.source, value);

const SocialPageHeaderView = () => (
  <Flex 
    gap="small" 
    vertical 
    style={{ 
      textAlign: "right", 
      backgroundColor: "#ffffff", 
      padding: '10px 20px', // Adjust padding as needed
       marginBottom:-31,
      
       
    }} 
    className='container'
  >
    <Flex 
      wrap 
      gap="small" 
      style={{ 
        textAlign: "right", 
        justifyContent: "flex-end",
        width: '100%', // Ensure the inner Flex spans the entire width
       
      }}
    >
   
      
      <div >
        <Button style={{ backgroundColor: '#34408c', color: '#ffffff' }}>
        <PhoneOutlined /> Hotline:  (+855) 098 405 404 / 099 405 404
      </Button>
      
    
      <Button type="default" shape="circle" style={{ backgroundColor: '#1877f2' }}>
        <a href='https://www.facebook.com/Aisomedicallaboratoy'><FacebookOutlined style={{ color: '#ffffff' }} /></a>
      </Button>
     
      <Button type="default" shape="circle" style={{ backgroundColor: '#0088cc' }}>
        <a href='https://t.me/tsnh_hospital001'><BiLogoTelegram style={{ color: '#ffffff' }} /></a>
      </Button>
      <Button type="default" shape="circle" style={{ backgroundColor: '#ff0000' }}>
        <NavLink to="/page/contact">
        <MailOutlined style={{ color: '#ffffff' }} />
        </NavLink>
      </Button>
     
     

      </div>
     
  <GoogleTranslatePage />



<br/>
<br/>

        {/* <GoogleTranslatePage/>   */}
    </Flex>
  </Flex>
  
 
);

export default SocialPageHeaderView;

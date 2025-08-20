import React, { useState,useEffect } from 'react';
import Iframe from 'react-iframe';
import { Card, Col, Row, Divider, Button ,message} from 'antd';
import { TikTokOutlined, FacebookOutlined, MailOutlined } from '@ant-design/icons';
import { BiLogoTelegram } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import { Config } from "../../config/helper";
import { request } from "../../config/request";


// Custom styles for the container and list
const containerStyle = {
  padding: '20px',
  margin: '0 auto',
  maxWidth: '1200px',
  backgroundColor: 'white',
};

const paragraphStyle = {
  textAlign: "justify",
  textJustify: "inter-word",
  color:'#343293',

};

const listStyle = {
  listStyleType: 'none', // Remove bullet points
  paddingLeft: '0',  // Remove indentation
  color:'#343293',
};

const newsHeaderStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#333',
  color:'#343293',

  marginBottom: '12px',
};

const listItemStyle = {
  fontSize: '16px',
  marginBottom: '6px',
  color:'#343293',
};

const fontColor = {
  color: '#34408c' ,
  fontSize: '20px',
  fontWeight: 'bold',

};

const socialButtonStyle = {
  default: {
    backgroundColor: '#ffffff',
    color: '#000000'
  },
  facebook: {
    backgroundColor: '#1877f2',
    color: '#ffffff'
  },
  telegram: {
    backgroundColor: '#0088cc',
    color: '#ffffff'
  },
  email: {
    backgroundColor: '#ff0000',
    color: '#ffffff'
  }
};

const FooterPageView = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClickList = (key) => {
  setLoading(true);
  setTimeout(() => {
  }, 500); // Adjust delay as needed
};

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);

    try {
      const res = await request("footsocialmedia/getList", "get");
      if (res && res.list && res.list.length > 0) {
        setList(res.list);
      }
    } catch (error) {
      message.error("Failed to fetch the list");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={containerStyle}>
      <Row gutter={[16, 16]}> 
          {list.map((item, index) => (
              <Col  key={index} xs={24} sm={12} lg={8}> 
          <div title="Location">
            {/* <h3 style={fontColor}>ទីតាំងរបស់មន្ទីរពិសោធន៍វេជ្ជសាស្រ្ត អៃហ៊្សូ</h3> */}
            <h3 style={fontColor}>{item.title1}</h3>
            <Divider />
            <Iframe         
              // src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3909.840015499457!2d104.816391!3d11.491463!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc76a6be3%3A0x93e2896965e99e!2sFRR8%2BHHJ%2C%20Phnom%20Penh%2C%20Cambodia!5e0!3m2!1sen!2sus!4v1752724246501!5m2!1sen!2sus"
              src={item.googleLink}
              width="100%"
              height="250px" // Fixed height for responsive iframes
              frameBorder="0"
              style={{ border: 'none' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
              <Button type="default" shape="circle" style={socialButtonStyle.facebook}>
                <a  href='https://www.facebook.com/p/%E1%9E%98%E1%9E%93%E1%9F%92%E1%9E%91%E1%9E%B8%E1%9E%9A%E1%9E%96%E1%9E%B7%E1%9E%9F%E1%9F%84%E1%9E%92%E1%9E%93%E1%9F%8D%E1%9E%9C%E1%9F%81%E1%9E%87%E1%9F%92%E1%9E%87%E1%9E%9F%E1%9E%B6%E1%9E%9F%E1%9F%92%E1%9E%8A%E1%9F%92%E1%9E%9A-%E1%9E%A2%E1%9F%83%E1%9E%A0%E1%9F%92%E1%9E%9F%E1%9F%8A%E1%9E%BC-100064878364765/'><FacebookOutlined style={{ color: socialButtonStyle.facebook.color }} /></a>
              </Button>
              
              <Button type="default" shape="circle" style={socialButtonStyle.telegram}>
                <a href='https://t.me/Aiso_Medical_Laboratory'><BiLogoTelegram style={{ color: socialButtonStyle.telegram.color }} /></a>
              </Button>
              <Button type="default" shape="circle" style={socialButtonStyle.email}>
                <MailOutlined style={{ color: socialButtonStyle.email.color }} />
              </Button>
            </div>
          </div>
        </Col>
                 ))}

       {list.map((item, index) => (
         <Col  key={index} xs={24} sm={12} lg={8}>
          <div style={paragraphStyle}>
            <h3 style={fontColor} >{item.title2}</h3>
            <Divider />



            <div style={{margin:10,paddingTop:0}}>
            <p style={paragraphStyle}>{item.description}</p>
            <p>ទូរស័ព្ទ: {item.phone} </p>
            <p>អ៊ីម៉ែល: {item.email}</p>

            </div>
            
  
           </div>
        </Col>

            ))}

       
         {list.map((item, index) => (
          <Col   key={index} xs={24} sm={12} lg={8}>
          {/* <div title="Social Media">
            <h3 style={fontColor}>ហ្វេសប៊ុកផ្លូវការមន្ទីរពិសោធន៍វេជ្ជសាស្រ្ត អៃហ៊្សូ</h3>
            <Divider />
            <Iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftsnhhospital&tabs=timeline&width=600&height=250&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
              width="100%"
              height="250px" // Consistent height for iframes
              frameBorder="0"
              style={{ border: 'none' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <Divider />
          </div> */}

          <div title="Social Media">
  <h3 style={fontColor}>{item.title3}</h3>
  <Divider />
  <Iframe
    // src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAisomedicallaboratoy&tabs=timeline&width=600&height=250&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false"
    // // src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fp%2F%E1%9E%98%E1%9E%93%E1%9F%92%E1%9E%91%E1%9E%B8%E1%9E%9A%E1%9E%96%E1%9E%B7%E1%9E%9F%E1%9F%84%E1%9E%92%E1%9E%93%E1%9F%8D%E1%9E%9C%E1%9F%81%E1%9E%87%E1%9F%92%E1%9E%87%E1%9E%9F%E1%9E%B6%E1%9E%9F%E1%9F%92%E1%9E%8A%E1%9F%92%E1%9E%9A-%E1%9E%A2%E1%9F%83%E1%9E%A0%E1%9F%92%E1%9E%9F%E1%9F%8A%E1%9E%BC-100064878364765%2F&tabs=timeline&width=600&height=250&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false"
    src={item.facebookLink}
    width="100%"
    height="250px"
    frameBorder="0"
    style={{ border: 'none', overflow: 'hidden' }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
  />
  <Divider />
</div>

        </Col>

            ))}

        
      </Row>
      <Divider />
     {/* <h4 style={{color:"#343293"}}>© ២០២៥, រក្សាសិទ្ធិគ្រប់យ៉ាងដោយមន្ទីរពិសោធន៍វេជ្ជសាស្រ្ត អៃហ៊្សូ</h4>  */}
       {list.map((item, index) => (
      <h4 key={index} style={{color:"#343293"}}>{item.copyRight}</h4> 
         ))}
    </div>
  );
};

export default FooterPageView;

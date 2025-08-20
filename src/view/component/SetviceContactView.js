
import React,{useState,useEffect} from 'react'
import { Config } from "../../config/helper";
import { request } from "../../config/request";
import { Card, message, Row, Col, Spin } from 'antd';

const containerStyle = {
  padding: '20px',
  margin: '0 auto',
  maxWidth: '1200px',
  backgroundColor: 'white',
  marginTop: '-25px',
};

const boxStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  border: '1px solid #ddd',
  borderRadius: '12px',
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
};

// const leftStyle = {
//   flex: '1 1 50%',
//   minWidth: '300px',
//   paddingRight: '5px',
// };


const leftStyle = {
  flex: '1 1 50%',
  minWidth: '300px',
 // height: '880px', // ensure same height
  display: 'flex',
  alignItems: 'center',
  
  justifyContent: 'center',
  padding: '10px',
};

const rightStyle = {
  flex: '1 1 50%',
  minWidth: '300px',
  paddingLeft: '10px',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '3px',
};

// const imageStyle = {
//   maxWidth: '100%',
//   maxHeight: '100%',
//   objectFit: 'container',
//   borderRadius: '3px',
// };


const iframeStyle = {
  width: '100%',
  height: '880px',
  border: 'none',
  borderRadius: '8px',
};

const SetviceContactView = () => {
  const [list,setList] = useState([])
  const[laodig,setLoading] = useState([])

 useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);

    try {
      const res = await request("servicepartcontact/getList", "get");
      if (res && res.list && res.list.length > 0) {
        setList(res.list); // Set all items in the list
      }
    } catch (error) {
      message.error("Failed to fetch the list");
    } finally {
      setLoading(false);
    }
  };





  return (
    <div style={containerStyle}>
      {list.map((item, index) => (
        <div>


          
      <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{item.title}</h3>
         <p style={{ marginBottom: '20px' }} dangerouslySetInnerHTML={{ __html: item.description }} />

        </div>
          ))}  



      <div style={boxStyle}>
    
                  
           <div style={leftStyle} >
    
            {list.map((item, index) => (
              <div key={index}>
               <img
                /// src="https://aisolabkh.com/wp-content/uploads/2025/06/Blue-and-White-Modern-Lab-Testing-Services-Banner.png"
               
                src={Config.image_path + item.image}
                alt="Contact"
                style={imageStyle}
          />
            </div>  
            ))}         
        </div>
        <div style={rightStyle}>  
          {list.map((item, index) => (
            
              <iframe
              src={item.link}
              style={iframeStyle}
              title="Google Contact Form"
          >
            Loading…
          </iframe>

           ))}
          
        </div>
      
      </div>
    </div>
  );
};

export default SetviceContactView;

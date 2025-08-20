import React from 'react'
import BlogPageView from './BlogPageView';
import { ColorFormat } from 'antd/es/color-picker/interface';
import { Card, message, Row, Col, Spin, Button ,Typography,Divider} from 'antd';

const containerStyle = {
  padding: '20px',
  margin: '0 auto',
  maxWidth: '1200px',
  backgroundColor: 'white',
  marginTop: '-25px',
};

const fontcolor ={
  color:'#2d408b',
  maxWidth: '1283px',
  marginLeft:'43px'
}


const ServicePackegeLaborView = () => {
  return (
    <div style={containerStyle}>
      <br></br>
       <h3 style={fontcolor}>កញ្ជប់សេវាកម្ម</h3>
         <Divider />
       <br/>
       
       <BlogPageView/>
       <p>
        
       </p>
    </div>
  )
}

export default ServicePackegeLaborView

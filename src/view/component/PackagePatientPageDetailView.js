import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Config } from "../../config/helper";
import { request } from "../../config/request";
import { Card, message, Spin, Image, Divider,Col ,Row,Typography} from 'antd';
import ErrorFoundPageView from "./ErrorFoundPageView";
// import PartnerPageView from "./PartnerPageView";

const { Meta } = Card;

const containerStyle = {
  padding: '20px',
  margin: '0 auto',
  maxWidth: '1200px',
  backgroundColor: 'white',
  marginTop: '-25px',
};

const PackagePatientPageDetailView = () => {
  const [list, setList] = useState([]);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    getOne();
  }, [id]);

  const { Paragraph, Text } = Typography;

  const imgContainerStyle = {
    display: 'flex',
    justifyContent: 'center', // Center the image horizontally
    alignItems: 'center',     // Optional: Center vertically if needed
    marginTop: '20px',
  };
  
  const imgStyle = {
    display: 'block',
    width: "60%",
    maxWidth: "100%", // Ensure it remains responsive
    height: "auto",   // Maintain aspect ratio
    marginBottom: '20px', // Add margin-bottom to the image
  };
  const is  ={
    textAlign: 'justify',       
    textJustify: 'inter-word',
    borderRadius: '8px',
    padding: '30px',
    marginTop: '-60px' 
   
  }
  

const cardStyle = {
  width: "100%",
  marginBottom: "20px",
};
  const getOne = async () => {
    setLoading(true);
    try {
      const res = await request(`servicePackage/getone`, "post", { id });
      if (res && res.data) {
        setBlog(res.data);
        setTimeout(() => {
          contentRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        message.error("Partner post not found");
      }
    } catch (error) {
      message.error("Failed to fetch the blog post");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <Spin spinning={loading} />
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={containerStyle}>
        <ErrorFoundPageView />
      </div>
    );
  }

  return (
    <div style={containerStyle} ref={contentRef}>  
      <Spin spinning={loading} tip="ប្រព័ន្ធកំពុងដំណើរការ... សូមរងចាំ">

        <Row gutter={[12, 12]}>
          <Col xs={24} md={17}>
          </Col>

        </Row>
        <Row gutter={[2, 2]}>
                <Col xs={24} md={17}>
                <h2 style={{color:"#2c4089"}}>{blog.Title}</h2>
          
                    <Divider />
               
                        <Card
             
                            hoverable
                            style={cardStyle}
                            bodyStyle={{
                                padding: 0,
                                overflow: 'hidden',
                            }}
                        >
                           
                              <Row gutter={[5, 5]} align="middle">
                                                            <Col xs={24} md={24}>
                                                                <div style={{ padding: 32 }}>
                                                                                    <Paragraph>
                                                                                    {/* <h4 style={{
                                                          color:"#2c4089",
                                                          // textAlign: 'justify',       
                                                          textJustify: 'inter-word',
                                                        
                                                          }}>{blog.title}</h4> */}
                                                          {/* <Divider></Divider> */}
                                                          <h4 style={{
                                                          color:"#2c4089",
                                                          // textAlign: 'justify',       
                                                          textJustify: 'inter-word',
                                                        
                                                          }}>{blog.title}</h4>
                            
                                                                                    <p 
                                                      style={{ 
                                                        marginTop: '-10px', 
                                                        // textAlign: 'justify', 
                                                        textJustify: 'inter-word' ,
                                                        color:"#343293",
                                                      }} 
                                                      dangerouslySetInnerHTML={{ __html: blog.Description }} 
                                      />
                                             
                                                                        {/* {item.description} */}
                                                                    </Paragraph>
                                                                  
                                                                </div>
                                                            </Col>
                                                            <Col xs={24} md={24}>
                                                             
                                                            <div style={is}>
                                                               
                                                                <div>
                                                                <img
                                                                    alt="history of TSNH"
                                                                    src={Config.image_path + blog.Image}
                                                                   
                                                                />
                                                                </div>
                                                                </div>
                                                            </Col>
                              </Row>
                        </Card>
                 
                </Col>
               
        </Row>
      </Spin>   
    </div>
  );
}

export default PackagePatientPageDetailView;

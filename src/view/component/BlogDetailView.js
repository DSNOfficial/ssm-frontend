import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Config } from "../../config/helper";
import { request } from "../../config/request";
import { Card, message, Spin, Divider, Col, Row, Typography,Image } from 'antd';
import ErrorFoundPageView from "./ErrorFoundPageView";

const { Title, Text } = Typography;

const containerStyle = {
  padding: '20px',
  margin: '0 auto',
  maxWidth: '1200px',
  backgroundColor: 'white',
  borderRadius: '12px',
};

const BlogDetailView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    getOne();
  }, [id]);

  const getOne = async () => {
    setLoading(true);
    try {
      const res = await request(`servicecontact/getone`, "post", { id });
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
      <Spin spinning={loading} style={{ color: "#343293" }} tip="ប្រព័ន្ធកំពុងដំណើរការ... សូមរងចាំ">
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Card
              style={{ width: "100%", border: "none", boxShadow: "none" }}
              bodyStyle={{ padding: 0 }}
            >
              <Row gutter={0}>
                {/* Full width image */}
                <Col xs={24}>
                  {/* <img
                    alt="Doctor with patient"
                    src={Config.image_path + blog.Image}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "20px"
                    }}
                  /> */}
                    <Image
                    alt="រូបភាព Blog"
                    src={`${Config.image_path}${blog.image}`}
                    fallback="/fallback.jpg"
                    width="100%"
                    height={400}
                    style={{ objectFit: "cover", borderRadius: "12px" }}
                  />
                </Col>

                {/* Text block under image */}
                <Col xs={24} style={{ padding: "0 30px 30px 30px" }}>
                  <Title level={4} style={{
                    color: "#2c4089",
                    fontWeight: 'bold',
                    fontFamily: "'Khmer OS Siemreap', 'Noto Sans Khmer', sans-serif"
                  }}>
                    {blog.title} | Mental Health Clinic
                  </Title>

                  <Divider />

                  <div
                    style={{
                      color: "#343293",
                      fontFamily: "'Khmer OS Siemreap', 'Noto Sans Khmer', sans-serif",
                      textAlign: "justify",
                      textJustify: "inter-word",
                      fontSize: "16px",
                      lineHeight: "2"
                    }}
                    dangerouslySetInnerHTML={{ __html: blog.Content }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default BlogDetailView;

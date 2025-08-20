import React from "react";
import { Row, Col, Typography, List, Button, Image, Space, Divider, Card } from "antd";
import {
  PhoneOutlined,
  GlobalOutlined,
  MailOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const containerStyle = {
  padding: '20px',
  margin: '0 auto',
  maxWidth: '1283px',
  backgroundColor: 'white',
  marginTop: '-25px',
};

const { Title, Text, Paragraph } = Typography;

// ✅ Khmer Services List
const services = [
  "ឈាម លាយគ្នា ក្រុមឈាម",
  "ផ្តិតមេរោគ ឆ្កេង ឬ និស្ស័យ",
  "ពិសោធន៍លើកាមរោគ",
  "ការធ្វើតេស្ត អញ្ញាញញឺត",
  "មើលមេរោគ និង មេរោគផ្សេងៗ",
  "មានតេស្តកំណត់ប្រភេទមនុស្ស",
];

const ServiceLaborView = () => {
  return (
    <div style={containerStyle}>
        <Row gutter={[32, 32]}>
          {/* Title */}
          <Col span={24} style={{ textAlign: "center" }}>
            <Title
              level={3}
              style={{
                color: "#3f51b5",
                fontFamily: "'Khmer OS Siemreap', 'Noto Sans Khmer', sans-serif",
                marginBottom: 8,
              }}
            >
              មន្ទីរពិសោធន៍វេជ្ជសាស្ត្រអៃហ្ស៊ូ
            </Title>
            <Title level={4} style={{ color: "#3f51b5", marginTop: 0 }}>
              AISO MEDICAL LABORATORY
            </Title>
            <Divider />
          </Col>

          {/* Subtitle + List */}
          <Col span={24}>
            <Title
              level={5}
              style={{
                color: "#2e3b98",
                fontFamily: "'Khmer OS Siemreap', 'Noto Sans Khmer', sans-serif",
                marginBottom: 12,
              }}
            >
              សេវាមន្ទីរពិសោធន៍ (LABORATORY SERVICES)
            </Title>
            <Paragraph strong>
              ផ្នែកសេវាដែលមាននៅមន្ទីរពិសោធន៍របស់យើងរួមមាន៖
            </Paragraph>
            <div style={{ fontFamily: "'Khmer OS Siemreap', 'Noto Sans Khmer', sans-serif" }}>
  <List
    dataSource={services}
    renderItem={(item) => (
      <List.Item>
        <CheckOutlined style={{ color: "#1890ff", marginRight: 8 }} />
        {item}
      </List.Item>
    )}
  />
</div>


            {/* <List
              dataSource={services}
              grid={{ gutter: 16, column: 1 }}
              renderItem={(item) => (
                <div style={{fontFamily: "'Khmer OS Siemreap', 'Noto Sans Khmer', sans-serif"}}>
                    <List.Item>
                  <Text>
                    <CheckOutlined style={{ color: "#1890ff", marginRight: 8 }} />
                    {item}
                  </Text>
                </List.Item>

                </div>
                
              )}
            /> */}
          </Col>

          {/* Two Images */}
          <Col xs={24} md={12}>
            <Image
              src="https://aisolabkh.com/wp-content/uploads/2025/06/Blue-and-White-Modern-Lab-Testing-Services-Banner.png"
              alt="Lab Services"
              width="100%"
              style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Image
              src="https://aisolabkh.com/wp-content/uploads/2025/06/Blue-and-White-Modern-Lab-Testing-Services-Banner.png"
              alt="Technicians"
              width="100%"
              style={{ borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            />
          </Col>

          {/* Contact Buttons */}
          <Col span={24} style={{ textAlign: "center", marginTop: 24 }}>
            <Space size="large" wrap>
              <Button
                type="primary"
                size="large"
                shape="round"
                icon={<GlobalOutlined />}
                href="https://www.aisolabkh.com"
                target="_blank"
              >
                Visit Website
              </Button>
              <Button
                size="large"
                shape="round"
                icon={<PhoneOutlined />}
              >
                +855 98 405 404
              </Button>
              <Button
                size="large"
                shape="round"
                icon={<MailOutlined />}
              >
                +855 98 405 404
              </Button>
            </Space>
          </Col>
        </Row>
     
    
    </div>
    
  );
};

export default ServiceLaborView;

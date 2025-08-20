import React, { useEffect, useState } from "react";

import { Typography, Row, Col, Divider, Card } from "antd";

const { Title, Paragraph } = Typography;

const ServiceProviceView = () => {
  return (
    <div
      style={{
        padding: "50px 20px",
        maxWidth: 1000,
        margin: "auto",
        fontFamily: "'Khmer OS Siemreap', 'Noto Sans Khmer', sans-serif",
        lineHeight: 1.8,
        backgroundColor: "#fdfdfd",
      }}
    >
      <Title level={1} style={{ textAlign: "center",fontFamily: "'Khmer OS Siemreap', 'Noto Sans Khmer', sans-serif", fontWeight: "bold", fontSize: "2.5rem" }}>
        ឯកភាពផ្នែកស្រាវជ្រាវផ្នែក សេវាបច្ចេកទេសវិទ្យាសាស្ត្រ
      </Title>

      <Title level={3} style={{ textAlign: "center",fontFamily: "'Khmer OS Siemreap', 'Noto Sans Khmer', sans-serif", color: "#1a3fb0", marginTop: 30 }}>
        សេវាកម្មផ្នែកសោតវិជ្ជា ឯកភាពសោតវិជ្ជា
      </Title>

      <Paragraph style={{ color: "#1a3fb0",fontFamily: "'Khmer OS Siemreap', 'Noto Sans Khmer', sans-serif", textAlign: "center", fontSize: "1.1rem", marginTop: 30 }}>
        សេវាកម្មផ្នែកសោតវិជ្ជាសម្រាប់ជំងឺលំបាក និងបំពេញតាមការបញ្ជូនរបស់វេជ្ជបណ្ឌិត
        ដែលបានអនុញ្ញាតអោយធ្វើតេស្តនានាដូចខាងក្រោម ៖
      </Paragraph>

      <Row gutter={[24, 16]} justify="center" style={{ marginTop: 20 }}>
        <Col xs={24} sm={12}>
          <Card bordered={false} style={{ backgroundColor: "#fafafa" }}>
            <ul style={{ color: "#1a3fb0", fontSize: "16px", paddingLeft: "20px" }}>
              <li>ការធ្វើតេស្តឈាម (Blood Tests)</li>
              <li>ការធ្វើតេស្តទឹកនោម (Urine Tests)</li>
              <li>ការធ្វើតេស្តអាហារ (Stool Tests)</li>
              <li>ការធ្វើតេស្តសំណាកនានា</li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} sm={12}>
          <Card bordered={false} style={{ backgroundColor: "#fafafa" }}>
            <ul style={{ color: "#1a3fb0", fontSize: "16px", paddingLeft: "20px" }}>
              <li>ការវិភាគមេរោគ (Microbiology Analysis)</li>
              <li>ការវិភាគឈាម (Hematology Analysis)</li>
              <li>ការវិភាគគីមី (Biochemistry Analysis)</li>
            </ul>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Paragraph style={{ color: "#1a3fb0",fontFamily: "'Khmer OS Siemreap', 'Noto Sans Khmer', sans-serif", textAlign: "center", fontSize: "1.1rem" }}>
        យើងមានបច្ចេកវិទ្យាថ្មីៗ និងបុគ្គលិកមានបទពិសោធន៍ខ្ពស់ក្នុងការធ្វើតេស្តនិងផ្តល់សេវាកម្មស្រួលរហ័ស។
      </Paragraph>
    </div>
  );
};

export default ServiceProviceView;

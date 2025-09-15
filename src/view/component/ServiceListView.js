import React, { useState, useEffect } from "react";
import { Config } from "../../config/helper";
import { request } from "../../config/request";
import { Card, message, Typography, Divider, Spin } from "antd";

const { Title, Paragraph, Text } = Typography;


const ServiceListView = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);

    try {
      const res = await request("servicelistpackagelabor/getList", "get");
      if (res && res.list && res.list.length > 0) {
        setList(res.list);
      }
    } catch (error) {
      message.error("Failed to fetch the list");
    } finally {
      setLoading(false);
    }
  };

  const fontKhmer = {
  fontFamily: 'KhmerOSSiemReap',
  color: "#343293"
};
const containerStyle = {
  padding: '20px',
  margin: '0 auto',
  maxWidth: '1283px',
  backgroundColor: 'white',
  marginTop: '-25px',
};

  return (
    <div style={containerStyle}>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      ) : (
        list.map((item, index) => (
          <Card
            key={index}
            style={{
              marginBottom: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
            bodyStyle={{ padding: "30px" }}
          >
          
            <div style={fontKhmer}>

         
            <Title
              level={2}
              style={{ fontWeight: "bold", fontFamily: 'KhmerOSSiemReap', textAlign: "center", marginBottom: 10 }}
            >
              {item.title}
            </Title>

            <Title
              level={4}
              style={{
                 fontFamily: 'KhmerOSSiemReap',
                color: "#1a33d1",
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              {item.description}
            </Title>

            <Divider />

            <p style={{ marginBottom: '20px' }} dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default ServiceListView;

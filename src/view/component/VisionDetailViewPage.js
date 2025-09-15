import React, { useEffect, useState } from "react";
import { Config } from "../../config/helper";
import { request } from "../../config/request";
import { Card, message, Row, Col, Spin, Typography ,Image} from "antd";
import { NavLink } from "react-router-dom";
import { CheckCircleOutlined, PhoneOutlined, GlobalOutlined } from "@ant-design/icons";
import "./BlogPageView.css"; // Custom styles

const { Title, Paragraph } = Typography;

const VisionDetailViewPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    try {
      const res = await request("about-labor/getList", "get");
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
    <div className="service-container">
      <Spin spinning={loading} tip="ប្រព័ន្ធកំពុងដំណើរការ... សូមរងចាំ">
        <Row gutter={[32, 32]} align="middle">
          {/* LEFT SIDE - Text and Services */}
           {/* {list.map((item, index) => (
            <Title level={3} style={{ color: "#1a237e" }}>              
              {item.Title}
            </Title>
            ))} */}

            <Card
              bordered={true}
              style={{ background: "transparent", boxShadow: "none" }}
                        >
             {list.map((item, index) => (
              <div key={index} className="service-item">
                          <Image
                  src={Config.image_path + item.image}
                   preview={false}/>
                <Typography>
                   <div
                    style={{
                        fontSize: "16px",
                        lineHeight: 1.8,
                        color: "#1a237e",
                        textAlign: "justify",
                        textJustify: "inter-word",
                    }}
                    dangerouslySetInnerHTML={{ __html: item.Description }}
                    />
                </Typography>
              </div>
            ))}

                        </Card>
           
        </Row>
      </Spin>
    </div>
  );
};

export default VisionDetailViewPage;

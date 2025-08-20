import React, { useEffect, useState } from "react";
import { Row, Col, Card, message } from "antd";
import { request } from "../../config/request";
import { Config } from "../../config/helper";
import { NavLink } from "react-router-dom";
import "./InstructurePageView.css";

const InstructurePageView = () => {
  const [leaderList, setLeaderList] = useState([]);
  const [leaderListFive, setLeaderListFive] = useState([]);
  const [leaderListThree, setLeaderListThree] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeaderData();
  }, []);

  const fetchLeaderData = async () => {
    setLoading(true);
    try {
      const res = await request("leader/getList", "get");
      if (res?.list?.length > 0) {
        setLeaderList(res.list.slice(0, 1));
        setLeaderListFive(res.list.slice(1, res.list.length - 3));
        setLeaderListThree(res.list.slice(-3));
      }
    } catch (error) {
      message.error("Failed to fetch the leader list");
    } finally {
      setLoading(false);
    }
  };

  const renderLeaderCards = (list) =>
    list.map((item, index) => (
      <Col key={index} xs={24} sm={12} md={8} lg={5}>
        <NavLink>
          <Card
            hoverable
            className="leader-card"
            cover={
              <div className="image-container">
                <img
                  className="hover-image"
                  alt={item.title || item.Name}
                  src={Config.image_path + item.Image}
                />
              </div>
            }
          >
            <h3 className="KhmerOSSiemReap">{item.title || item.Name}</h3>
            <p className="KhmerOSSiemReap">{item.description}</p>
          </Card>
        </NavLink>
      </Col>
    ));

  return (
    <div className="instructure-container">
      <h1 className="KhmerOSSiemReap title">ថ្នាក់ដឹកនាំ</h1>

      <Row justify="center" gutter={[16, 16]} className="pyramid-row">
        {renderLeaderCards(leaderList)}
      </Row>

      <Row justify="center" gutter={[16, 16]} className="pyramid-row">
        {renderLeaderCards(leaderListFive)}
      </Row>

      <Row justify="center" gutter={[16, 16]} className="pyramid-row">
        {renderLeaderCards(leaderListThree)}
      </Row>
    </div>
  );
};

export default InstructurePageView;

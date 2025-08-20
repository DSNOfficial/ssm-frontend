import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Config } from "../../config/helper";
import { request } from "../../config/request";
import {
  Card,
  Row,
  Col,
  message,
  Spin,
  Image,
  Typography,
  Divider,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/km";
import ErrorFoundPageView from "./ErrorFoundPageView";
import FadeInWhenVisible from "./FadeInWhenVisible";

dayjs.locale("km");
const { Title, Paragraph } = Typography;

const containerStyle = {
  padding: "40px 20px",
  margin: "0 auto",
  maxWidth: "1000px",
  backgroundColor: "#fff",
};

const descriptionStyle = {
  textAlign: "justify",
  textJustify: "inter-word",
  lineHeight: "1.8",
  color: "rgb(26, 35, 126)",
};

const convertToKhmerNumber = (number) => {
  const khmerNumbers = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
  return number
    .toString()
    .split("")
    .map((digit) => (/\d/.test(digit) ? khmerNumbers[digit] : digit))
    .join("");
};

const formatKhmerDate = (dateString) => {
  const date = dayjs(dateString);
  const day = convertToKhmerNumber(date.date());
  const month = date.month();
  const year = convertToKhmerNumber(date.year());

  const khmerMonths = [
    "មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា",
    "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ",
  ];

  return `ថ្ងៃ​ទី ${day} ខែ ${khmerMonths[month]} ឆ្នាំ ${year}`;
};

const BlogDetailView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [imageOptional, setImageOptional] = useState([]);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    getOne();
  }, [id]);

  const getOne = async () => {
    setLoading(true);
    try {
      const res = await request("alldepart/getone", "post", { id });
      if (res?.data) {
        setBlog(res.data);
        fetchImages(res.data.id);
        requestAnimationFrame(() => {
          contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      } else {
        message.error("Blog post not found");
      }
    } catch (error) {
      message.error("Failed to fetch the blog post");
    } finally {
      setLoading(false);
    }
  };

  const fetchImages = async (trainingId) => {
    const res_image = await request("tbtdepartsecond_image/" + trainingId, "get");
    if (res_image?.list) {
      const optionalImages = res_image.list.map((img, idx) => ({
        uid: idx,
        name: img.image,
        status: "done",
        url: Config.image_path + img.image,
      }));
      setImageOptional(optionalImages);
    } else {
      setImageOptional([]);
    }
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <Spin spinning tip="កំពុងទាញយកទិន្នន័យ..." />
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

  const hasMultipleImages = imageOptional.length > 0;

  return (
    <div style={containerStyle} ref={contentRef}>
      <FadeInWhenVisible delay={0.4}>
        <Card bordered={false} style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Row gutter={[16, 16]}>
            {blog.image && !hasMultipleImages && (
              <Col span={24}>
                <Image
                  alt="រូបភាព Blog"
                  src={`${Config.image_path}${blog.image}`}
                  fallback="/fallback.jpg"
                  width="100%"
                  height={400}
                  style={{ objectFit: "cover", borderRadius: "12px" }}
                />
              </Col>
            )}

            {blog.image && hasMultipleImages && (
              <>
                <Col xs={24} md={16}>
                  <Image
                    alt="រូបភាព Blog"
                    src={`${Config.image_path}${blog.image}`}
                    fallback="/fallback.jpg"
                    width="100%"
                    height={400}
                    style={{ objectFit: "cover", borderRadius: "12px" }}
                  />
                </Col>

                <Col xs={24} md={8}>
                  <Image.PreviewGroup>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {imageOptional.map((file, index) => (
                        <Image
                          key={index}
                          src={file.url}
                          alt={`រូបភាពទី ${index + 1}`}
                          width="100%"
                          height={120}
                          style={{
                            borderRadius: "8px",
                            objectFit: "cover",
                            transition: "0.3s",
                          }}
                        />
                      ))}
                    </div>
                  </Image.PreviewGroup>
                </Col>
              </>
            )}
          </Row>

          <Title
            level={3}
            style={{
              color: "#1a237e",
              fontFamily: "'Siemreap', 'Khmer OS', sans-serif",
              marginTop: 24,
            }}
          >
            {blog.title} |  {blog.etitle}
          </Title>

          <time
            dateTime={blog.createdAt}
            style={{ color: "rgb(26, 35, 126)", display: "flex", alignItems: "center", gap: 8 }}
          >
            {/* <CalendarOutlined /> {blog.createdAt ? formatKhmerDate(blog.createdAt) : ""} */}
          </time>
          

          <Paragraph style={descriptionStyle}>
            <span dangerouslySetInnerHTML={{ __html: blog.description }} />
          </Paragraph>
        </Card>
      </FadeInWhenVisible>
    </div>
  );
};

export default BlogDetailView;

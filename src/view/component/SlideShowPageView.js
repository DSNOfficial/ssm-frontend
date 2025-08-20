import React, { useRef,useState,useEffect } from 'react';
import { Carousel, Button,message,Image,Space,Table } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './slideshow.css';
import { Config, isEmptyOrNull } from "../../config/helper";
import { request } from "../../config/request";

const SlideShowPageView = () => {
  const carouselRef = useRef(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [formCat] = Form.useForm();

  useEffect(() => {
    
    getList();
}, []);

  const getList = async () => {
    setLoading(true);
  
    try {
        const res = await request("showImage/getList", "get");
        if (res) {
            setList(res.list);
         
        }
    } catch (error) {
        message.error("Failed to fetch the list");
    } finally {
        setLoading(false);
    }
};

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <div className="slideshow-wrapper">
    
      <Carousel 
        autoplay 
        dotPosition="bottom" 
        autoplaySpeed={60000}  // Slow down the time each slide is displayed
        speed={2000}          // Slow down the transition speed between slides
        ref={carouselRef}
      >
        {list.map((item, index) => (
          <div key={index} className="slide">
            <img
                   src={`${Config.image_path+item.Image}`}
              alt={`Slide ${index}`}
              className="slide-image"
            />
          </div>
        ))}
      </Carousel>
      <Button
        shape="circle"
        icon={<LeftOutlined />}
        onClick={handlePrev}
        className="carousel-control prev"
      />
      <Button
        shape="circle"
        icon={<RightOutlined />}
        onClick={handleNext}
        className="carousel-control next"
      />
    </div>
  );
};

export default SlideShowPageView;

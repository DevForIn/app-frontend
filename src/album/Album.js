import React, { useEffect, useState } from "react";
import axios from "axios";
import './Album.css';

const Album = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 서버에서 이미지 목록을 가져오는 API 호출
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/images');
        setImages(response.data);  // 이미지 목록 저장
      } catch (error) {
        console.error("이미지 목록을 불러오는 데 오류가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="album-container">
      <h1>Roo 앨범</h1>
      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <div className="image-gallery">
          {images.map((image, index) => (
            <div key={index} className="image-item">
              <img
                src={`http://localhost:5000/images/${image}`}
                alt={`Image ${index}`}
                className="image"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Album;

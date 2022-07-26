import React, { useState } from "react";
import "./Workregister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Workregister() {
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Size, setSize] = useState("");
  const [Genre, setGenre] = useState("");
  const [Image, setImage] = useState("");
  const [Desc, setDesc] = useState("");
  const [Price, setPrice] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onSizeHandler = (event) => {
    setSize(event.currentTarget.value);
  };
  const onGenreHandler = (event) => {
    setGenre(event.currentTarget.value);
  };
  const onImageHandler = (event) => {
    setImage(event.currentTarget.value);
  };
  const onDescHandler = (event) => {
    setDesc(event.currentTarget.value);
  };
  const onPriceHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const onSubmitHandler = () => {
    if (
      Name.length === 0 ||
      Size.length === 0 ||
      Genre.length === 0 ||
      Image.length === 0 ||
      Desc.length === 0 ||
      Price.length === 0
    ) {
      alert("정보를 모두 입력해 주세요.");
      return;
      //return이 있어야 작품등록으로 더이상 진행 안됨.
      //없으면 alert띄우고 작품등록 진행돼버림.
    }

    let body = {
      art_name: Name,
      art_size: Size,
      art_genre: Genre,
      art_image: Image,
      art_desc: Desc,
      art_price: Price,
    };

    axios
      .request({
        method: "POST",
        url: "https://localhost:4000/api/art/insertArt",
        data: body,
        withCredentials: true,
      })
      .then((res) => {
        navigate("/mypage1");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="workregister">
      <div className="register_ment">
        빠르게 작품을 등록하고 구매자를 찾아보세요
      </div>
      <div className="workregister_container">
        <div className="work_about">
          <ul>
            <li>
              작품명
              <input type="text" value={Name} onChange={onNameHandler} />
            </li>
            <li>
              작품 크기
              <input type="text" value={Size} onChange={onSizeHandler} />
            </li>
            <li>
              <form>
                <label>
                  작품 분야 , 장르
                  <select
                    name="genre"
                    type="text"
                    value={Genre}
                    onChange={onGenreHandler}
                  >
                    <option value="0">분야를 선택하세요</option>
                    <option value="동양화">동양화</option>
                    <option value="서양화">서양화</option>
                    <option value="추상화">추상화</option>
                    <option value="기타">기타</option>
                  </select>
                </label>
              </form>
            </li>
            <li>
              작품 사진{" "}
              <textarea
                placeholder="작품사진의 주소를 입력하세요"
                rows="3"
                cols="35"
                type="text"
                // accept="image/*"
                value={Image}
                onChange={onImageHandler}
              />
            </li>
            <li>
              작품 설명
              <textarea
                placeholder="작품에 대한 설명을 입력하세요"
                rows="4"
                cols="35"
                type="text"
                value={Desc}
                onChange={onDescHandler}
              />
            </li>
          </ul>
        </div>
        <div className="hope_price">
          희망 판매 금액
          <div className="hope_price_input">
            <input
              type="number"
              step="10000"
              value={Price}
              onChange={onPriceHandler}
            />
            원
          </div>
          <div className="register_button">
            <button type="submit" onClick={onSubmitHandler}>
              작품 등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Workregister;

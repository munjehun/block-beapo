import React, { useState } from "react";
import "./Workregister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SendImgIPFS from "../functions/SendImgIPFS";

function Workregister() {
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Size, setSize] = useState("");
  const [Genre, setGenre] = useState("");
  const [Image, setImage] = useState("");
  const [Desc, setDesc] = useState("");
  const [Price, setPrice] = useState("");
  const [preview, setPreview] = useState("");

  const onSubmitHandler = async () => {
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

    const imageUrl = await SendImgIPFS(Image);

    let body = {
      art_name: Name,
      art_size: Size,
      art_genre: Genre,
      art_image: imageUrl,
      art_desc: Desc,
      art_price: Price,
    };

    axios
      .request({
        method: "POST",
        url: "https://block-in-art.herokuapp.com/api/art/insertArt",
        data: body,
        withCredentials: true,
      })
      .then((res) => {
        alert("작품이 등록되었습니다.");
        navigate("/mypage1");
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message == "Request failed with status code 401") {
          alert("로그인을 다시 해주세요.");
        }
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
              <input
                type="text"
                value={Name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </li>
            <li>
              작품 크기
              <input
                placeholder="ex) 20*20cm"
                type="text"
                value={Size}
                onChange={(e) => setSize(e.currentTarget.value)}
              />
            </li>
            <li>
              <form>
                <label>
                  작품 분야 , 장르
                  <select
                    name="genre"
                    type="text"
                    value={Genre}
                    onChange={(e) => setGenre(e.currentTarget.value)}
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
              작품 사진
              {/* <textarea
                placeholder="작품사진의 주소를 입력하세요"
                rows="3"
                cols="35"
                type="text"
                // accept="image/*"
                value={Image}
                onChange={onImageHandler}
              /> */}
              <input
                type="file"
                className="file"
                onChange={(e) => {
                  // 미리보기를 만들어주는 함수, 내장모듈인 FileReader를 사용했다.
                  if (!e.currentTarget.files[0]) return;
                  // input type data에서 받아온 파일이 담긴 위치이다. 이를 먼저 useState에 있는 image 변수에 담아준다.
                  setImage(e.currentTarget.files[0]);
                  // FileReader 모듈을 사용하기 위한 객체 선언
                  const reader = new FileReader();
                  // FileReader 모듈 함수 중 하나인 readAsDataURL을 실행하여 가져온 파일을 읽어준다.
                  reader.readAsDataURL(e.currentTarget.files[0]);
                  // onload는 비동기함수이다. 위에서 선언한 readAsDataURL이 끝나면 자동으로 실행된다.
                  reader.onload = () => {
                    // useState의 preview 변수에 읽은 파일을 담아주고, 이를 아래 div backgroundImage의 url로 삽입하여 화면에 렌더링해준다.
                    setPreview(reader.result);
                  };
                }}
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
                onChange={(e) => setDesc(e.currentTarget.value)}
              />
            </li>
            <li></li>
          </ul>
        </div>
        <div className="hope_price">
          희망 판매 금액
          <div className="hope_price_input">
            <input
              type="number"
              step="10000"
              value={Price}
              onChange={(e) => setPrice(e.currentTarget.value)}
            />
            원
          </div>
          <div
            className="preview"
            style={{ backgroundImage: `url(${preview})` }}
          >
            미리보기
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

export const initialState = {
  auth: false, //인증 안 됌
  user_id: undefined, // 유저이름 없음
  user_artistname: undefined, // 작가명 없음
};

export const authReducer = (state, action) => {
  // App.js의 authstate 상태를 변화시키는 리듀서
  switch (action.type) {
    //액션이 "LOGIN"일 때
    case "LOGIN":
      return (
        {
          ...state,
          auth: true, //인증 처리 해주고
          user_id: action.payload.user_id, // 유저이름은 액션으로 받아온 값으로
          user_artistname: action.payload.user_artistname, // 작가명도 액션으로 받아온 값으로
        },
        console.log("로그인 리듀서 실행", action)
      );

    //액션이 "LOGOUT"일 때
    case "LOGOUT":
      return {
        ...state,
        auth: false, //다시 인증 false 처리
        user_id: undefined, //유저이름도 없도록
        user_artistname: undefined, //작가명도 없도록
      };

    default:
      throw new Error("error"); //기본값이 에러 날리기?
  }
};

export const initialState_m = {
  messages: [],
};

export const messageReducer = (state, action) => {
  switch (action.type) {
    case "ENQUEUE_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "DEQUEUE_MESSAGE":
      return {
        ...state,
        messages: state.messages.slice(1),
      };
    default:
      return state;
  }
};

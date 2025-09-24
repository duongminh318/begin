// Import tất cả các hằng số action type từ file userActionTypes.js
import * as ActionType from "../constants/userActionTypes.js";

// Action creator cho login
// Nhận vào đối tượng user, trả về action có type LOGIN và payload là user
export const createLogin = (user) => {
  return { type: ActionType.LOGIN, payload: user };
};

// Action creator khi login thành công
// Nhận vào user (thường là dữ liệu từ API trả về), trả về action LOGIN_SUCCESS
export const createLoginSuccess = (user) => {
  return { type: ActionType.LOGIN_SUCCESS, payload: user };
};

// Action creator khi login thất bại
// Nhận vào error (thông báo hoặc object lỗi), trả về action LOGIN_FAILED
export const createLoginFailed = (error) => {
  return { type: ActionType.LOGIN_FAILED, payload: error };
};

// Action creator để logout
// Không cần payload vì chỉ đơn giản là yêu cầu logout
export const createLogout = () => {
  return { type: ActionType.LOGOUT };
};

// Action creator khi logout thành công
// Không cần payload, chỉ thông báo rằng logout đã xong
export const createLogoutSuccess = () => {
  return { type: ActionType.LOGOUT_SUCCESS };
};

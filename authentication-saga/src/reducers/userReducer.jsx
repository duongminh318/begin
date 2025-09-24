// Import tất cả các hằng số action type từ file userActionTypes
import * as ActionType from '../constants/userActionTypes';

// Khởi tạo state ban đầu của reducer
// - isLogin: true nếu trong localStorage có 'access_token', ngược lại false
const initialState = { 
  isLogin: localStorage.getItem('access_token') != null 
};

// Khai báo reducer userReducer
// - state: trạng thái hiện tại (mặc định là initialState)
// - action: đối tượng mô tả hành động (type + payload)
const userReducer = (state = initialState, action) => {
  switch (action.type) {

    // Nếu action là LOGIN_SUCCESS (đăng nhập thành công)
    case ActionType.LOGIN_SUCCESS:
      // Cập nhật state: isLogin = true
      return { isLogin: true };

    // Nếu action là LOGIN_FAILED (đăng nhập thất bại)
    case ActionType.LOGIN_FAILED:
      // Cập nhật state: isLogin = false và lưu error từ payload
      return { isLogin: false, error: action.payload };

    // Nếu action là LOGOUT_SUCCESS (đăng xuất thành công)
    case ActionType.LOGOUT_SUCCESS:
      // Cập nhật state: isLogin = false
      return { isLogin: false };

    // Trường hợp mặc định: không có action nào khớp
    default:
      // Giữ nguyên state cũ
      return state;
  }
}

// Xuất reducer để sử dụng trong store Redux
export default userReducer;

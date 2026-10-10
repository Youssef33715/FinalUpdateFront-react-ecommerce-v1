import {
  CREATE_NEW_USER,
  LOGIN_USER,
  GET_CURERNT_USER,
  FORGET_PASSWORD,
  VERIFY_PASSWORD,
  RESET_PASSWORD,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PASSWORD,
} from "../type";
import { useInsertData } from "../../hooks/useinsertData";
import  { useGetDataToken } from "../../hooks/useGetData";
import { useUpdateData } from "../../hooks/useUpdateData";

//Create new User
export const createNewUser = (data) => async (dispatch) => {
  try {
    //const res = await baseUrl.get("/api/v1/brands");
    const response = await useInsertData(`/api/v1/auth/signup`, data);
    dispatch({
      type: CREATE_NEW_USER,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: CREATE_NEW_USER,
      payload: e.response,
    });
  }
};
//Login User
export const loginUser = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/auth/login`, data);
    dispatch({
      type: LOGIN_USER,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: LOGIN_USER,
      payload: e.response,
    });
  }
};
//Login User
export const getLoggedUser = () => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/users/getMe`);
    dispatch({
      type: GET_CURERNT_USER,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_CURERNT_USER,
      payload: e.response,
    });
  }
};
//1-Forget password
export const forgetPassword = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/auth/forgotPassword`, data);
    dispatch({
      type: FORGET_PASSWORD,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: FORGET_PASSWORD,
      payload: e.response,
    });
  }
};
//2-Verify password
export const verifyPassword = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/auth/verifyResetCode`, data);
    dispatch({
      type: VERIFY_PASSWORD,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: VERIFY_PASSWORD,
      payload: e.response,
    });
  }
};
//2-Reset password
export const resetPassword = (data) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/auth/resetPassword`, data);
    dispatch({
      type: RESET_PASSWORD,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: RESET_PASSWORD,
      payload: e.response,
    });
  }
};
//2-update user data
export const updateUserProfileData = (body) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/users/updateMe`, body);
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: e.response,
    });
  }
};
//2-update user password
export const updateUserPassword = (body) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/users/changeMyPassword`, body);
    dispatch({
      type: UPDATE_USER_PASSWORD,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_USER_PASSWORD,
      payload: e.response,
    });
  }
};

// Admin Users management — NEW FILE.
// The backend already supports full user CRUD at /api/v1/users (admin/manager only),
// but the frontend previously had no redux action for it. This file follows the exact
// same pattern as the existing couponAction.js / brandAction.js files.
import {
  GET_ALL_USERS,
  GET_ONE_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_ERROR,
} from "../type";
import { useGetDataToken } from "../../hooks/useGetData";
import { useInsertDataWithImage } from "../../hooks/useinsertData";
import { useUpdateData } from "../../hooks/useUpdateData";
import useDeleteData from "../../hooks/useDeleteData";

// Get all users (real endpoint: GET /api/v1/users)
export const getAllUsers = (page, limit) => async (dispatch) => {
  try {
    const response = await useGetDataToken(
      `/api/v1/users?page=${page || 1}&limit=${limit || 10}`,
    );
    dispatch({
      type: GET_ALL_USERS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};

// Get one user (real endpoint: GET /api/v1/users/:id)
export const getOneUser = (id) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/users/${id}`);
    dispatch({
      type: GET_ONE_USER,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};

// Create user (real endpoint: POST /api/v1/users, multipart because profileImg is optional file)
export const createUser = (formData) => async (dispatch) => {
  try {
    const response = await useInsertDataWithImage(`/api/v1/users`, formData);
    dispatch({
      type: CREATE_USER,
      payload: response,
    });
    return response;
  } catch (e) {
    dispatch({
      type: CREATE_USER,
      payload: e.response,
    });
    // Re-thrown so callers (e.g. admin-users-hook.js) can tell a failed
    // request apart from a successful one — this thunk used to swallow the
    // error entirely, so a failed create still looked like a success to the UI.
    throw e;
  }
};

// Update user - name/email/phone/role (real endpoint: PUT /api/v1/users/:id).
// Sent as JSON (no image change) — same lightweight pattern already used by editCoupon.
export const updateUser = (id, body) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/users/${id}`, body);
    dispatch({
      type: UPDATE_USER,
      payload: response,
    });
    return response;
  } catch (e) {
    dispatch({
      type: UPDATE_USER,
      payload: e.response,
    });
    throw e;
  }
};

// Delete user (real endpoint: DELETE /api/v1/users/:id)
export const deleteUser = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/users/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: response,
    });
    return response;
  } catch (e) {
    dispatch({
      type: DELETE_USER,
      payload: e.response,
    });
    throw e;
  }
};

// Get users with search/filter query string (real endpoint: GET /api/v1/users?keyword=&role=&page=&limit=)
// keyword search works because the backend's generic getAll() factory searches
// the "name" field by default for any model that isn't "Products" — confirmed
// against apiFeatures.js. role is a plain schema field, filtered directly.
export const getAllUsersFiltered = (queryString) => async (dispatch) => {
  try {
    const response = await useGetDataToken(`/api/v1/users?${queryString}`);
    dispatch({
      type: GET_ALL_USERS,
      payload: response,
    });
  } catch (e) {
    dispatch({
      type: GET_ERROR,
      payload: "Error" + e,
    });
  }
};

import baseUrl from "../Api/baseURL";

const useDeleteData = async (url, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: params,
  };

  const res = await baseUrl.delete(url, config);
  return res.data;
};

export default useDeleteData;

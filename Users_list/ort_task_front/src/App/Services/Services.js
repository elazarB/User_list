import axios from "axios";


const apiGet = async (url, body) => {
  try {
    let { data } = await axios({
      method: "GET",
      url,
      data: body,
    });
    return data;
  } catch (err) {
    throw err;
  }
};
const apiPost = async (url, body) => {
  try {
    let { data } = await axios({
      method: "POST",
      url,
      data: body,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

const apiDelete = async (url, body) => {
  console.log(url);
  try {
    let { data } = await axios({
      method: "DELETE",
      url,
      data: body,
    });
    return data;
  } catch (err) {
    throw err;
  }
};
// import {toast} from "react-hot-toast";
// toast.success('Customer successfully added');

export { apiGet, apiPost, apiDelete };
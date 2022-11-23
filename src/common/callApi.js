import axios from "axios";
import qs from "qs";
import { CUSTOMILY_APP_API_URL, CUSTOMILY_SHOPIFY_API_URL } from "./constant";

export const callApi = async (url, method = "GET", query, body) => {
  try {
    const res = await axios({
      url,
      method,
      params: query,
      body,
    });
    return res.data;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

export const customilyAppApi = async (path, method, query, body) => {
  try {
    const result = await callApi(
      `${CUSTOMILY_APP_API_URL}/${path}`,
      method,
      query,
      body
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const customilyShApi = async (path, method, query, body) => {
  try {
    const result = await callApi(
      `${CUSTOMILY_SHOPIFY_API_URL}/${path}`,
      method,
      query,
      body
    );
    return result;
  } catch (error) {
    throw error;
  }
};

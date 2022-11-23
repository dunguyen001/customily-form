import { customilyShApi } from "../common/callApi";
import { SHOP_URL } from "../common/constant";

export const getProductFromSetting = async (productId) => {
  try {
    const result = await customilyShApi(
      `settings/unified/${productId}`,
      "GET",
      {
        shop: SHOP_URL,
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

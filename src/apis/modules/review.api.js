import publicClient from "../client/public.client.js";
import privateClient from "../client/private.client.js";
import { toast } from "react-toastify";


const endpoints = {
  create: "Comment/create",
  getcmtproduct:({id}) => `Comment/product-comment/${id}`
};

const reviewApi = {
  create: async ({ user_id,product_id,content,type,username }) => {
    try {
      console.log("info",user_id,product_id,content,type,username )
      const response = await publicClient.post(
        endpoints.create,
        { user_id,product_id,content,type,username}
      );
      return { response };
    } catch (err) {      console.log(err);
      return { err }; }
  },
  getcmtprodut: async ({ id }) => {
    try {
      const response = await publicClient.get(
        endpoints.getcmtproduct({id})
      );
      return { response };
    } catch (err) { 
      console.log(err);
      return { err }; }
  },
};

export default reviewApi;
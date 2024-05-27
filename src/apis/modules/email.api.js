import publicClient from "../client/public.client.js";

const emailEnpoint = {
  checkout: `Email`
};

const emailApi = {
  checkoutEmail: async ({
    to, subject, body
  }) => {
    try {
      const response = await publicClient.post(
        emailEnpoint.checkout, {
          to, subject, body
        });
      return { response };
    } catch (err) { return { err }; }
  }
};

export default emailApi;
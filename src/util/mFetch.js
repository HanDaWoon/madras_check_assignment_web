import returnFetch from "return-fetch";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const mFetch = returnFetch({
  baseUrl: apiUrl,
  interceptors: {
    request: async (args) => {
      return args;
    },

    response: async (response, requestArgs) => {
      return response;
    },
  },
});

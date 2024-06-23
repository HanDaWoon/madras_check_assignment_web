import returnFetch from "return-fetch";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const mFetch = returnFetch({
  baseUrl: apiUrl,
  interceptors: {
    request: async (args) => {
      console.log("********* before sending request *********");
      console.log(args);
      return args;
    },

    response: async (response, requestArgs) => {
      console.log("********* after receiving response *********");
      console.log(response);
      return response;
    },
  },
});

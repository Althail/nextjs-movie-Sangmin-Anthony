import { NextApiRequest, NextApiResponse } from "next";

export const HttpService = {
  return_http_status_code_and_data: (res, status, data) => {
    return res.status(status).json(data);
  },
};

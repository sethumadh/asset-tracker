import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let response = null;
  const { start, limit, sort, sort_dir, slug } = req.query;
  try {
    response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: {
          start,
          limit,
          sort,
          sort_dir,
          slug,
        },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.api_key,
        },
      }
    );
  } catch (ex) {
    response = null;
    // error
    console.log(ex);
    // reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(json);
    res.json(json);
  }
}

//https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest

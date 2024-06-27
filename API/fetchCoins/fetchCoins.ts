import axios from "axios";
import z, { number } from "zod";

export const fetchCoinsSchema = z.array(
  z.object({
    id: z.number(),
    total_supply: z.number(),
    cmc_rank: z.number(),
    name: z.string(),
    symbol: z.string(),
    quote: z.object({
      USD: z.object({
        price: z.number(),
        market_cap: z.number(),
        volume_change_24h: z.number(),
      }),
    }),
  })
);

export type FetchCoinsSchema = z.infer<typeof fetchCoinsSchema>;
export const fetchCoinDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  symbol: z.string(),
  quote: z.object({
    USD: z.object({
      price: z.number(),
      market_cap: z.number(),
      volume_change_24h: z.number(),
    }),
  }),
});
export type FetchCoinDetailSchema = z.infer<typeof fetchCoinDetailSchema>;
export const fetchCoins = {
  getAllCoins: {
    queryKey: "getAllCoins",
    schema: fetchCoinsSchema,
    query: async ({
      pageParam = 1,
      sort,
      sort_dir,
    }: {
      pageParam: number;
      sort: string;
      sort_dir: string;
    }) => {
      const limit = 25;
      const start = (pageParam - 1) * limit + 1;
      try {
        const response = await axios.get("api/proxy/proxy", {
          params: {
            start,
            limit,
            sort,
            sort_dir,
          },
        });
        console.log(response.data.data);
        return fetchCoinsSchema.parse(response.data.data);
      } catch (error) {
        console.error(error, ":zod validation error");
        throw error;
      }
    },
  },
};

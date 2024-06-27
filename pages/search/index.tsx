import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { api } from "@/API/API";
import { FetchCoinsSchema } from "@/API/fetchCoins/fetchCoins";
import Searchbar from "@/components/Searchbar/Searchbar";
import { fnum } from "@/utils/formatNumber";

function Search() {
  const [query, setQuery] = useState("");
  const [coinsToDisplay, setCoinsToDisplay] = useState<FetchCoinsSchema>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: allCoins, isLoading: allCoinsLoading } = useQuery({
    queryKey: [api.fetchCoins.getoneThounsand.queryKey],
    queryFn: api.fetchCoins.getoneThounsand.query,
  });

  const handleSearch = useCallback(
    (term: string) => {
      setQuery(term);
    },
    [setQuery]
  );
  const handleLoading = useCallback((bool: boolean) => {
    setIsLoading(bool);
  }, []);
  // The function to return the all iomoprtant one to search and filter

  useEffect(() => {
    if (allCoins && query) {
      const lowerCaseQuery = query.toLowerCase();
      const filteredData = allCoins.filter((coin) =>
        coin.name.toLowerCase().includes(lowerCaseQuery)
      );

      setCoinsToDisplay(filteredData);
    }
  }, [allCoins, query]);
  useEffect(() => {
    if (allCoins) setCoinsToDisplay(allCoins.flatMap((page) => page));
  }, [allCoins]);

  return (
    <div className="max-w-4xl mx-auto border my-4 px-4 py-4 rounded-lg shadow-md">
      <div>
        <div className=" px-12 py-8 rounded-lg">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center mb-4">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900 ">
                  Crypto currencies
                </h1>
                <p className="mt-2 text-sm text-gray-700 mb-4">
                  A list of all the Coinswith details..
                </p>
              </div>
              <Searchbar handleLoading={handleLoading} handleSearch={handleSearch} />
            </div>
            {isLoading && (
              <div className="flex justify-center items-center min-h-screen">
                <div className="">loading</div>
              </div>
            )}
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr className="">
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[50px]"
                        >
                          <span className="flex  items-center gap-4">
                            <span>#</span>{" "}
                          </span>
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900  max-w-[150px]"
                        >
                          <span className="flex justify-center  items-center gap-4">
                            <span>Name</span>{" "}
                          </span>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[150px]"
                        >
                          <span className="flex justify-center  items-center gap-4">
                            <span>Price(USD)</span>{" "}
                          </span>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[150px]"
                        >
                          <span className="flex justify-center  items-center gap-4">
                            <span>24h%</span>{" "}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {coinsToDisplay.map((coin) => (
                        <tr key={coin.id} className="bg-white shadow rounded-lg">
                          <td className="whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {coin.cmc_rank}
                          </td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                            <span className="flex justify-center items-center gap-4">
                              <span className="rounded-full">
                                <Image
                                  src={`icons/color/${coin.symbol.toLowerCase()}.svg`}
                                  alt={coin.name}
                                  width={30}
                                  height={30}
                                />
                              </span>
                              <span className="flex flex-col">
                                <span className="text-lg font-semibold">{coin.symbol}</span>
                                <span className="text-xs text-gray-500 italic">
                                  {fnum(coin.quote.USD.market_cap)}
                                </span>
                              </span>
                            </span>
                          </td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                            <span className="text-gray-500 sm:text-sm">$</span>{" "}
                            {coin.quote.USD.price.toFixed(2)}
                          </td>
                          <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                            <span
                              className={` ${
                                coin.quote.USD.volume_change_24h <= 0
                                  ? "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                                  : "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                              } min-w-20 text-center flex justify-center gap-2`}
                            >
                              <span className="text-center">
                                {coin.quote.USD.volume_change_24h <= 0
                                  ? (coin.quote.USD.volume_change_24h * -1).toFixed(2)
                                  : coin.quote.USD.volume_change_24h.toFixed(2)}
                                %
                              </span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;

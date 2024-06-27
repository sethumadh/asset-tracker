import { useInfiniteQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

import { api } from "@/API/API";
import Searchbar from "@/components/Searchbar/Searchbar";
import { fnum } from "@/utils/formatNumber";

const Home: NextPage = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();
  const [sort, setSort] = useState("market_cap"); // default sort field
  const [sort_dir, setSort_dir] = useState("desc");
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [api.fetchCoins.getAllCoins.queryKey, sort, sort_dir],
      queryFn: ({ pageParam = 1 }) =>
        api.fetchCoins.getAllCoins.query({ pageParam, sort, sort_dir }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length > 0) return allPages.length + 1;
      },
    });
  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage]);
  const handleSort = (sort: string) => {
    if (sort_dir === "asc") {
      setSort_dir("desc");
    } else {
      setSort_dir("asc");
    }
    setSort(sort);
  };
  const handleSearch = useCallback(
    (term: string) => {
      setQuery(term);
      setSort("market_cap");
      setSort_dir("desc");
    },
    [setQuery]
  );
  const handleLoading = useCallback((bool: boolean) => {
    setIsLoading(bool);
  }, []);
  // The function to return the all iomoprtant one to search and filter

  console.log(query);
  return (
    <>
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
              {isFetching && (
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
                            onClick={() => handleSort("market_cap")}
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[50px]"
                          >
                            <span className="flex  items-center gap-4">
                              <span>#</span>{" "}
                              <span>
                                {sort === "market_cap" &&
                                  (sort_dir === "asc" ? (
                                    <FaChevronUp className="text-blue-500" />
                                  ) : (
                                    <FaChevronDown className="text-blue-500" />
                                  ))}
                                {sort !== "market_cap" && <FaChevronUp />}
                              </span>
                            </span>
                          </th>
                          <th
                            onClick={() => handleSort("name")}
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900  max-w-[150px]"
                          >
                            <span className="flex justify-center  items-center gap-4">
                              <span>Name</span>{" "}
                              <span>
                                {sort === "name" &&
                                  (sort_dir === "asc" ? (
                                    <FaChevronUp className="text-blue-500" />
                                  ) : (
                                    <FaChevronDown className="text-blue-500" />
                                  ))}
                                {sort !== "name" && <FaChevronUp />}
                              </span>
                            </span>
                          </th>
                          <th
                            onClick={() => handleSort("price")}
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[150px]"
                          >
                            <span className="flex justify-center  items-center gap-4">
                              <span>Price(USD)</span>{" "}
                              <span>
                                {sort === "price" &&
                                  (sort_dir === "asc" ? (
                                    <FaChevronUp className="text-blue-500" />
                                  ) : (
                                    <FaChevronDown className="text-blue-500" />
                                  ))}
                                {sort !== "price" && <FaChevronUp />}
                              </span>
                            </span>
                          </th>
                          <th
                            onClick={() => handleSort("volume_24h")}
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 max-w-[150px]"
                          >
                            <span className="flex justify-center  items-center gap-4">
                              <span>24h%</span>{" "}
                              <span>
                                {sort === "volume_24h" &&
                                  (sort_dir === "asc" ? (
                                    <FaChevronUp className="text-blue-500" />
                                  ) : (
                                    <FaChevronDown className="text-blue-500" />
                                  ))}
                                {sort !== "volume_24h" && <FaChevronUp />}
                              </span>
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {data?.pages?.map((page, i) =>
                          page.map((coin) => (
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
                                  <span>
                                    {coin.quote.USD.volume_change_24h <= 0 ? (
                                      <>
                                        <FaChevronDown className="text-red-600" />
                                      </>
                                    ) : (
                                      <FaChevronUp className="text-green-600" />
                                    )}
                                  </span>
                                  <span className="text-center">
                                    {coin.quote.USD.volume_change_24h <= 0
                                      ? (coin.quote.USD.volume_change_24h * -1).toFixed(2)
                                      : coin.quote.USD.volume_change_24h.toFixed(2)}
                                    %
                                  </span>
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!hasNextPage && status !== "pending" && <div>no more data</div>}
        <div className="" ref={ref} onClick={() => fetchNextPage()}></div>
      </div>{" "}
    </>
  );
};

export default Home;

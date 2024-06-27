import { useEffect, useState } from "react";

interface Props {
  handleSearch: (query: string) => void;
  handleLoading: (bool: boolean) => void;
}

const Searchbar = ({ handleSearch, handleLoading }: Props) => {
  const [term, setTerm] = useState("");
  const [debounceTerm, setDebounceTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setTerm(debounceTerm);
      handleLoading(false);
    }, 1500);
    handleLoading(true);
    return () => clearTimeout(timer);
  }, [debounceTerm, handleLoading]);

  useEffect(() => {
    if (term?.trim().length != 0) {
      handleSearch(term);
    } else {
      handleSearch("");
    }
  }, [term, handleSearch]);

  return (
    <div className="">
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            onChange={(e) => {
              setDebounceTerm(e.target.value);
            }}
            id="default-search"
            className="block w-full border-b-[1px] p-3 pl-10 text-sm text-gray-900  border-gray-300 rounded-lg bg-white outline-none shadow-lg placeholder:italic placeholder:text-gray-400"
            placeholder="Search"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Searchbar;

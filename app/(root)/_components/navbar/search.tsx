"use client";

import React, { useEffect, useState } from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: { search: debouncedValue },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router]);

  const onClear = () => {
    setValue("");
  };

  return (
    <>
      <form className="mr-4 hidden relative w-[290px] lg:w-[335px] lg:flex items-center">
        <div className="flex items-center w-[290px] lg:w-[400px] lg:ml-0 ml-12">
          <div className="border border-r-0 lg:bg-white bg-slate-100 pt-[0.6rem] pb-2 px-2 rounded-l-md">
            <SearchIcon className="h-5 w-5 text-muted-foreground top-2.5 -left-4" />
          </div>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            className="rounded-r-none px-0 border lg:bg-white bg-slate-100 border-l-0 focus:outline-none focus-visible:ring-transparent"
          />
        </div>
        {value && (
          <X
            onClick={onClear}
            className="h-5 w-5 text-muted-foreground absolute top-2.5 right-16 cursor-pointer hover:opacity-75 transition"
          />
        )}
        <Button
          type="submit"
          className="rounded-l-none rounded-r-sm"
        >
          <SearchIcon className="h-5 w-5" />
        </Button>
      </form>
      <button
        type="button"
        className="mr-5 lg:hidden block"
      >
        <SearchIcon className="h-5 w-5" />
      </button>
    </>
  );
};

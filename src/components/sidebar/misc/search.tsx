"use client";

import { Input } from "@/components/ui/input";
import { useSidebarStore } from "@/states/sidebarStates";

const Search = () => {
  const { search, setSearch } = useSidebarStore();

  return (
    <div className="p-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="rounded-xl"
      />
    </div>
  );
};

export default Search;

import { useEffect, useState, useRef, useCallback } from "react";
import CardListing from "./CardListing";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchListings = async ({ pageParam = 1 }) => {
  try {
    const res = await axios.get(`http://localhost:5000/all-animals`, {
      params: { page: pageParam, limit: 10 },
    });
    console.log("Fetched Data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw new Error("Failed to fetch listings");
  }
};

const PetListing = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["listings"],
    queryFn: fetchListings,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const [filterListing, setFilterListing] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (data) {
      const allListings = data.pages.flatMap((page) => page.listings);
      console.log("All Listings:", allListings);
      let filtered = allListings;

      // search filtering
      if (search) {
        filtered = filtered.filter((item) =>
          item.category?.toLowerCase().includes(search.toLowerCase())
        );
      }

      // category sort filtering
      if (selectedCategory) {
        filtered = filtered.filter(
          (item) =>
            item.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      console.log("Filtered Listings:", filtered);
      setFilterListing(filtered);
    }
  }, [data, search, selectedCategory]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSelect = (e) => {
    setSelectedCategory(e.target.value);
  };

  const observer = useRef();
  const lastListingRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isError) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div>
      <h1 className="text-center text-[#FFF] text-3xl font-bold border bg-slate-500 m-auto rounded-lg mt-1 mb-5">
        <marquee>
          Our website fosters a community of animal lovers dedicated to
          improving the lives of pets in need. We simplify donations and
          adoptions, ensuring every animal finds a loving home. Born from a
          passion for animal welfare, our mission is to create a compassionate
          world for all pets.{" "}
          <span className="text-3xl font-semibold italic uppercase text-purple-950">
            <strong className="text-indigo-950">$</strong> please choose our
            listing pet <strong className="text-indigo-950">$</strong>
          </span>
        </marquee>
      </h1>
      <section className="lg:w-2/3 mx-auto flex justify-between mb-5">
        <div className="join">
          <input
            onChange={handleSearch}
            type="text"
            value={search}
            placeholder="category"
            className="input input-bordered join-item w-[150px]"
          />
        </div>
        <div>
          <select
            className="select select-warning w-full max-w-xs"
            value={selectedCategory}
            onChange={handleSelect}
          >
            <option selected disabled>
              Select a category
            </option>
            <option>cat</option>
            <option>dog</option>
            <option>parrot</option>
            <option>goldfish</option>
            <option>hamster</option>
            <option>rabbit</option>
          </select>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2">
        {filterListing?.map((item, index) => {
          if (item && filterListing.length === index + 1) {
            return (
              <div ref={lastListingRef} key={item._id}>
                <CardListing item={item} />
              </div>
            );
          } else if (item) {
            return <CardListing key={item._id} item={item} />;
          }
          return null;
        })}
      </div>
      <div>{isFetchingNextPage && <p>Loading more pets...</p>}</div>
    </div>
  );
};

export default PetListing;

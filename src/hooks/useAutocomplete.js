import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const useAutocomplete = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["suggestions", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        return [];
      }

      try {
        console.log("Fetching suggestions for:", debouncedQuery);

        const response = await fetch(
          "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("API response:", data);

        const filteredResults = data.filter((item) =>
          item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
        );

        console.log("Filtered results:", filteredResults);
        return filteredResults;
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        return [];
      }
    },
    enabled: debouncedQuery.length >= 2,
  });

  return {
    query,
    setQuery,
    suggestions: data || [],
    isLoading,
    error,
  };
};

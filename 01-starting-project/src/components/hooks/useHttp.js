import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ?? "get",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.header ?? {},
        path: requestConfig.path ?? "",
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      requestConfig.rpLoader(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;

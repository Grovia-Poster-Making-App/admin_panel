import { useEffect, useReducer, useRef } from "react";
import { ApiError } from "../api/types";

interface State<T> {
  data?: T;
  error?: ApiError;
  status?: string;
}

type Cache<T> = { [url: string]: T };

type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: ApiError };

function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
  const cache = useRef<Cache<T>>({});
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    status: "",
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, status: action.type };
      case "fetched":
        return { ...initialState, data: action.payload, status: action.type };
      case "error":
        return { ...initialState, error: action.payload, status: action.type };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  
  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      if (cache.current[url]) {
        dispatch({ type: "fetched", payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          const apiError: ApiError = {
            message: response.statusText,
            status: response.status,
            code: `HTTP_${response.status}`,
          };
          throw apiError;
        }
        if (response.ok && response.status !== 200) {
          const apiError: ApiError = {
            message: "302 error happen. Maybe you forgot .json",
            status: response.status,
            code: "REDIRECT_ERROR",
          };
          throw apiError;
        }

        const data = (await response.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;

        dispatch({ type: "fetched", payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        const apiError: ApiError = {
          message: error instanceof Error ? error.message : "An unknown error occurred",
          status: 500,
          code: "UNKNOWN_ERROR",
        };
        
        dispatch({ type: "error", payload: apiError });
      }
    };

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}

export default useFetch;

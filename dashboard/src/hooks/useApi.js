import { useEffect, useState } from "react";
import { api } from "../api";

const MAX_TRIES = 4;
const RETRY_MS = 4000;

// Loads a list from the backend. If the free server is still waking up it
// quietly tries again a few times before showing an error.
export default function useApi(path) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let timer;
    setLoading(true);
    setError("");

    const load = (attempt) => {
      api
        .get(path)
        .then((res) => {
          if (cancelled) return;
          if (!Array.isArray(res.data)) throw new Error("Unexpected response");
          setData(res.data);
          setLoading(false);
        })
        .catch(() => {
          if (cancelled) return;
          if (attempt < MAX_TRIES) {
            timer = setTimeout(() => load(attempt + 1), RETRY_MS);
          } else {
            setError(
              "Could not load data from the server. Please refresh in a minute."
            );
            setLoading(false);
          }
        });
    };

    load(1);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [path]);

  return { data, loading, error };
}

import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

type Method = 'get' | 'post';

const useAxios = <T>(url: string, method: Method, payload?: unknown) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    axios
      .request({
        data: payload,
        signal: controllerRef.current.signal,
        method,
        url,
      })
      .then(response => setData(response.data))
      .catch(e => setError(e.message))
      .finally(() => setLoaded(true));
  }, [url, payload, method]);

  return { cancel, data, error, loaded };
};

export default useAxios;

import { useEffect, useState } from 'react';

function useFetch(fetchUrl, options = {}) {
  const { disabled = false } = options;

  const [result, setResult] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    async function fetchData() {
      setStatus('loading');
      try {
        const res = await fetch(fetchUrl);
        const data = await res.json();
        setResult(data);
        setStatus('success');
      } catch (e) {
        setErrorMessage(e?.message);
        setStatus('error');
      }
    }
    if (!disabled) {
      fetchData();
    }
  }, [disabled, fetchUrl]);

  return [status, errorMessage, result];
}

export default useFetch;

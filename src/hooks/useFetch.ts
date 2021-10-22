import { useState } from 'react';

const useFetch = (url: string) => {
  const [data, setData] = useState<D | null>(null);

  // Fetch the data here
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(res => {
      setData(res);
    });

  return data;
}
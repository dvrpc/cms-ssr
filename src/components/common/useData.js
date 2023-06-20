import useSWR from "swr";

const useData = (url) =>
  useSWR(url, (...args) => fetch(...args).then((res) => res.json()));

export default useData;

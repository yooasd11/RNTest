import { useEffect, useState } from "react";

const COUNT = 10;

function useTagList(tag: string) {
  const [list, setList] = useState<string[]>([]);

  const getListApi: () => Promise<string[]> = () => {
    return new Promise((resolve) => {
      resolve(new Array(COUNT).fill(0).map((_, index) => `${tag}_${index}`));
    });
  };

  const fetchList = async () => {
    const fetched = await getListApi();
    setList(fetched);
  };

  useEffect(() => {
    fetchList();
  }, [tag]);

  return list;
}

export default useTagList;

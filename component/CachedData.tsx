import React, { FC } from "react";
import { Text } from "react-native";
import { useQuery } from "react-query";
import getSomeData from "../api/FakeAPI";

const CachedData: FC = () => {
  const { data } = useQuery("getSomeData", getSomeData);
  return <Text>{data}</Text>;
};

export default CachedData;

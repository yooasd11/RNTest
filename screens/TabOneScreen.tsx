import React, { useCallback } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useQueryClient } from "react-query";

const TAGS = ["A", "B", "C"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});

type Param = { a: string, b: string, c: string };

let count = 0;

const fakeFetch = (args: Param): Promise<string> => {
  console.log("called!!!");
  const { a, b, c } = args;
  return new Promise((resolve) => {
    resolve(`${a}, ${b}, ${c},  ${String(Math.random())}`);
  });
}

export default function TabOneScreen() {
  const { data: value = ""} = useQuery(["query", { a: "a", b: "b", c: "c" }], () => fakeFetch({ a: `a _${count++}`, b: `b_${count++}`, c: `c_${count++}` }), { cacheTime: 0 });
  const queryClient = useQueryClient();

  const handlePressButton = useCallback(() => {
    queryClient.invalidateQueries(["query"]);
    // const data = queryClient.getQueriesData(["querdddy"]);
    // const second = queryClient.getQueryData(["query", { a: "a", b: "b", c: "c" }]);
    // const third = queryClient.getQueryData(["query"]);
    // console.log("queries : ", data);
    // console.log("query with param: ", second);
    // console.log("query thrid : ", third);
  }, [queryClient]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Test : {value}</Text>
      {/* <Button title="Fetch Connected!" onPress={fetchConnect} /> */}
      <Button onPress={handlePressButton} title="가즈아" />
      {/* <Button title="Fetch Test!" onPress={fetchTest} /> */}
    </SafeAreaView>
  );
}

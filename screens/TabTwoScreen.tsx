import * as React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { StyleSheet, FlatList, TouchableOpacity, LogBox } from "react-native";

import { Text, View } from "../components/Themed";
import DraggableFlatList, { RenderItemParams } from "./DraggableFlatList";

LogBox.ignoreLogs([
  "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.",
]);

export default function TabTwoScreen() {
  const [data, setData] = useState(
    Array(30)
      .fill(null)
      .map((_, i) => i)
  );
  const renderItem = useCallback(
    ({ item, index, drag, isActive }: RenderItemParams<number>) => (
      <TouchableOpacity
        style={{
          height: 40,
          width: "100%",
          borderColor: "aqua",
          borderWidth: 1,
          marginBottom: 4,
          padding: 10,
        }}
        onLongPress={drag}
      >
        <Text>{`Item ${item}`}</Text>
      </TouchableOpacity>
    ),
    [data]
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <DraggableFlatList
        style={{ flex: 1, width: "100%" }}
        data={data}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderItem}
        onDragEnd={({ data }) => setData(data)}
        debug={false}
      ></DraggableFlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

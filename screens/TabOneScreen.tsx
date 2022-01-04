import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleList from "../components/SimpleList";
import TagSelector from "../components/TagSelector";
import useTagList from "../hooks/useTagList";

const TAGS = ["A", "B", "C"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});

export default function TabOneScreen() {
  const [selectedTag, setSelectedTag] = useState(TAGS[0]);

  const list = useTagList(selectedTag);

  return (
    <SafeAreaView style={styles.container}>
      <TagSelector selectedTag={selectedTag} onPressTag={setSelectedTag} />
      <SimpleList list={list} />
    </SafeAreaView>
  );
}

import React, { FC, useCallback, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import useTagList from "../hooks/useTagList";
import TagSelector from "./TagSelector";

interface Props {
  list?: string[];
}

const TAGS = ["A", "B", "C"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const SimpleList: FC<Props> = ({}) => {
  const [selectedTag, setSelectedTag] = useState(TAGS[0]);
  const list = useTagList(selectedTag);

  const renderItem = useCallback((args: { item: string; index: number }) => {
    const { item } = args;
    // for (let i = 0; i < 500_000_000; i++) {}
    return <Text>{item}</Text>;
  }, []);
  return (
    <FlatList
      style={styles.container}
      data={list}
      keyExtractor={(item) => item}
      renderItem={renderItem}
      ListHeaderComponent={
        <TagSelector selectedTag={selectedTag} onPressTag={setSelectedTag} />
      }
      ListEmptyComponent={<Text>아무 것도 없삼~</Text>}
    />
  );
};

export default React.memo(SimpleList);

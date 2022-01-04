import React, { FC, useCallback } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

interface Props {
  list: string[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const SimpleList: FC<Props> = ({ list }) => {
  const renderItem = useCallback((args: { item: string; index: number }) => {
    const { item } = args;
    for (let i = 0; i < 500_000_000; i++) {}
    return <Text>{item}</Text>;
  }, []);
  return (
    <FlatList
      style={styles.container}
      data={list}
      keyExtractor={(item) => item}
      renderItem={renderItem}
      ListEmptyComponent={<Text>아무 것도 없삼~</Text>}
    />
  );
};

export default React.memo(SimpleList);

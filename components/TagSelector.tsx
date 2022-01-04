import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  selectedTag: string;
  onPressTag: (tag: string) => void;
}

const styles = StyleSheet.create({
  tags: {
    flexDirection: "row",
    flex: 1,
  },
  tag: {
    marginLeft: 10,
  },
  selected: {
    color: "red",
  },
});

const TAGS = ["A", "B", "C"];

const TagSelector: React.FC<Props> = ({ selectedTag, onPressTag }) => {
  return (
    <View style={styles.tags}>
      {TAGS.map((tag) => (
        <TouchableOpacity
          style={styles.tag}
          key={tag}
          onPress={() => onPressTag(tag)}
        >
          <Text style={selectedTag === tag && styles.selected}>{tag}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TagSelector;

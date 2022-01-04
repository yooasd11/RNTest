import React, { FC, useImperativeHandle } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import { FlatList, Text } from "react-native";
import {
  NativeViewGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

// export interface RefType {
//   childHandler: any;
// }

interface Props {
  list: string[];
  parentHandler: React.Ref<PanGestureHandler>;
}

const ListScreen = forwardRef<NativeViewGestureHandler, Props>(
  ({ list, parentHandler }, ref) => {
    // const childHandler = useRef<any>(null);
    // useImperativeHandle(ref, () => ({
    //   childHandler,
    // }));

    // useEffect(() => {
    //   console.log("zzzz2 ,", parentHandler);
    // }, [parentHandler]);
    return (
      <Animated.View>
        <NativeViewGestureHandler
          ref={ref}
          simultaneousHandlers={parentHandler}
        >
          <FlatList
            data={list}
            contentContainerStyle={{ paddingVertical: 10 }}
            keyExtractor={(item) => item}
            renderItem={(args) => <Text>{args.item}</Text>}
          />
        </NativeViewGestureHandler>
      </Animated.View>
    );
  }
);

export default ListScreen;

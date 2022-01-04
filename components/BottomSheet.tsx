import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { FC, useRef, useState } from "react";
import { useEffect } from "react";
import { FlatList, Text } from "react-native";
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackParamList } from "../types";
import ListScreen from "./ListScreen";

type Props = StackScreenProps<RootStackParamList, "Bottom">;

const BottomSheet: FC<Props> = () => {
  const [list] = useState(Array.from({ length: 100 }, (_, i) => `${i + 1}`));
  const translateY = useSharedValue(0);
  const navigation = useNavigation();
  const parentHandler = useRef<any>(null);
  const childRef = useRef<any>(null);

  // useEffect(() => {
  //   console.log("zzzz ", childRef?.current);
  // }, [childRef]);

  const closeModal = () => {
    "worklet";

    translateY.value = withTiming(1000, { duration: 100 }, () => {
      runOnJS(navigation.goBack)();
    });
  };

  const onPanGestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: ({ translationY }) => {
        if (translationY > 0) {
          translateY.value = translationY;
        }
      },
      onEnd: ({ translationY, velocityY }) => {
        const nextTranslateY = snapPoint(
          translationY,
          velocityY,
          [0, 200, 400]
        );

        if (nextTranslateY > 200) {
          closeModal();
        } else {
          translateY.value = withTiming(0, { duration: 200 });
        }
      },
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  return (
    <SafeAreaProvider>
      <PanGestureHandler
        ref={parentHandler}
        failOffsetX={50}
        activeOffsetY={30}
        onGestureEvent={onPanGestureHandler}
        simultaneousHandlers={childRef}
      >
        <Animated.View style={animatedStyle}>
          <Animated.View
            style={{
              marginVertical: 30,
              width: "100%",
              borderColor: "red",
              borderWidth: 2,
            }}
          >
            <Text>Header</Text>
          </Animated.View>
          <ListScreen
            ref={childRef}
            list={list}
            parentHandler={parentHandler}
          />
          {/* <NativeViewGestureHandler
            ref={childRef}
            simultaneousHandlers={parentHandler}
          >
            <FlatList
              data={list}
              contentContainerStyle={{ paddingVertical: 10 }}
              keyExtractor={(item) => item}
              renderItem={(args) => <Text>{args.item}</Text>}
            />
          </NativeViewGestureHandler> */}
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaProvider>
  );
};

export default BottomSheet;

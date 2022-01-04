import React, { FC, useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ColorValue,
  Animated,
  StyleProp,
  ViewStyle,
} from "react-native";

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  radius: number;
  dots: number;
  color: ColorValue;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
});

const ProgressCircle: FC<Props> = ({ containerStyle, radius, dots, color }) => {
  if (radius <= 0 || dots <= 0) {
    return null;
  }

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const fadeIn = useRef<Animated.Value>(new Animated.Value(0.2)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setActiveIndex((activeIndex + 1) % dots);
    });
  }, [radius, dots, color, activeIndex]);

  return (
    <View style={[styles.container, containerStyle]}>
      {new Array(dots).fill(1).map((_, index) => (
        <Animated.View
          key={index}
          style={{
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            backgroundColor: color,
            marginLeft: radius,
            opacity: activeIndex === index ? fadeIn : 0.2,
          }}
        />
      ))}
    </View>
  );
};

export default React.memo(ProgressCircle);

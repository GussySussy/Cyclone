import { View, Text } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, SingleDay_400Regular } from "@expo-google-fonts/single-day";

const _layout = () => {
  let [fontsLoaded] = useFonts({
    SingleDay_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <>
        <Text>Could not load font</Text>
      </>
    );
  }
  return (
    <SafeAreaView className=" flex-1 bg-platinum">
      <Slot />
    </SafeAreaView>
  );
};

export default _layout;

import { Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";

interface ButtonProps {
  buttonText: string;
  onPress?: () => void;
}

export const Button = ({ buttonText, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      className="bg-lavender opacity-80 rounded-3xl text-center h-auto border-old_rose py-3 px-2 shadow-md shadow-raisin_black"
      onPress={onPress}
    >
      <Text className="text-old_rose font-singleDay text-xl text-center">
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

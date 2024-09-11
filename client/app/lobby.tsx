import { View, Text, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { SocketManager } from "../utils/SocketManager";
import { useRouter } from "expo-router";

const lobby = () => {
  const socket = SocketManager.getInstance();
  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      SocketManager.exitRoom();
      router.push("/");
      return true; // Returning true indicates that we've handled the event
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      backHandler.remove(); // Cleanup the event listener on component unmount
    };
  }, []);

  return (
    <View>
      <View className="players w-full justify-center items-center bg-slate-300">
        <Text className="text-5xl font-singleDay text-old_rose">Lobby</Text>
        <View className="player-list w-full p-5 bg-slate-500 flex-row flex-wrap gap-x-2 justify-start">
          {Array.from({ length: 10 }, (_, i) => (
            <View key={i} className="player-info bg-amber-200 space-y-2">
              <View className="h-10 w-10 rounded-full bg-slate-600"></View>
              <Text className="text-raisin_black font-singleDay">
                {SocketManager.getNickname()}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default lobby;

import { View, Text, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { SocketManager } from "../utils/SocketManager";
import { useRouter } from "expo-router";

const Lobby = () => {
  const router = useRouter();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const get_players = async () => {
      try {
        const response = await SocketManager.getPlayers();
        setPlayers(response);
        console.log("Received players:", response);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    get_players();
  }, []);

  console.log("Updated players state:", players);

  const backAction = () => {
    SocketManager.exitRoom();
    router.push("/");
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return (
    <View>
      <View className="players w-full justify-center items-center bg-slate-300">
        <Text className="text-5xl font-singleDay text-old_rose">Lobby</Text>
        <View className="player-list w-full p-5 bg-slate-500 flex-row flex-wrap gap-x-2 justify-start"></View>
      </View>
    </View>
  );
};

export default Lobby;

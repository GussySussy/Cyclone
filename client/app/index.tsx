// src/pages/Index.tsx

import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import { useRouter } from "expo-router";
import { SocketManager } from "../utils/SocketManager";

export const Index = () => {
  const [isRoomCodeVisible, setIsRoomCodeVisible] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>(SocketManager.getNickname());
  const [roomCode, setRoomCode] = useState<string>("");
  const router = useRouter();
  const socket = SocketManager.getInstance();

  const updateNickname = (text: string) => {
    setNickname(text);
    SocketManager.setNickname(text);
  };

  const handleCreateRoom = async () => {
    try {
      const response = await SocketManager.createRoom(nickname);
      setRoomCode(response.room_code);
      router.push("/lobby");
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleJoinRoom = async (roomCode: string) => {
    try {
      await SocketManager.joinRoom(nickname, roomCode);
      router.push("/lobby");
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <View className="space-y-10">
        <Text className="text-old_rose text-5xl font-singleDay">Cyclone</Text>
        <View className="menu space-y-6">
          <View className="space-y-1">
            <Text className="text-old_rose font-singleDay">Nickname</Text>
            <TextInput
              className="border border-solid rounded-md h-auto border-old_rose px-2 py-1 text-old_rose font-singleDay"
              onChangeText={(text) => updateNickname(text)}
              value={nickname}
              placeholder="Enter nickname"
            />
          </View>
          <View className="buttons space-y-6">
            <TouchableOpacity
              className="bg-lavender opacity-80 rounded-3xl h-auto border-old_rose py-3 px-2 shadow-md shadow-raisin_black"
              onPress={handleCreateRoom}
            >
              <Text className="text-old_rose font-singleDay text-xl text-center">
                Create Room
              </Text>
            </TouchableOpacity>
            <View className="space-y-6">
              <Button
                buttonText="Join Room"
                onPress={() => setIsRoomCodeVisible(!isRoomCodeVisible)}
              />
              {isRoomCodeVisible && (
                <View className="space-y-1">
                  <Text className="text-old_rose font-singleDay">
                    Room Code
                  </Text>
                  <TextInput
                    className="border border-solid rounded-md h-auto border-old_rose px-2 py-1 text-old_rose font-singleDay"
                    onChangeText={(text) => setRoomCode(text)}
                    onBlur={() => handleJoinRoom(roomCode)}
                    value={roomCode}
                    placeholder="Enter room code"
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Index;

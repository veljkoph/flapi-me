import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const Flapi = ({ flapiLeft, flapiBottom }) => {
  const birdWidth = 50;
  const birdHeight = 60;

  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "blue",
        width: birdWidth,
        height: birdHeight,
        left: flapiLeft - birdWidth / 2,
        bottom: flapiBottom - birdHeight / 2,
      }}
    ></View>
  );
};

export default Flapi;

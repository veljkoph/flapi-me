import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Flapi from "./components/Flapi";
import Obstacles from "./components/Obstacles";

const App = () => {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const flapiLeft = screenWidth / 2;

  const [flapiBottom, setflapiBottom] = useState(screenHeight / 2);
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2 + 30
  );
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gravity = 2;
  let obstacleWidth = 60;
  let obstacleHeight = 300;
  let gap = 200;
  let gameTimerId;
  let obstaclesTimerId;
  let obstaclesTimerIdTwo;

  //falling of the flapi
  useEffect(() => {
    if (flapiBottom > 0) {
      gameTimerId = setInterval(() => {
        setflapiBottom((flapiBottom) => flapiBottom - gravity);
      }, 30);

      return () => {
        clearInterval(gameTimerId);
      };
    }
    //if i dont have flapiBottom as a dependecy, it wont stop
  }, [flapiBottom]);

  const jump = () => {
    if (!isGameOver && flapiBottom < screenHeight) {
      setflapiBottom((flapiBottom) => flapiBottom + 40);
    }
  };

  //start first obstacle
  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesTimerId);
      };
    } else {
      setScore((score) => score + 1);
      setObstaclesLeft(screenWidth);
      setObstaclesNegHeight(-Math.random() * 100);
    }
  }, [obstaclesLeft]);

  //start second obstacle
  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo((obstaclesLeftTwo) => obstaclesLeftTwo - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesTimerIdTwo);
      };
    } else {
      setScore((score) => score + 1);
      setObstaclesLeftTwo(screenWidth);
      setObstaclesNegHeightTwo(-Math.random() * 100);
    }
  }, [obstaclesLeftTwo]);

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesTimerId);
    clearInterval(obstaclesTimerIdTwo);
    setIsGameOver(true);
  };
  useEffect(() => {
    if (
      ((flapiBottom < obstaclesNegHeight + obstacleHeight + 30 ||
        flapiBottom > obstaclesNegHeight + obstacleHeight + gap - 30) &&
        obstaclesLeft > screenWidth / 2 - 30 &&
        obstaclesLeft < screenWidth / 2 + 30) ||
      ((flapiBottom < obstaclesNegHeightTwo + obstacleHeight + 30 ||
        flapiBottom > obstaclesNegHeightTwo + obstacleHeight + gap - 30) &&
        obstaclesLeftTwo > screenWidth / 2 - 30 &&
        obstaclesLeftTwo < screenWidth / 2 + 30)
    ) {
      gameOver();
    }
  });

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {isGameOver && (
          <Text
            style={{
              color: "white",
              fontSize: 40,
              alignSelf: "center",
              zIndex: 11,
              backgroundColor: "black",
            }}
          >
            SCORE: {score}
          </Text>
        )}
        <Obstacles
          obstaclesLeft={obstaclesLeft}
          obstacleHeight={obstacleHeight}
          obstacleWidth={obstacleWidth}
          gap={gap}
          color="red"
          randomBottom={obstaclesNegHeight}
        />
        <Obstacles
          obstaclesLeft={obstaclesLeftTwo}
          obstacleHeight={obstacleHeight}
          obstacleWidth={obstacleWidth}
          gap={gap}
          color="violet"
          randomBottom={obstaclesNegHeightTwo}
        />
        <Flapi flapiBottom={flapiBottom} flapiLeft={flapiLeft} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fefefe",
    justifyContent: "center",
  },
});
export default App;

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StarRating = () => {
  const starRatingOptions = [1, 2, 3, 4, 5];
  const [starRating, setStarRating] = useState(null);
  const animatedButtonScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{scale: animatedButtonScale}],
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.stars}>
          {starRatingOptions.map(option => (
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn(option)}
              onPressOut={() => handlePressOut(option)}
              onPress={() => setStarRating(option)}
              key={option}>
              <Animated.View style={animatedScaleStyle}>
                <Icon
                  name={starRating >= option ? 'star' : 'star-border'}
                  size={32}
                  style={
                    starRating >= option
                      ? styles.starSelected
                      : styles.starUnselected
                  }
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <Text style={styles.heading2}>
          Thanks for valuable rating of {starRating} star
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default StarRating;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    stars: {
      display: 'flex',
      flexDirection: 'row',
    },
    starUnselected: {
      color: '#aaa',
    },
    starSelected: {
      color: '#ffb300',
    },
    heading2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
      },
  });

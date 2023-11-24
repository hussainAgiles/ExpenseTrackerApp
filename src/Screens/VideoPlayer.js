import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React,{useState} from 'react';
import Video from 'react-native-video';

const VideoPlayer = () => {
const [clicked, setclicked] = useState(false)
    

  return (
    <View style={styles.container}>
        <TouchableOpacity style={{width:'100%',height:250}}>
      <Video
        source={{uri:'https://youtu.be/XyptHWGV-D8?si=MaCa4xNs7dtXbCip' }} // Can be a URL or a local file.
        // ref={ref => {
        //   this.player = ref;
        // }} // Store reference
        // onBuffer={this.onBuffer} // Callback when remote video is buffering
        // onError={this.videoError} // Callback when video cannot be loaded
        muted
        style={styles.backgroundVideo}
      />
      
      </TouchableOpacity>
      
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    width:'100%',
    height:250,
  },
});

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class RPSIntro extends Component {

  startGame = () => {
    //alert("PRESS")
    this.props.navigator.push({
      id: 'Game'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome {'\n'} to {'\n'}
          Rock-Paper-Scissor {'\n'} Game
        </Text>
        
        <TouchableHighlight style={styles.touchStart} onPress={this.startGame} > 
          <Text style={styles.start}>Start</Text> 
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#006BB6',
  },
  welcome: {
    color: '#FDB927',
    fontSize: 40,
    textAlign: 'center',
    margin: 20,
  },
  touchStart: {
    marginTop: 50,
    borderRadius: 4, 
    borderWidth: 2, 
    borderColor: '#FDB927',
    backgroundColor: '#FDB927',
  },
  start: {
    color: '#006BB6',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20
  }

});

module.exports = RPSIntro;
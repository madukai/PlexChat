import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator
} from 'react-native';

var Start = require('../src/RPSIntro');
var Game  = require('../src/RPSGame');
var End   = require('../src/RPSEnd');

export default class PlexChatRN extends Component {

  render() {
    return (
      <Navigator 
        initialRoute = {{ id: 'Start'}} 
        renderScene = {this.navigatorRenderScene}
      />
    );
  }

  navigatorRenderScene(route, navigator) {
    switch (route.id) {
      case 'Start':
        return ( <Start navigator = {navigator} /> );
      case 'Game':
        return ( <Game navigator = {navigator} /> );
      case 'End' :
        return ( <End navigator = {navigator} final={route.finalResult} /> );
    }
  }
}


AppRegistry.registerComponent('PlexChatRN', () => PlexChatRN);

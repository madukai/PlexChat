import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

class RPSGame extends Component {

  constructor() {
      super()
      this.state = {
          uScore: 0, // holds player's current score
          cScore: 0, // holds cpu's current score
          uSelect: require('../img/blank.png'), // image for player's choice
          cSelect: require('../img/blank.png'), // image for cpu's choice
          result: '' // text to display which one the battle
      }
  }
  
  // Runs the main game logic for player's and cpu's selections
  gameLogic = (s) => {

      // player select rock
      if (s === 'R') {
          this.setState({
              uSelect: require('../img/rock.png')
          })
      } else if (s === 'P') { // player select paper
          this.setState({
              uSelect: require('../img/paper.png')
          })
      } else if (s === 'S') { // player select scissor
          this.setState({
              uSelect: require('../img/scissor.png')
          })
      }

      // Get cpu's selection
      var c = this.cpuSelection();

      // Calculate the result and score
      this.calculateResult(s, c);

      // Game ends
      this.gameEnd();
  }

  // Generates cpu's selection
  cpuSelection() {
      // CPU will generate randon between 1 - 3
      var c = Math.floor((Math.random() * 3) + 1);
      var cs = '';

      // CPU selected rock
      if (c === 1) {
          this.setState({
              cSelect: require('../img/rock.png')
          })
          cs = 'R'
      } else if (c === 2) { // CPU selected paper
          this.setState({
              cSelect: require('../img/paper.png')
          })
          cs = 'P'
      } else if (c === 3) { // CPU selected scissor
          this.setState({
              cSelect: require('../img/scissor.png')
          })
          cs = 'S'
      }
      
      // return cpu's selection
      return cs;
  }

  // Calculate score depending on the current result of player's and cpu's choices
  calculateResult(us, cs) {

      if (us === cs) {
          this.setState({
              result: 'Tie'
          })
      } else {
          var res = us + cs;

          // Rock - Paper
          if (res === 'RP') { // player rock - cpu paper
              this.setState({ result: 'CPU 1 Pt'})
              this.state.cScore++; // increment cpu score
          } else if (res === 'PR') { // player paper - cpu rock
              this.setState({ result: 'Player 1 Pt'})
              this.state.uScore++; // increment player's score
          }

          // Scissor - Rock
          if (res === 'SR') { // player scissor - cpu rock
              this.setState({ result: 'CPU 1 Pt'})
              this.state.cScore++; // increment cpu score
          } else if (res === 'RS') { // player rock - cpu scissor
              this.setState({ result: 'Player 1 Pt'})
              this.state.uScore++; // increment player's score
          }

          // Scissor - Paper
          if (res === 'PS') { // player paper - cpu scissor
              this.setState({ result: 'CPU 1 Pt'})
              this.state.cScore++; // increment cpu score
          } else if (res === 'SP') { // player scissor - cpu paper
              this.setState({ result: 'Player 1 Pt'})
              this.state.uScore++; // increment player's score
          }
      }
  }

  // Ends the game if either the player or cpu has reach 5 pts
  gameEnd() {
      
      var final = '';

      // Checks the current score of player and cpu
      if (this.state.uScore === 5 || this.state.cScore === 5) {

          // If player wins, set the text for player
          if(this.state.uScore === 5) {
            final = 'Player Wins!';
          }
          else { // Set the text for cpu
            final = 'CPU Wins!';
          }

          // Push the End to switch scene
          this.props.navigator.push({
              id: 'End',
              finalResult: final
          });
      }
  }

  // Render function
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          ROCK-PAPER-SCISSOR
        </Text>

        <View style={styles.gameArea}>
            <View style={styles.leftArea}>
                <Image
                    source={this.state.uSelect}
                />
            </View>

            <View style={styles.midArea} > 
                <Text style={styles.midAreaText} >
                    VS
                </Text>
            </View>

            <View style={styles.rightArea}>
                <Image
                    source={this.state.cSelect}
                />
            </View>
        </View>
        
        <View style={styles.infoArea}>
            <View> 
                <Text style={styles.userScore}>User - {this.state.uScore}</Text>
            </View>
            <View>
                <Text style={styles.result}> {this.state.result} </Text>
            </View>
            <View> 
                <Text style={styles.cpuScore}>CPU - {this.state.cScore}</Text>
            </View>
        </View>

        <View style={styles.selection}>
            <View>
                <TouchableHighlight style={styles.touchSelect}  onPress={this.gameLogic.bind(this,'R')} > 
                    <Text style={styles.userSelect}>Rock</Text> 
                </TouchableHighlight>
            </View>
            <View>
                <TouchableHighlight style={styles.touchSelect} onPress={this.gameLogic.bind(this,'P')} > 
                    <Text style={styles.userSelect}>Paper</Text> 
                </TouchableHighlight>
            </View>
            <View>
                <TouchableHighlight style={styles.touchSelect} onPress={this.gameLogic.bind(this,'S')} > 
                    <Text style={styles.userSelect}>Scissor</Text> 
                </TouchableHighlight>
            </View>
        </View>

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
  gameArea: {
    flex: 1, 
    flexDirection: 'row'
  },
  leftArea: {
    borderRadius: 4, 
    borderWidth: 1, 
    borderColor: '#FDB927',
    width: 130, 
    height: 130
  },
  midArea: {
    marginLeft: 20,
    marginRight: 20
  },
  midAreaText: {
    color: '#FDB927',
    fontSize: 30,
    fontWeight: 'bold',
  },
  rightArea: {
    borderRadius: 4, 
    borderWidth: 1, 
    borderColor: '#FDB927',
    width: 130, 
    height: 130
  },
  infoArea: {
      flex: 1, 
      flexDirection: 'row'
  },
  selection: {
    flex: 1, 
    flexDirection: 'row'
  },
  touchSelect: {
    borderRadius: 4, 
    borderWidth: 2, 
    borderColor: '#FDB927',
    backgroundColor: '#FDB927',
    margin: 10
  },
  userSelect: {
    color: '#006BB6',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20
  },
  result: {
    color: '#FDB927',
    fontSize: 20,
    fontWeight: 'bold'
  },
  userScore: {
    color: '#FDB927',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 50
  },
  cpuScore: {
    color: '#FDB927',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 50
  }

});

module.exports = RPSGame;
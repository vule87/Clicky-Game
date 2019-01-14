import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    clicked: [],
    score: 0
  };


  handleClick = (id) => {
    this.setState({ friends: this.shuffle(this.state.friends) });

    if (!this.state.clicked.includes(id)) {
      this.setState({
        clicked: [...this.state.clicked, id],
        score: this.state.score + 1
      }, () => {
        if (this.state.score === this.state.friends.length) {
          alert("You Win");
          this.setState({ score: 0, clicked: [] });
        }
      })
    } else {
      this.setState({ score: 0, clicked: [] });
      alert("You Lose")
    }
  }

  shuffle = (array) => {
    let copy = array;
    let last = copy.length;
    let temp;
    let randomIndex;

    while (last) {
      randomIndex = Math.floor(Math.random() * last--);

      temp = copy[last];
      copy[last] = copy[randomIndex];
      copy[randomIndex] = temp;
    }
    return copy;
  }

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <div>
          <Title>Friends List</Title>
          <h3>Score: {this.state.score}</h3>
        </div>

        {this.state.friends.map(friend => (
          <FriendCard
            onclick={this.handleClick}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            from={friend.from}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;

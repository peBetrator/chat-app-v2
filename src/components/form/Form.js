import React, { Component } from "react";
import { connect } from "react-redux";
import { getMessages } from "../../actions";

import "./form.css";

import Message from "../messages/message";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };

    this.listenMessages();
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.user && prevState.userName !== nextProps.user.displayName) {
  //     return { userName: nextProps.user.displayName };
  //   }
  //   return null;
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.room !== this.props.room) {
  //     this.setState({
  //       room: this.props.room
  //     });
  //     this.messageRef = firebase.database().ref("rooms/" + this.props.room);
  //     this.listenMessages();
  //   }
  // }

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  // handleSend = () => {
  //   if (this.state.message) {
  //     var newItem = {
  //       userName: this.state.userName,
  //       message: this.state.message
  //     };
  //     this.messageRef.push(newItem);
  //     this.setState({ message: "" });
  //   }
  // };

  handleKeyPress = event => {
    if (event.key === "Enter") this.handleSend();
  };

  listenMessages = () => {
    const { dispatch, room } = this.props;
    dispatch(getMessages(room));
  };

  render() {
    const { loaded, list } = this.props;
    return (
       <div className="form">
        <div className="form__message">
          {list.map((item, index) => (
            <Message key={index} message={item} />
          ))}
        </div>
        <div className="form__row">
          <input
            className="form__input"
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <button className="form__button" onClick={this.handleSend}>
            send
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    room: state.messaging.room,
    list: state.messaging.messages,
    loaded: state.messaging.loaded
  };
};

export default connect(mapStateToProps)(Form);

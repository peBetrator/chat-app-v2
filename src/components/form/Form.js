import React, { Component } from "react";
import "./Form.css";

import Message from "../messages/Message";
import firebase from "firebase";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      message: "",
      list: []
    };

    this.messageRef = firebase.database().ref();

    this.listenMessages();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user && this.props.user !== prevProps.user) {
      this.setState({ userName: prevProps.user.displayName });
    }
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message
      };
      this.messageRef.push(newItem);
      this.setState({ message: "" });
    }
  }

  handleKeyPress(event) {
    if (event.key === "Enter") this.handleSend();
  }

  listenMessages() {
    this.messageRef.limitToLast(10).on("value", message => {
      if (message.exists())
        this.setState({
          list: Object.values(message.val())
        });
    });
  }

  isUserAuthenticated() {
    if (!this.props.user)
      return <p>Please authenticate to see/send messages</p>;
  }

  render() {
    return (
      <div className="form">
        <div className="form__message">
          {this.state.list.map((item, index) => (
            <Message key={index} message={item} />
          ))}
        </div>
        <div className="form__row">
          <input
            className="form__input"
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <button className="form__button" onClick={this.handleSend.bind(this)}>
            send
          </button>
        </div>
        {this.isUserAuthenticated()}
      </div>
    );
  }
}

export default Form;

import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

import Header from './Header';
import Message from './Message';
import MessageInput from './MessageInput';
import MessageFilter from './MessageFilter';

import db from './lib/db';

const Messages = db.ref('messages');

class App extends Component {
  constructor(props){
    super(props)
    // set the default state the app will load when it is first rendered
    this.state = {
      messages: {}
    }

    // bind functions in this component
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
  }

  componentDidMount() {
    Messages.on('value', snapshot => {
      this.setState({
        messages: snapshot.val() || {}
      })
    })
  }

  handleLike(id) {
    const message = _.find(this.state.messages,
      // search through 'messages' array for message with ID that matches
      // what the 'Message' component sends onClick in handleThumbsUp
      (message, searchId) => searchId === id
    )
    // add 1 to the 'likes' property of 'messages' object
    message.likes = message.likes +1;
    // make this new 'message' object the current version of it in this instance


    Messages.child(id).update(message);
  }

  handleDislike(id) {
    const message = _.find(this.state.messages,
      (message, searchId) => searchId === id
    )
    // same as above but -1
    message.likes = message.likes -1;

    Messages.child(id).update(message);
  }

  handleDelete(id) {
    Messages.child(id).remove()
  }

  handleNewPost(text) {
    // get the current date then reformat timestamp in unix format
    // to add when this message is being posted as an object property
    const date = new Date()
    const timestamp = date.getTime()
    // set up an object within a variable which only exists in the scope of this function ('message')
    // this object has default post values (ie. a random uuid is generated and 0 likes)
    // plus adds the 'text' value passed from the 'MessageBoard' component when 'handleSubmit' runs
    const message = { text: text, likes: 0, timesamp: timestamp }
    // then push this new 'message' object to firebase.
    //

    Messages.push(message)
  }

  render() {

    return (
      <div className="App">
        <div class="container">
          {/* call the component 'Header' and pass it a 'prop' named 'title' with the value 'Anon Message Board' */}
          <Header title={"Anon Message Board"} />
          {/* Call the 'MessageBoard' component and pass through the title, label, button text
          plus the method / function 'handleNewPost' to enable use in the component - */}
          <MessageInput
            title={"Post a message"}
            inputLabel={"Type your message here"}
            buttonText={"Post to the board"}
            // Pass 'handleNewPost' as a prop to component 'MessageBoard'
            onNewPost={this.handleNewPost}
          />

          <div class="panel-group">
            <div class="panel panel-default">
              <div class="panel-heading">Message Board</div>
              <div class="panel-body">
                <ul class="message-board">
                  {/* run through all objects within 'messages' array and remake each object
                  in the format that sends each property value to the 'Message' component correctly mapped as props */}
                  {_.map(this.state.messages, (message, id) => (
                    <Message
                      text={message.text}
                      likes={message.likes}
                      id={id}
                      key={id}
                      // functions are sent through as props to then be called in the 'Message' component
                      // by their prop name, not their function name
                      onLike={this.handleLike}
                      onDislike={this.handleDislike}
                      onDeleteMessage={this.handleDelete}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import { db } from './firebase';

function ChatInputBox() {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        const { value } = event.target.elements[0];
        db.collection('channels')
          .doc('general')
          .collection('messages')
          .add({
            text: value,
            createdAt: new Date()
          });
        event.target.reset();
      }}
      className="ChatInputBox"
    >
      <input
        name="message"
        className="ChatInput"
        placeholder="Message #general"
      />
    </form>
  );
}

export default ChatInputBox;

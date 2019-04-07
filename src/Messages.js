import React from 'react';
import useCollection from './useCollection';
import FirstUserMessage from './FirstUserMessage';

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, 'createdAt');

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, index) => {
        const previousMessage = messages[index - 1];
        const showDay = false;
        const showAvatar =
          !previousMessage || message.user.id !== previousMessage.user.id;

        return showAvatar ? (
          <FirstUserMessage
            key={message.id}
            message={message}
            showDay={showDay}
          />
        ) : (
          <div key={message.id}>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Messages;

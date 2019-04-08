import React from 'react';
import isSameDay from 'date-fns/is_same_day';

import useCollection from './useCollection';
import FirstUserMessage from './FirstUserMessage';

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, 'createdAt');

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, index) => {
        const previousMessage = messages[index - 1];
        const showDay = shouldShowDay(previousMessage, message);
        const showAvatar = shouldShowAvatar(previousMessage, message);

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

function shouldShowAvatar(previousMessage, message) {
  const isFirst = !previousMessage;
  if (isFirst) return isFirst;

  const isDifferentUser = message.user.id !== previousMessage.user.id;
  if (isDifferentUser) return isDifferentUser;

  const hasBeenAWhile =
    message.createdAt.seconds - previousMessage.createdAt.seconds > 300;
  return hasBeenAWhile;
}

function shouldShowDay(previousMessage, message) {
  const isFirst = !previousMessage;
  if (isFirst) return isFirst;

  return !isSameDay(
    previousMessage.createdAt.seconds * 1000,
    message.createdAt.seconds * 1000
  );
}

export default Messages;

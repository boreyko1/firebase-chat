import React from 'react';
import formatDate from 'date-fns/format';

import useDocWithCache from './useDocWithCache';

function FirstUserMessage({ message, showDay }) {
  const author = useDocWithCache(message.user.path);

  return (
    <div key={message.id}>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">
            {formatDate(message.createdAt.seconds * 1000, 'Do MMMM')}
          </div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{
            backgroundImage: author ? `url(${author.photoURL})` : ''
          }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName}</span>{' '}
            <span className="TimeStamp">
              {formatDate(message.createdAt.seconds * 1000, 'h:mm A')}
            </span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
}

export default FirstUserMessage;

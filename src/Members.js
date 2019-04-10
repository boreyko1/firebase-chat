import React from 'react';

import useCollection from './useCollection';

function Members({ channelId }) {
  const members = useCollection('users', undefined, [
    `channels.${channelId}`,
    '==',
    true
  ]);

  return (
    <div className="Members">
      <div>
        {members.sort(sortByName).map(member => (
          <div key={member.id} className="Member">
            <div className={`MemberStatus ${member.status.state}`} />
            {member.displayName}
          </div>
        ))}
      </div>
    </div>
  );
}

const sortByName = (a, b) =>
  a.displayName - b.displayName ? 1 : b.displayName - a.displayName ? -1 : 0;

export default Members;

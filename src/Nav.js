import React from 'react';

import { firebase } from './firebase';

import useCollection from './useCollection';

function Nav({ user }) {
  const channels = useCollection('channels');

  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt="User Avatar" src={user.photoURL} />
        <div>
          <div>{user.displayName}</div>
          <div>
            <button
              className="text-button"
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              log out
            </button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(channel => (
          <a key={channel.id} href={`/channel/${channel.id}`}>
            # {channel.id}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default Nav;

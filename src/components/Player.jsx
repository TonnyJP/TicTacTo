import { useState } from 'react';

export const Player = ({ name, symbol, isActive, onPlayerChanged }) => {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const onEditing = (e) => {
    e.preventDefault();
    setIsEditing((val) => !val);
    if (isEditing) {
      onPlayerChanged(symbol, playerName);
    }
  };
  const onChange = (e) => {
    e.preventDefault();
    console.log(' hier, ', e.target, e.currentTarget);
    setPlayerName(e.currentTarget.value);
  };

  const player = isEditing ? (
    <input type='text' onChange={onChange} required value={playerName} />
  ) : (
    <span className='player-name'>{playerName}</span>
  );
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className='player'>
        {player}
        <span className='player-symbol'>{symbol}</span>
      </span>

      <button onClick={onEditing}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
};

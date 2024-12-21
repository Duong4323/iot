import React, { useState } from 'react';
import './room.css';

const RoomControl = ({ roomName, lightState, toggleLight }) => {
  return (
    <div className={`room-control ${lightState ? 'light-on' : 'light-off'}`}>
      <h4>{roomName}</h4>
      <label className="switch">
        <input
          type="checkbox"
          checked={lightState}
          onChange={toggleLight}
        />
        <span className="slider"></span>
        <span className="light-label">Bật đèn</span>
      </label>
    </div>
  );
};

const RoomList = () => {
  const [rooms, setRooms] = useState({
    livingRoom: false,
    bedroom: false,
    kitchen: false,
  });

  const toggleLight = (room) => {
    setRooms((prevRooms) => ({
      ...prevRooms,
      [room]: !prevRooms[room],
    }));
  };

  return (
    <div className="room-list">
      <h2>Danh sách phòng</h2>
      <RoomControl
        roomName="Phòng khách"
        lightState={rooms.livingRoom}
        toggleLight={() => toggleLight('livingRoom')}
      />
      <RoomControl
        roomName="Phòng ngủ"
        lightState={rooms.bedroom}
        toggleLight={() => toggleLight('bedroom')}
      />
      <RoomControl
        roomName="Phòng bếp"
        lightState={rooms.kitchen}
        toggleLight={() => toggleLight('kitchen')}
      />
    </div>
  );
};

const App = () => {
  return (
    <RoomList />
  );
};

export default App;

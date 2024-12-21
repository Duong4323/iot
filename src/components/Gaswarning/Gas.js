import React, { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const Gas = () => {
  const [isWarningActive, setIsWarningActive] = useState(false);
  const [warningLevel, setWarningLevel] = useState(1); // Example: level 1 to 5
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [gasLevel, setGasLevel] = useState(null);

  // MQTT Client setup
  const mqttClient = mqtt.connect('ws://mqtt-broker-url:port'); // Replace with your MQTT broker URL

  // Subscribe to MQTT topics for real-time data
  useEffect(() => {
    mqttClient.on('connect', () => {
      mqttClient.subscribe('temperature-topic');
      mqttClient.subscribe('humidity-topic');
      mqttClient.subscribe('gaslevel-topic');
    });

    mqttClient.on('message', (topic, message) => {
      if (topic === 'temperature-topic') {
        setTemperature(JSON.parse(message.toString()));
      } else if (topic === 'humidity-topic') {
        setHumidity(JSON.parse(message.toString()));
      } else if (topic === 'gaslevel-topic') {
        setGasLevel(JSON.parse(message.toString()));
      }
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  // Handle turning the warning on/off
  const handleControlWarning = () => {
    const deviceId = 'device123'; // Example device ID
    const message = JSON.stringify({ isActive: !isWarningActive });
    const topic = `GASWARNING_CONTROL/${deviceId}`;
    mqttClient.publish(topic, message);
    setIsWarningActive(!isWarningActive);
  };

  // Handle changing the warning level
  const handleChangeWarningLevel = (level) => {
    const deviceId = 'device123'; // Example device ID
    const message = JSON.stringify({ level });
    const topic = `GASWARNING_CHANGE_VALUE/${deviceId}`;
    mqttClient.publish(topic, message);
    setWarningLevel(level);
  };

  return (
    <div>
      <h1>Gas Warning System</h1>

      {/* Gas Warning Control */}
      <div>
        <button onClick={handleControlWarning}>
          {isWarningActive ? 'Turn Off Warning' : 'Turn On Warning'}
        </button>
        <div>
          <label>
            Warning Level:
            <input
              type="number"
              value={warningLevel}
              onChange={(e) => handleChangeWarningLevel(Number(e.target.value))}
              min={1}
              max={5}
            />
          </label>
        </div>
      </div>

      {/* Real-Time Gas Data */}
      <div>
        <p>Gas Level: {gasLevel}</p>
      </div>
    </div>
  );
};

export default Gas;

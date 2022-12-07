import logo from './logo.svg';
import 'antd/dist/reset.css';
import './App.css';
import {gameConfig} from './game/game';
import Phaser from 'phaser'
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { eventEmitter } from './eventEmitter';
import Modal from 'antd/es/modal/Modal';

function App() {
  const [game, setGame] = useState(null);
  const [width, setWidth] = useState('0');
  const [height, setHeight] = useState('0');
  const [openPhoto, setOpenPhoto] = useState(false);

  const startGame = () => {
    if (!game) {
      setGame(new Phaser.Game(gameConfig))
      setWidth('100%');
      setHeight('100%');
    } else {
      const thisGame = game.scene.keys.startScene;
      thisGame.restart();
    }
  };

  useEffect(() => {
    eventEmitter.on('photo', () => {
      setOpenPhoto(true);
      // const thisGame = game?.scene;
      // if (thisGame) {
      //   thisGame.pause('startScene');
      // }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <Button type="primary" onClick={startGame}>Start Game</Button>
      </header>
      <div id="gameCanvasDiv" className="gameCanvas" style={
        {
          width,
          height,
        }
      }>
        {/* <canvas id="gameCanvas1"></canvas> */}
      </div>
      <Modal
        open={openPhoto}
        title="爱你"
        onCancel={() => {
          setOpenPhoto(false);
          const thisGame = game?.scene;
          if (thisGame) {
            thisGame.resume('startScene');
          }
        }}
        footer={null}
      ></Modal>
    </div>
  );
}

export default App;

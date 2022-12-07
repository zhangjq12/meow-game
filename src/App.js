import "antd/dist/reset.css";
import "./App.css";
import { gameConfig } from "./game/game";
import Phaser from "phaser";
import { Button, ConfigProvider, Image, Modal } from "antd";
import { useEffect, useState } from "react";
import { eventEmitter } from "./eventEmitter";
import Fireworks from "./components/fireworks/fireworks";
import { ImageShow } from "./components/images/images";
import zhCN from 'antd/locale/zh_CN';

function App() {
  const [game, setGame] = useState(null);
  const [width, setWidth] = useState("0");
  const [height, setHeight] = useState("0");
  const [openPhoto, setOpenPhoto] = useState(false);
  const [openVictory, setOpenVictory] = useState(false);

  const startGame = () => {
    if (!game) {
      setGame(new Phaser.Game(gameConfig));
      setWidth("100%");
      setHeight("100%");
    } else {
      const thisGame = game.scene.keys.startScene;
      thisGame.restart();
    }
  };

  useEffect(() => {
    eventEmitter.on("photo", () => {
      setOpenPhoto(true);
    });
    eventEmitter.on("victory", () => {
      setOpenVictory(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <header className="App-header">
          <img src="assets/maoxian.png" className="App-logo" alt="logo" />
          <Image src="assets/title.png" preview={false} className="title-logo" />
          <Button type="primary" onClick={startGame}>
            Start Game
          </Button>
        </header>
        <div
          id="gameCanvasDiv"
          className="gameCanvas"
          style={{
            width,
            height,
          }}
        ></div>
        <Modal
          open={openPhoto}
          title="爱你"
          onCancel={() => {
            setOpenPhoto(false);
            const thisGame = game?.scene;
            if (thisGame) {
              thisGame.resume("startScene");
            }
          }}
          footer={null}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <ImageShow />
            <div>
              <Image src="assets/bobo.gif" preview={false} />
            </div>
          </div>
        </Modal>
        <Modal
          open={openVictory}
          onCancel={() => {
            setOpenVictory(false);
            const thisGame = game?.scene;
            if (thisGame) {
              thisGame.start("startScene");
            }
          }}
          footer={null}
        >
          <Fireworks />
          <div className="victoryStr">
            <p>祝贺小喵咪成功过关！</p>
            <p>生日快乐！每一天都开心！</p>
            <p>我爱你！</p>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
}

export default App;

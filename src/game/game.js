

import Phaser from 'phaser'
import Scene1 from './scene/scene1';

export const gameConfig = {
  type: Phaser.AUTO,
  // parent: document.getElementsByClassName('gameCanvas')[0],
  parent: 'gameCanvasDiv',
  // canvas: document.getElementById('gameCanvas1'),
  backgroundColor: '#282c34',
  scale: {
    mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 980 },
    },
  },
  scene: [Scene1],
}

export const globalVariables = {
  totalScore: 0,
}
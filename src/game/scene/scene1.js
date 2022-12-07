import Phaser from 'phaser'
import Char1 from '../character/char1'
import { controllerInit, controllerUpdate } from '../controller/controller'
import { globalVariables } from '../game';
import Collection from '../items/collection';
import Flowers from '../items/flowers';
import Question from '../items/ques';
import Score from '../menu/score';
import Platform1 from '../platforms/combo1'

export default class HelloWorldScene extends Phaser.Scene {
  cursors;
  player;
  constructor() {
    super('startScene')
  }

  preload() {
    // this.load.setBaseURL('https://labs.phaser.io');

    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // this.load.image('red', 'assets/particles/red.png');

    this.load.image('sky', 'assets/blue.jpeg');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('steelbox', 'assets/steelbox.png');
    this.load.image('ques', 'assets/question.jpeg');
    this.load.image('star', 'assets/star.png');
    this.load.image('rosered', 'assets/rosered.png');
    this.load.image('roseblue', 'assets/roseblue.png');
    // this.load.image('bomb', 'assets/sprites/bomb.png');
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 42 }
    );
    // this.load.spritesheet('mitaowalking', 
    //     'assets/mitaowalking.png',
    //     { frameWidth: 240, frameHeight: 240 }
    // );
    // this.load.spritesheet('mitaowalkingright', 
    //     'assets/mitaowalkingright.png',
    //     { frameWidth: 240, frameHeight: 240 }
    // );
    // this.load.spritesheet('mitaostop', 
    //     'assets/mitaostop.png',
    //     { frameWidth: 240, frameHeight: 240 }
    // );
    this.load.spritesheet('mitao', 'assets/mitao.png', { frameWidth: 240, frameHeight: 240 });
  }

  create() {
    globalVariables.totalScore = 0;
    this.createEmitter()
    // this.physics.add.staticSprite(680, 480, 'ques').setSize
  }

  update() {
    controllerUpdate(this.cursors, this.player);
  }

  createEmitter() {
    // const particles = this.add.particles('red')

    // const emitter = particles.createEmitter({
    //   speed: 100,
    //   scale: { start: 1, end: 0 },
    //   blendMode: 'ADD',
    // })

    // const logo = this.physics.add.image(400, 100, 'logo')

    // logo.setVelocity(100, 200)
    // logo.setBounce(1, 1)
    // logo.setCollideWorldBounds(true)

    // emitter.startFollow(logo)
    this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'sky').setScale(12);
    this.physics.world.setBounds(0, 0, 2048, 768);
    this.cameras.main.setBounds(0, 0, 2048, 768);
    
    const platform1 = new Platform1(this);
    const platforms = platform1.create();
    
    const flowers = new Flowers(this);
    const question1 = new Question(this);
    const char1 = new Char1(this);
    this.player = char1.createPlayer();
    const questions = question1.create(this.player, flowers);
    this.physics.add.collider(this.player, platforms);
    this.cursors = controllerInit(this);
    this.cameras.main.startFollow(this.player);

    const scoreText = new Score(this);
    const scoreTextLabel = scoreText.create();

    const collection = new Collection(this);
    collection.create(platforms, this.player, questions, scoreTextLabel);
  }
  
  restart() {
    globalVariables.totalScore = 0;
    if (this.scene.systems.isActive()) {
      this.scene.restart();
    } else {
      this.scene.start();
    }
  }
}
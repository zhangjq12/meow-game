import { eventEmitter } from "../../eventEmitter";

export default class Question {
  scene;
  flowers;
  counts;
  constructor(scene) {
    this.scene = scene;
    this.count = 0;
  }
  create(player, flowers) {
    this.flowers = flowers;
    const ques = this.scene.physics.add
      .staticSprite(680, 530, "ques")
      .setSize(64, 64)
      .setScale(64 / 225);

    this.scene.physics.add.collider(
      ques,
      player,
      (o1, o2) => this.collideCb(o1, o2),
      (o1, o2) => this.processCb(o1, o2)
    );
    // this.scene.physics.add.overlap(player, stars, this.collectStar, null, this);

    return ques;
  }

  underQuestion(player, ques) {
    return player.x > ques.x - 16 && player.x < ques.x + 16;
  }

  collideCb(ques, player) {
    if (player.y > ques.y && this.underQuestion(player, ques)) {
      this.flowers.create();
      this.count ++;
      if (this.count === 10) {
        this.count = 0;
        this.scene.scene.pause('startScene');
        eventEmitter.emit('photo');
      }
    }
  }

  processCb(ques, player) {
    if (player.y > ques.y && this.underQuestion(player, ques)) {
      ques.scene.tweens.add({
        targets: ques,
        y: 520,
        ease: "Power1",
        duration: 100,
        repeat: 1,
        yoyo: true,
      });
    }
  }
}

export default class Enemy {
  scene;
  constructor(scene) {
    this.scene = scene;
  }
  create() {
    const platforms = this.scene.physics.add.staticGroup();

    platforms.create(1000, 736, "ground").setScale(5, 2).refreshBody();

    platforms.create(640, 384, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(950, 220, "ground");

    return platforms;
  }
}
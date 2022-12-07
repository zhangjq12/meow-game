export default class Platform1 {
  scene;
  constructor(scene) {
    this.scene = scene;
  }
  create() {
    
    const platforms = this.scene.physics.add.staticGroup();

    platforms.create(1000, 736, 'ground').setScale(5, 2).refreshBody();

    // platforms.create(360, 610, 'steelbox').setScale(0.5).refreshBody();
    platforms.createMultiple({
      key: 'steelbox',
      repeat: 4,
      setXY: { x: 360, y: 530, stepX: 64 },
    });
    platforms.createMultiple({
      key: 'steelbox',
      repeat: 5,
      setXY: { x: 744, y: 530, stepX: 64 },
    });
    // platforms.create(360, 610, 'ground').setScale(0.1, 0.3).refreshBody();
    // platforms.create(264, 554, 'ground').setScale(0.1, 0.3).refreshBody();
    // platforms.create(660, 538, 'ground');
    // platforms.create(50, 376, 'ground');
    // platforms.create(950, 220, 'ground');

    return platforms;
  }
}

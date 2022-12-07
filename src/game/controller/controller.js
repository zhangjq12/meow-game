export const controllerInit = (scene) => {
  const cursors = scene.input.keyboard.createCursorKeys();
  return cursors;
};

export const controllerUpdate = (cursors, player) => {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors.space.isDown && player.body.touching.down) {
    player.setVelocityY(-600);
  }
};

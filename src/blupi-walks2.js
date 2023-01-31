import Pixmap from "./pixmap";
import AudioPlayer from "./audio-player";
import Point from "./point";
import Rect from "./rect";
import Misc from "./misc";
import Random from "./random";
import BlupiWorld1 from "./blupi-world1";

//------------------------------------------------------------------------

export default class BlupiWalks2 {
  constructor() {
    this.absoluteTime = 0;
    this.start = BlupiWorld1.convertFromDiscret({ x: 4, y: 9 });
    this.distance = 0;

    this.delta = new Point(4, 1); // const from icons
    // this.horizontalMovePerFrame = 14; // exact, but not nice
    this.horizontalMovePerFrame = 8; // better
    this.speed = 80; // 80 pixels / second

    this.isUp = false;
    this.jumpTime = 0;
    this.jumpSpeed = 2;
    this.jumpHeight = 0; // 0..1

    this.origin = new Point(0, 0);
  }

  setOrigin(origin) {
    this.origin = origin;
  }

  isArrowUp(input) {
    return input.keysDown.has("ArrowUp");
  }

  step(device, elapsedTime, input) {
    this.absoluteTime += elapsedTime;

    this.distance += elapsedTime * this.speed;
    this.distance = this.distance % 560;

    // TODO
  }

  draw(device, pixmap) {
    // Draw blupi.
    const goal = Point.add(this.start, this.delta);
    let position = Point.move(this.start, goal, this.distance);
    position = Point.add(this.origin, position);

    let icon;
    if (this.jumpHeight === 0) {
      // Blupi marche.
      const i = Math.trunc(this.distance / this.horizontalMovePerFrame);
      const icons = [1, 2, 1, 3];
      icon = icons[i % icons.length];
    } else {
      // Blupi saute.
      icon = 21;
      // TODO
    }

    const rect = Rect.fromCenterSize(position, 80);
    pixmap.drawIcon(device, "bm1", icon, rect, 1, 0);
  }
}

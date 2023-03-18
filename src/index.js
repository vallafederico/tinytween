import {
  easeLinear,
  easeSpring,
  easeOutExpoGsap,
  easeInExpo,
  easeOutExpo,
  easeInOutCubic,
  easeOutCubic,
  easeInCubic,
  easeInOutQuad,
  easeOutQuad,
  easeInQuad,
} from "./easing.js";

/** Tween class */
export class Tween {
  constructor(target, properties, config = {}) {
    this.init(target, properties, config);
  }

  init(target, properties, config = {}) {
    this.target = target;
    this.properties = Object.keys(properties || {});
    this.from = this.properties.map((prop) => target[prop]);
    this.to = this.properties.map((prop) => properties[prop]);
    this.duration = config.duration || 1000;
    this.easing = config.easing || easeLinear;
    this.delay = config.delay || 0;
    this.onUpdate = config.onUpdate;
    this.onComplete = config.onComplete;
    this.startTime = null;
    return this;
  }

  start() {
    if (!this.startTime) {
      this.startTime = performance.now();

      this.properties.forEach((prop) => {
        const activeTween = Tween.activeTweensByTarget
          .get(this.target)
          ?.get(prop);
        if (activeTween) {
          activeTween.kill();
        }

        if (!Tween.activeTweensByTarget.has(this.target)) {
          Tween.activeTweensByTarget.set(this.target, new Map());
        }

        Tween.activeTweensByTarget.get(this.target).set(prop, this);
      });

      Tween.activeTweens.push(this);

      if (!Tween.animationFrame) {
        Tween.animationFrame = requestAnimationFrame(Tween.tick);
      }
    }
  }

  kill() {
    const index = Tween.activeTweens.indexOf(this);
    if (index !== -1) {
      Tween.activeTweens.splice(index, 1);
      this.properties.forEach((prop) => {
        Tween.activeTweensByTarget.get(this.target)?.delete(prop);
      });
      Tween.pool.push(this);
      this.startTime = null;
    }
  }

  static tick(time) {
    Tween.animationFrame = requestAnimationFrame(Tween.tick);
    const activeTweens = Tween.activeTweens;
    let i = activeTweens.length;

    while (i--) {
      const tween = activeTweens[i];
      if (time < tween.startTime) continue;

      const elapsed = time - tween.startTime;
      const properties = tween.properties;
      const propertyCount = properties.length;

      if (elapsed < tween.duration) {
        for (let j = 0; j < propertyCount; j++) {
          const prop = properties[j];
          tween.target[prop] = tween.easing(
            elapsed,
            tween.from[j],
            tween.to[j] - tween.from[j],
            tween.duration
          );
        }

        if (tween.onUpdate) {
          tween.onUpdate();
        }
      } else {
        for (let j = 0; j < propertyCount; j++) {
          const prop = properties[j];
          tween.target[prop] = tween.to[j];
        }

        if (tween.onComplete) {
          tween.onComplete();
        }
        Tween.pool.push(tween);
        activeTweens.splice(i, 1);
      }
    }

    if (activeTweens.length === 0) {
      cancelAnimationFrame(Tween.animationFrame);
      Tween.animationFrame = null;
    }
  }

  static create(target, properties, config) {
    if (Tween.pool.length > 0) {
      return Tween.pool.pop().init(target, properties, config);
    }
    return new Tween(target, properties, config);
  }
}

Tween.activeTweens = [];
Tween.activeTweensByTarget = new Map(); // Add this line
Tween.pool = [];

/* -- Exports */
export {
  easeLinear,
  easeSpring,
  easeOutExpoGsap,
  easeInExpo,
  easeOutExpo,
  easeInOutCubic,
  easeOutCubic,
  easeInCubic,
  easeInOutQuad,
  easeOutQuad,
  easeInQuad,
};

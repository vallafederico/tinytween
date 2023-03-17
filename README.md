# ttween

ttween (short for TinyTween) is a lightweight, easy-to-use tweening library for animating objects in JavaScript.

## Getting Started

### Install it

First, install.

```node
npm i ttween
```

```node
pnpm i ttween
```

### Copy it?

It's a single js file, no dependencies, so you might want to just copy the index file in your ptoject and import it from there.

### import it

Import it in your file.

```js
import { Tween } from "ttween";
```

Then, create a new Tween instance by passing the target object, the properties to animate, and an optional configuration object:

```js
const target = { x: 0, y: 0 };
const properties = { x: 100, y: 200 };
const config = {
  duration: 1000,
  easing: easeInOutCubic,
  delay: 500,
  onUpdate: () => console.log("Updating"),
  onComplete: () => console.log("Completed"),
};

const tween = new Tween(target, properties, config);
```

Finally, start the tween:

```js
tween.start();
```

## Configuration Parameters

The Tween class accepts the following configuration parameters:

`duration`: The duration of the tween in milliseconds. Default is 1000.

`easing`: The easing function used to calculate the interpolated values. Default
is easeLinear.

`delay`: The delay before the tween starts, in milliseconds. Default is 0.

`onUpdate`: A callback function called on every update tick.

`onComplete`: A callback function called when the tween completes.

#### Defaults

| prop     | default    |
| :------- | :--------- |
| duration | 1000       |
| easing   | easeLinear |
| delay    | 0          |

## Easing Functions

TweenJS includes several easing functions:

easeLinear
easeInQuad
easeOutQuad
easeInOutQuad
easeInCubic
easeOutCubic
easeInOutCubic
easeInExpo
easeOutExpo

You can use these easing functions by importing them:

```js
import { easeInOutCubic } from "ttween";
```

## Object Pooling

TweenJS uses an object pooling system to optimize memory usage and performance. To create a new Tween instance using the object pool, use the Tween.create method:

```js
const tween = Tween.create(target, properties, config);
```

When a tween completes or is killed, it is returned to the object pool for future reuse.

## Kill a Tween

To instantly stop a tween and remove it from the active tweens list, call the kill method on the tween instance:

```js
tween.kill();
```

## Examples

### Basic Tween

```js
import { Tween, easeInOutCubic } from "ttween";

const target = { x: 0, y: 0 };

const tween = new Tween(
  target,
  { x: 100 },
  {
    duration: 1000,
    easing: easeInOutCubic,
    onUpdate: () => console.log("Updating"),
    onComplete: () => console.log("Completed"),
  }
);

tween.start();
```

### Multi Tween

```js
import { Tween, easeInOutCubic } from "ttween";

const target = { x: 0, y: 0 };

const tween = new Tween(
  target,
  { x: 100, y: 200 },
  {
    duration: 1000,
    easing: easeInOutCubic,
    onUpdate: () => console.log("Updating"),
    onComplete: () => console.log("Completed"),
  }
);

tween.start();
```

### Tween with Delay

```js
import { Tween } from "ttween";

const target = { x: 0 };
const properties = { x: 100 };

const tween = new Tween(target, properties, {
  delay: 500,
  onComplete: () => console.log("Completed"),
});

tween.start();
```

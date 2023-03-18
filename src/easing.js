// Linear easing (already in the library)
export function easeLinear(t, b, c, d) {
  return (c * t) / d + b;
}

// Quadratic easing
export function easeInQuad(t, b, c, d) {
  t /= d;
  return c * t * t + b;
}

export function easeOutQuad(t, b, c, d) {
  t /= d;
  return -c * t * (t - 2) + b;
}

export function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

// Cubic easing
export function easeInCubic(t, b, c, d) {
  t /= d;
  return c * t * t * t + b;
}

export function easeOutCubic(t, b, c, d) {
  t = t / d - 1;
  return c * (t * t * t + 1) + b;
}

export function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

// Expo easing
export function easeOutExpo(t, b, c, d) {
  return t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
}

export function easeInExpo(t, b, c, d) {
  return c * Math.pow(2, 10 * (t / d - 1)) + b;
}

export function easeOutExpoGsap(t, b, c, d) {
  return c * (1 - Math.pow(2, (-10 * t) / d)) + b;
}

// Natural easings
export function easeSpring(t, b, c, d, stiffness = 180, damping = 12) {
  const angularFrequency = Math.sqrt(stiffness / 1); // Assuming mass = 1
  const decayConstant = -damping / 2;
  const delta = (decayConstant * t) / d;
  const omegaDt = (angularFrequency * t) / d;

  const displacement =
    c * (1 - Math.exp(delta) * (Math.cos(omegaDt) - delta * Math.sin(omegaDt)));
  return b + displacement;
}

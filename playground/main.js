import "./style.css";
import { Tween, easeOutExpo } from "../src/index.js";

const box = document.querySelector(".box");
const ctrl = { x: 0 };

const duration = 1;

function tweenTiny(target) {
  let pnow = performance.now();

  Tween.create(
    ctrl,
    { x: target },
    {
      duration: duration * 1000,
      easing: easeOutExpo,
      onUpdate: () => {
        box.style.transform = `translateX(${ctrl.x}px)`;
      },
      onComplete: () => {
        console.log("complete", performance.now() - pnow);
      },
    }
  ).start();
}

document.onclick = () => {
  const target = ctrl.x > 500 ? 0 : 1000;
  tweenTiny(target);
};

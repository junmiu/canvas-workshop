const canvas = document.getElementById("myCanvas");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const ctx = canvas.getContext("2d");
let items;

function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

async function sort(arr) {
  const n = arr.length;
  for (let i = n - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j+1]) {
        swap(arr, j, j+1);
      }
    }
    await drawAll(arr);
  }
}

function shuffle(arr) {
  const n = arr.length;
  for(let i = n-1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    swap(arr, j, i);
  }
}

function random(n) {
  const data = [...Array(n).keys()];
  shuffle(data);
  return data;
}

btn1.onclick = function () {
  const n = 100;
  items = random(n);
  drawAll(items);
}

btn2.onclick = function () {
  sort(items);
}

function draw(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

/**
 *
 * @param {number[]} items
 * @return {Promise<unknown>}
 */
function drawAll(items) {
  return new Promise((resolve) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 800, 800);
      items.forEach((item, i) => {
        draw(i*6, 0, 6, item);
      })
      resolve();
    }, 10);
  });
}

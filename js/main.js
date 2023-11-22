var banner = [];
var flag = false;
for (let i = 0; i < 7; i++) {
  banner[i] = document.getElementById(`banner_${i}`);
}

const fadeIn = (el, timeout, delay, display) => {
  el.style.opacity = 0;
  el.style.display = display || 'block';
  el.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    el.style.opacity = 1;
  }, delay);
};

const fadeOut = (el, timeout) => {
  el.style.opacity = 1;
  el.style.transition = `opacity ${timeout}ms`;
  el.style.opacity = 0;

  setTimeout(() => {
    el.style.display = 'none';
  }, timeout);
};


fadeIn(banner[1], 2000, 100, 'block');
fadeIn(banner[2], 2000, 1000, 'block');
fadeIn(banner[3], 2000, 1800, 'block');
fadeIn(banner[4], 2000, 2600, 'block');
fadeIn(banner[5], 2000, 3400, 'block');
fadeIn(banner[6], 2000, 4200, 'flex');










const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 1019;
const currentFrame = index => (
  `../assets/video/frame_${index.toString()}.jpg`
)
console.log(currentFrame);

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=2560;
canvas.height=1440;
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop - window.screen.height*3;
  const maxScrollTop = html.scrollHeight - window.innerHeight - window.screen.height*3;
  const scrollFraction = scrollTop / maxScrollTop;

  if ((html.scrollTop > window.screen.height*3)&&(!flag)){
    document.getElementById(`hero-lightpass`).style.zIndex = -1;
    fadeIn(document.getElementById(`hero-lightpass`), 500, 1, 'block');
    flag = true;
  }
  if ((html.scrollTop < window.screen.height*3)&&(flag)){
    document.getElementById(`hero-lightpass`).style.zIndex = 0;
    fadeOut(document.getElementById(`hero-lightpass`), 500);
    flag = false;
  }

  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  requestAnimationFrame(() => updateImage(frameIndex + 1))

});


preloadImages()
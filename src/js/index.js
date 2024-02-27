const track = document.getElementById("image-track");

window.handleOnDown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
};

window.handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

window.handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage;
  let nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

function handleOnMouseLeave(event) {

  event.target.style.transform = 'scale(1)';
  event.target.style.filter = 'brightness(100%)';
}

function handleOnMouseEnter(event) {
  event.target.style.transform = 'scale(1.1)';
  event.target.style.filter = 'brightness(70%)';
}

const images = track.getElementsByClassName("image");
for (const image of images) {
  image.addEventListener('mouseenter', handleOnMouseEnter);
  image.addEventListener('mouseleave', handleOnMouseLeave);
}

// Util function to create confetti using js-confetti: https://www.npmjs.com/package/js-confetti
const jsConfetti = new JSConfetti();

// Get the canvas element and the canvas context.
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Get window height and width size.
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

// Set canvas height and width taking the window size.
canvas.height = windowHeight;
canvas.width = windowWidth;

canvas.style.background = "#000";

// DVD svg paths.
const svg = `
  M91.053 0 L77.334 57.707 L179.614 57.746 h24 
  c65.747 0 105.91 26.44 94.746 73.4 
  c-12.147 51.133-69.613 73.4-130.67 73.4 h-22.947
  l29.787-125.45 h-102.27 l-43.521 183.2 h145.05
  c109.07 0 212.76-57.573 231.01-131.15 
  c3.3467-13.507 2.8806-47.253-5.3594-67.359 
  c-0.21299-0.787-0.42594-1.4-1.1855-3 
  c-0.293-0.653-0.56012-3.6412 1.1465-4.2812 
  c0.947-0.36 2.7069 1.4944 2.9336 2.041 
  c0.853 2.24 1.5059 3.9062 1.5059 3.9062 
  l92.293 260.6 l234.97-265.21 l99.535-0.089844 
  h24 c65.76 0 106.25 26.44 95.092 73.4 
  c-12.147 51.133-69.947 73.4-131 73.4 
  h-22.959 l29.799-125.47 h-102.27 l-43.533 183.21 
  h145.07 c109.05 0 213.48-57.4 231-131.15 
  c17.52-73.75-59.107-131.15-168.69-131.15 
  h-216.4 s-57.319 67.88-67.959 80.693 
  c-57.12 68.787-67.241 87.226-68.961 91.986 
  c0.24-4.8-1.8138-23.412-26.174-92.959 
  c-6.48-18.52-27.359-79.721-27.359-79.721 h-389.25 
  zm408.77 324.16 c-276.04 0-499.83 31.72-499.83 70.84 
  s223.79 70.84 499.83 70.84 c276.04 0 499.83-31.72 499.83-70.84 
  s-223.79-70.84-499.83-70.84 zm-18.094 48.627 
  c63.04 0 114.13 10.573 114.13 23.613 s-51.095 23.613-114.13 23.613 
  c-63.027 0-114.13-10.573-114.13-23.613 s51.106-23.613 114.13-23.613 
`;
const svgWidth = 1058.4;
const svgHeight = 465.84;

// Generate random hex color code util function
const getRandomHexColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Create the DVD class.
class DVD {
  constructor({ context, svg, x, y, speed, width, height, color }) {
    this.context = context;
    this.svg = new Path2D(svg);
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.color = color;

    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;

    // Bind animate method to the instance.
    this.animate = this.animate.bind(this);
  }

  draw() {
    // Clear the previous draw.
    this.context.clearRect(0, 0, windowWidth, windowHeight);

    this.context.save();
    this.context.scale(this.width / svgWidth, this.height / svgHeight);
    this.context.fillStyle = this.color;
    this.context.translate(
      this.x * (svgWidth / this.width),
      this.y * (svgHeight / this.height)
    );
    this.context.fill(this.svg);
    this.context.restore();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    const newColor = getRandomHexColor();

    // Check if the draw is bouncing off the edges.
    if (this.x + this.width > windowWidth || this.x < 0) {
      this.color = newColor;
      this.dx = -this.dx;
    }

    if (this.y + this.height > windowHeight || this.y < 0) {
      this.color = newColor;
      this.dy = -this.dy;
    }

    if (
      (this.x < 0 && this.y < 0) ||
      (this.x + this.width > windowWidth && this.y < 0) ||
      (this.x < 0 && this.y + this.height > windowHeight) ||
      (this.x + this.width > windowWidth && this.y + this.height > windowHeight)
    ) {
      jsConfetti.addConfetti();
    }
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.draw();
    this.update();
  }
}

new DVD({
  svg,
  context,
  x: 0,
  y: 0,
  speed: 3,
  width: 320,
  height: 141,
  color: "#fff",
}).animate();

<template>
  <div>
    <canvas
      ref="gameCanvas"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvasWidth: 500,
      canvasHeight: 480,
      game: null,
    };
  },
  mounted() {
    this.initGame();
  },
  methods: {
    initGame() {
      const canvas = this.$refs.gameCanvas;
      const ctx = canvas.getContext("2d");

      // Game objects and variables
      const player = {
        x: this.canvasWidth / 2,
        y: this.canvasHeight - 50,
        width: 50,
        height: 50,
        speed: 5,
      };

      const coin = {
        x: Math.random() * (this.canvasWidth - 20),
        y: 0,
        width: 20,
        height: 20,
        speed: 1,
        active: true,
      };

      let objects = [];

      const keys = {};
      let score = 0;
      let gameOver = false;
      let roadOffset = 0;

      // Event listeners for keydown and keyup events
      window.addEventListener("keydown", (event) => {
        keys[event.code] = true;
      });

      window.addEventListener("keyup", (event) => {
        keys[event.code] = false;
      });

      function spawnObjects() {
        if (Math.random() < 0.01) {
          objects.push({
            x: Math.random() * (canvas.width - 50),
            y: 0,
            width: 50,
            height: 50,
            speed: Math.random() * 2 + 1,
          });
        }

        if (Math.random() < 0.005 && !coin.active) {
          coin.x = Math.random() * (canvas.width - 20);
          coin.y = 0;
          coin.active = true;
        }
      }

      function update() {
        if (gameOver) return;

        // Update player position based on key presses
        if (keys["ArrowLeft"] && player.x > 0) {
          player.x -= player.speed;
        }
        if (keys["ArrowRight"] && player.x < canvas.width - player.width) {
          player.x += player.speed;
        }

        // Move objects and coins downwards
        objects.forEach((obj) => {
          obj.y += obj.speed;
        });
        coin.y += coin.speed;

        // Check for collisions between player and coin
        if (
          player.x < coin.x + coin.width &&
          player.x + player.width > coin.x &&
          player.y < coin.y + coin.height &&
          player.y + player.height > coin.y
        ) {
          // Coin collected, set coin to inactive
          coin.active = false;
          score += 10;
        }

        if (coin.y > player.y + player.height) {
          coin.active = false;
        }

        // Move coin downwards only if it's active
        if (coin.active) {
          coin.y += coin.speed;
        }

        // Check for collisions between player and objects
        for (let i = 0; i < objects.length; i++) {
          const obj = objects[i];
          if (
            player.x < obj.x + obj.width &&
            player.x + player.width > obj.x &&
            player.y < obj.y + obj.height &&
            player.y + player.height > obj.y
          ) {
            gameOver = true;
            break;
          }
        }

        // Remove objects that are out of the canvas
        objects = objects.filter((obj) => obj.y < canvas.height);

        // Spawn new objects and coins
        spawnObjects();

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw road
        // ctx.fillStyle = "#444";
        // ctx.fillRect(canvas.width * 0.25 - 5, roadOffset, 10, canvas.height);
        // ctx.fillRect(canvas.width * 0.75 - 5, roadOffset, 10, canvas.height);
        // roadOffset = (roadOffset + 1) % canvas.height;

        // Draw player
        ctx.fillStyle = "blue";
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // Draw coin
        ctx.fillStyle = "yellow";
        ctx.fillRect(coin.x, coin.y, coin.width, coin.height);

        // Draw objects
        ctx.fillStyle = "red";
        for (const obj of objects) {
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        }

        // Draw score
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + Math.floor(score), 10, 30);

        // Check if game is over
        if (gameOver) {
          ctx.font = "40px Arial";
          ctx.fillStyle = "black";
          ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
        } else {
          // Request the next frame
          requestAnimationFrame(update);
        }
      }

      // Start the game loop
      update();
    },
  },
};
</script>

<style scoped>
canvas {
  display: block;
  margin: 0 auto;
  background-color: #f0f0f0;
}
</style>

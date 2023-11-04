class SpaceGame {
  #x;
  #y;
  #rocket;
  #upArrow;
  #downArrow;
  #leftArrow;
  #rightArrow;
  #animationId;
  #gameId;
  #flame;
  #musicPlay;
  #planetA;
  #planetB;
  #planetC;
  #link;
  #coins;
  #result;

  constructor() {
    this.#x = 0;
    this.#y = 0;
    this.#rocket = document.getElementById("rocket");
    this.#upArrow = document.getElementById("upArrow");
    this.#downArrow = document.getElementById("downArrow");
    this.#leftArrow = document.getElementById("leftArrow");
    this.#rightArrow = document.getElementById("rightArrow");
    this.#animationId = "";
    this.#gameId = "";
    this.#flame = document.getElementById("flame");
    this.#musicPlay = false;
    this.#planetA = document.getElementById("planetA");
    this.#planetB = document.getElementById("planetB");
    this.#planetC = document.getElementById("planetC");
    this.#link = document.getElementById("visit");
    this.#coins = [...document.querySelectorAll(".coin")];
    this.#result = document.getElementById("result");
  }

  onArrowAction = (type, evt) => {
    evt.preventDefault();
    this.#animationId = setInterval(() => {
      if (!this.#musicPlay) {
        document.getElementById("music").play();
        this.#musicPlay = true;
      }
      const vw =
        Math.min(
          document.documentElement.clientWidth || 0,
          window.innerWidth || 0
        ) - 150;
      const vh =
        Math.min(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0
        ) - 150;

      switch (type) {
        case "up":
          if (this.#y - 5 < 0) {
            return;
          }

          this.#rocket.style = `transform: translate(${
            this.#x
          }px, ${(this.#y -= 5)}px) rotate(0deg);`;
          break;
        case "down":
          if (this.#y + 5 > vh) {
            return;
          }

          this.#rocket.style = `transform: translate(${
            this.#x
          }px, ${(this.#y += 5)}px) rotate(180deg);`;
          break;
        case "left":
          if (this.#x - 5 < 0) {
            return;
          }

          this.#rocket.style = `transform: translate(${(this.#x -= 5)}px, ${
            this.#y
          }px) rotate(270deg);`;
          break;
        case "right":
          if (this.#x + 5 > vw) {
            return;
          }

          this.#rocket.style = `transform: translate(${(this.#x += 5)}px, ${
            this.#y
          }px) rotate(90deg);`;
          break;
      }
    }, 10);
    this.#flame.style = "display: block;";
  };

  onUpArrow = (evt) => this.onArrowAction("up", evt);

  onDownArrow = (evt) => this.onArrowAction("down", evt);

  onLeftArrow = (evt) => this.onArrowAction("left", evt);

  onRightArrow = (evt) => this.onArrowAction("right", evt);

  release = (evt) => {
    clearInterval(this.#animationId);
    this.#flame.style = "display: none;";
  };

  distance = (ax, ay, bx, by) => {
    return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
  };

  calculate = (evt) => {
    this.#gameId = setInterval(() => {
      const transformPos = window.getComputedStyle(this.#rocket).transform;
      const currentX = +this.#rocket.offsetLeft + +transformPos.split(",")[4];
      const currentY =
        +this.#rocket.offsetTop + +transformPos.split(",")[5].replace(")", "");

      const requiredDistance = 80;
      if (
        this.distance(
          currentX,
          currentY,
          this.#planetA.offsetLeft,
          this.#planetA.offsetTop
        ) < requiredDistance
      ) {
        this.#link.style = "display: block;";
        this.#link.firstChild.href = "./projects";
        this.#planetA.querySelector("p").style = "color: red";
      } else if (
        this.distance(
          currentX,
          currentY,
          this.#planetB.offsetLeft,
          this.#planetB.offsetTop
        ) < requiredDistance
      ) {
        this.#link.style = "display: block;";
        this.#link.firstChild.href = "./education";
        this.#planetB.querySelector("p").style = "color: red";
      } else if (
        this.distance(
          currentX,
          currentY,
          this.#planetC.offsetLeft,
          this.#planetC.offsetTop
        ) < requiredDistance
      ) {
        this.#link.style = "display: block;";
        this.#link.firstChild.href = "./experience";
        this.#planetC.querySelector("p").style = "color: red";
      } else {
        this.#link.style = "display: none;";
        this.#planetA.querySelector("p").style = "";
        this.#planetB.querySelector("p").style = "";
        this.#planetC.querySelector("p").style = "";
      }

      this.#coins
        .filter((coin) => !coin.style.display.includes("none"))
        .forEach((coin) => {
          if (
            this.distance(currentX, currentY, coin.offsetLeft, coin.offsetTop) <
            60
          ) {
            coin.style = "display: none;";
            if (+this.#result.textContent < 5) {
              this.#result.textContent = +this.#result.textContent + 1;
            }
          }
        });
    }, []);
  };

  init = () => {
    document.oncontextmenu = document.body.oncontextmenu = function () {
      return false;
    };

    this.#upArrow.addEventListener("mousedown", this.onUpArrow);
    this.#upArrow.addEventListener("touchstart", this.onUpArrow);

    this.#downArrow.addEventListener("mousedown", this.onDownArrow);
    this.#downArrow.addEventListener("touchstart", this.onDownArrow);

    this.#leftArrow.addEventListener("mousedown", this.onLeftArrow);
    this.#leftArrow.addEventListener("touchstart", this.onLeftArrow);

    this.#rightArrow.addEventListener("mousedown", this.onRightArrow);
    this.#rightArrow.addEventListener("touchstart", this.onRightArrow);

    document.addEventListener("mouseup", this.release);
    document.addEventListener("touchend", this.release);

    document.addEventListener("mousedown", this.calculate);

    document.getElementById("play").addEventListener("click", () => {
      document.getElementById("instruction").style =
        "transform: translateY(300vh);";
      if (!this.#musicPlay) {
        document.getElementById("music").play();
        this.#musicPlay = true;
      }
    });
  };
}

const Game = new SpaceGame();

Game.init();

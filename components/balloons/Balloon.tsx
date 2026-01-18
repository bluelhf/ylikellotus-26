export class Balloon {
    /**
     * The x-coordinate of the balloon as a percentage of the window width (100 meaning full window width),
     * where 0 is the left side of the screen and 100 is the right side of the screen.
     * */
    public x: number;
    /**
     * The y-coordinate of the balloon as a percentage of the window height (100 meaning full window height),
     * where 0 is the top of the screen and 100 is the bottom of the screen.
     * */
    public y: number;

    /**
     * The vertical velocity of the balloon, as a percentage of window height per second.
     * */
    public vy: number;

    /**
     * The horizontal velocity of the balloon, as a percentage of window width per second.
     * */
    public vx: number;
    public age: number = 0;

    constructor(
        x = Math.random() * 100,
        y: number = Math.random() * 100,
        vx: number = (Math.random() - 0.5) * 10,
        vy: number = (Math.random() - 1) * 5 - 12.5,
    ) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }

    tick(dt: number) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.age += dt;
    }

    applyImpulse(dx: number, dy: number) {
        this.vx += dx;
        this.vy += dy;
    }
}
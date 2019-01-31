import {
    Engine,
    Render,
    Runner,
    Composite,
    Composites,
    Common,
    Constraint,
    MouseConstraint,
    Mouse,
    World,
    Bodies,
    Body
} from 'matter-js';

export default class eye {
    constructor(world) {
        this.body = Bodies.circle(0, 0, 30);
        this.size = Math.min(window.innerWidth/10,70);

        this.constraint = Constraint.create({
            render: {
                visible: false
            },
            pointA: {x: 0, y: 0},
            bodyB: this.body,
            pointB: {x: -this.size/6, y: -this.size/6},
            stiffness: 0.1,
            damping: 0.03
        });
        World.add(world, [this.body, this.constraint]);

        this.position = {x: 0, y: 0};
    }

    updatePosition(x, y) {
        this.position.x = x;
        this.position.y = y;

        Body.setPosition(this.body, {x: this.position.x, y: this.position.y});
        this.constraint.pointA.x = this.position.x;
        this.constraint.pointA.y = this.position.y;

    }

    render(ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = '#000000';
        ctx.arc(this.body.position.x, this.body.position.y, this.size/2, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}
import React, {Component} from 'react';
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
    Bodies
} from 'matter-js';

class googlyEyes extends Component {

    constructor() {
        super();

        this.engine = Engine.create();
        this.world = this.engine.world;
    }

    componentDidMount() {
        this.center = {x: window.innerWidth / 2, y: window.innerHeight / 2};

        this.ctx = this.refs.canvas.getContext('2d');
        //INITIALIZATION DES OPTIONS
        this.render = Render.create({
            canvas: this.refs.canvas,
            engine: this.engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                showAngleIndicator: true
            }
        });

        this.startEngine();
        this.createEye();
        this.addMouse();
        this.startRender();

        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('devicemotion', this.updateMotion.bind(this));
    }

    updateMotion(event){
        let x = event.accelerationIncludingGravity.x;
        let y = event.accelerationIncludingGravity.y;
        let z = event.accelerationIncludingGravity.z;

        let gravity = this.engine.world.gravity;
        gravity.x = -x;
        gravity.y = y;
    }

    onResize(){
        this.refs.canvas.width = window.innerWidth;
        this.refs.canvas.height = window.innerHeight;
    }

    startRender() {
        Render.lookAt(this.render, {
            min: {x: 0, y: 0},
            max: {x: 800, y: 600}
        });
    }

    addMouse() {
        // add mouse control
        let mouse = Mouse.create(this.render.canvas),
            mouseConstraint = MouseConstraint.create(this.engine, {
                mouse: mouse,
                constraint: {
                    // allow bodies on mouse to rotate
                    angularStiffness: 0,
                    render: {
                        visible: false
                    }
                }
            });

        World.add(this.world, mouseConstraint);
    }

    startEngine() {
        this.draw();

    }

    draw() {
        let bodies = Composite.allBodies(this.engine.world);

        Engine.update(this.engine, 16);
        if (bodies.length) {
            this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            this.ctx.beginPath();
            this.ctx.fillStyle = '#ffffff';
            this.ctx.arc(this.center.x, this.center.y, 50, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();

            this.ctx.beginPath();
            this.ctx.fillStyle = '#000000';
            this.ctx.arc(bodies[0].position.x, bodies[0].position.y, 20, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
        }

        requestAnimationFrame(() => this.draw());
    }

    createEye() {
        let body = Bodies.circle(this.center.x, this.center.y, 30);

        let constraint = Constraint.create({
            render: {
                visible: false
            },
            pointA: {x: this.center.x, y: this.center.y},
            bodyB: body,
            pointB: {x: -10, y: -10},
            stiffness: 0.1,
            damping: 0.03
        });
        World.add(this.world, [body, constraint]);
    }

    render() {
        return (
            <canvas className="googlyEyes" ref={"canvas"}></canvas>
        );
    }
}

export default googlyEyes;

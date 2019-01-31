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

import Physic from '../classes/physic'
import Eye from '../classes/eye'
import Camera from '../classes/camera'

class googlyEyes extends Component {

    constructor() {
        super();
        this.camera = new Camera();
        this.eyes = [];
    }

    picture() {
        this.camera.takeSnapShot();
    }

    componentDidMount() {
        this.physic = new Physic(this.refs.canvas);
        this.physic.addMouse();

        this.ctx = this.refs.canvas.getContext('2d');
        //INITIALIZATION DES OPTIONS

        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('devicemotion', this.updateMotion.bind(this));

        this.refs.canvas.addEventListener('click', this.onClick.bind(this), false);
        this.refs.canvas.addEventListener('touchstart', this.onClick.bind(this), false);

        this.draw();
    }

    updateMotion(event) {
        let x = event.accelerationIncludingGravity.x;
        let y = event.accelerationIncludingGravity.y;

        this.physic.updateGravity(x, y)
    }

    onResize() {
        this.physic.resize();
        this.refs.canvas.width = window.innerWidth;
        this.refs.canvas.height = window.innerHeight;
    }

    draw() {
        // let bodies = Composite.allBodies(this.engine.world);
        this.physic.update();
        // if (bodies.length) {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        // }

        let videoW = this.camera.video.videoWidth;
        let videoH = this.camera.video.videoHeight;
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let ratio = Math.max(windowWidth / videoW, windowHeight / videoH);
        let newVideoW = videoW * ratio;
        let newVideoH = videoH * ratio;
        let newX = (windowWidth - newVideoW) / 2;
        let newY = (windowHeight - newVideoH) / 2;
        this.ctx.drawImage(this.camera.video, 0, 0, videoW, videoH, newX, newY, newVideoW, newVideoH);

        for (let i = 0; i < this.eyes.length; i++) {
            this.eyes[i].render(this.ctx);
        }


        requestAnimationFrame(() => this.draw());
    }

    onClick(e) {
        if (e.targetTouches) {
            e = e.targetTouches[0];
        }
        let eye = new Eye(this.physic.world);
        eye.updatePosition(e.clientX, e.clientY);
        this.eyes.push(eye);
    }

    render() {
        return (
            <canvas className="googlyEyes" ref={"canvas"}></canvas>
        );
    }
}

export default googlyEyes;

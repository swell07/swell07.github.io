//---------CLASS PARTICLE------
// Particle(PVector l, float _r, color _c, float vx, float vy, float ax, float ay, boolean isFRun, ParticleSystem ps)
function Particle(l, px, py, _r, _c, vx, vy, ax, ay, isFRun, ps) {
    //init begin
    var me = this;
    me.acceleration = createVector(ax, ay); //new PVector(0, random(-0.05, 0.05));
    me.velocity = createVector(vx, vy);
    me.location = l.copy(); //get is deprecated.
    me.plocation = createVector(px, py);
    me.r = _r * random(3);
    me.isFlowerRun = isFRun;

    me.lifespan = 299.0;
    me.velLim = 5.0;
    me.c = _c;
    me.X = ps.mseX;
    me.Y = ps.mseY;
    //init end

    me.run = function() {
        return me.isFlowerRun ? me.flowerRun() : me.normalRun();
    }

    me.flowerRun = function() {
        var rlim = random(20, 100);
        var dist = me.location.dist(createVector(me.X, me.Y));
        if (dist > rlim) {
            me.velocity.set(me.velocity.x * -1, me.velocity.y * -1)
        }
        me.velocity.add(me.acceleration);
        me.location.add(me.velocity);
        me.lifespan -= 1.0;

        stroke(0, me.lifespan);
        strokeWeight(0);
        fill(me.c.levels[0], me.c.levels[1], me.c.levels[2], me.lifespan);
        ellipse(me.location.x, me.location.y, me.r, me.r);
    }

    me.normalRun = function() {
        me.velocity.add(me.acceleration);
        me.location.add(me.velocity);
        me.lifespan -= 1.0;

        stroke(0, me.lifespan);
        strokeWeight(0);
        fill(me.c.levels[0], me.c.levels[1], me.c.levels[2], me.lifespan);
        //ellipse(me.location.x, me.location.y, me.r, me.r);
        line(me.location.x, me.location.y, me.plocation.x, me.plocation.y);
    }

    me.isDead = function() {
        return me.lifespan < 0.0 ? true : false
    }
}


//---------------CLASS PS------------------
// ParticleSystem(PVector location, float r, color[] _colors) {
function ParticleSystem(location, r, colors) {
    // float speed, angle, distance, vx, vy, ax, ay;

    //init
    var me = this;
    me.origin = location.copy();
    me.particles = [];
    me.isStart = false;
    me.isFlower = false;
    me.isOver = false;
    me.colors = colors;
    me.r = 5;
    me.mseX = 0.001;
    me.mseY = 0.002;
    me.prevMseX = 0.003;
    me.prevMseY = 0.004;
    //init end

    me.addParticle = function() {
        if (!me.isOver) {
            if ((me.mseX == me.prevMseX) && (me.mseY == me.prevMseY)) {
                var speed = random(0.01, 1);
                var angle = random(360);
                var distance = 0.05 * me.mseX / width;
                var vx = random(-0.01, 0.01);
                var vy = random(-0.01, 0.01);
                var ax = distance * cos(radians(angle));
                var ay = distance * sin(radians(angle));
                var colorchange = (random(1) < 0.5) ? lerpColor(colors[0], colors[1], random(1)) : lerpColor(colors[2], colors[3], random(1));
                me.particles.push(new Particle(me.origin, me.prevMseX, me.prevMseY, me.r, colorchange, vx, vy, ax, ay, true, me));
            } else {
                var vx = 0;
                var vy = random(0, 1);
                var ax = random(-0.02, 0.04);
                var ay = random(0.1);
                var colorchange = (random(1) < 0.5) ? colorchange = lerpColor(colors[0], colors[1], random(1)) : lerpColor(colors[2], colors[3], random(1));
                me.particles.push(new Particle(me.origin, me.prevMseX, me.prevMseY,me.r, colorchange, vx, vy, ax, ay, false, me));
            }
        }
        if (me.particles.length > 0) {
            for (var i = me.particles.length - 1; i >= 0; i--) {
                p = me.particles[i];
                p.run()
                if (p.isDead()) {
                    me.particles.splice(i, 1)
                }
            }
        }
    }

    me.updateOrigin = function() {
        me.origin = createVector(me.mseX, me.mseY);
    }

    me.updateMouse = function(x, y) {
        me.prevMseX = me.mseX;
        me.prevMseY = me.mseY;
        me.mseX = x;
        me.mseY = y;
        me.updateOrigin();
    }

    me.destory = function() {
        me.isOver = true
    }
}

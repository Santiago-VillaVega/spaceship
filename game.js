(function() {
    'use strict';
    window.addEventListener('load', init, false);
    var KEY_ENTER = 13,
        KEY_LEFT = 37,
        KEY_UP = 38,
        KEY_RIGHT = 39,
        KEY_DOWN = 40,

        canvas = null,
        ctx = null,
        x = 50,
        y = 50,
        lastPress = null,
        pressing = [],
        pause = true;

    function init() {
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');

        run();
        repaint();
    }
    
    function run() {
        setTimeout(run, 50);
        act();
    }

    function repaint() {
        requestAnimationFrame(repaint);
        paint(ctx);
    }

    function act() {
        if (!pause) {
            // Move Rect
            if (pressing[KEY_UP])
                y-=10;
            if (pressing[KEY_RIGHT])
                x+=10;
            if (pressing[KEY_DOWN])
                y+=10;
            if (pressing[KEY_LEFT])
                x-=10;
                
            // Out Screen
            if (x > canvas.width)
                x=0;
            if (y > canvas.heigth)
                y=0;
            if (x < 0)
                x = canvas.width;
            if (y < 0)
                y = canvas.heigth;                
        }
        // Pause/Unpause
        if (lastPress == KEY_ENTER) {
            pause = !pause;
            lastPress = null;
        }
    }

    function paint(ctx) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f00';
        ctx.fillRect(x, y, 10, 10);
        ctx.fillStyle = '#0f0';
        //ctx.fillText('Last Press: ' + lastPress, 0, 20);
        if (pause) {
            ctx.textAlign = 'center';
            ctx.fillText('PAUSE', 150, 75);
            ctx.textAlign = 'left';
        }
    }

    document.addEventListener('keydown', function(evt) {
        lastPress = evt.keyCode;
        pressing[evt.keyCode] = true;
    }, false);

    document.addEventListener('keyup', function(evt) {
        pressing[evt.keyCode] = false;
    }, false);

    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               function(callback) {
                   window.setTimeout(callback, 17);
               };
    })();
})();
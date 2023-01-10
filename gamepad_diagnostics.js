var gamepadIdx = -1;
var gamepadLastTimestamp = -1;

window.addEventListener('gamepadconnected', function(e) {
    var gamepad = navigator.getGamepads()[e.gamepad.index];

    gp_id.innerText = gamepad.id;
    gp_index.innerText = gamepad.index;
    gp_mapping.innerText = gamepad.mapping;
    gp_axes_num.innerText = gamepad.axes.length;
    gp_buttons_num.innerText = gamepad.buttons.length;

    gp_axes.innerHTML = '';
    gp_buttons.innerHTML = '';

    for (var i = 0; i < gamepad.axes.length; i++) {
        var line = document.createElement('div');
        line.innerHTML = `Axis ${i}: <span id="axis_${i}"></span>`;
        gp_axes.appendChild(line);
    }

    for (var i = 0; i < gamepad.buttons.length; i++) {
        var line = document.createElement('div');
        line.innerHTML = `Button ${i}: <span id="button_${i}"></span>`;
        gp_buttons.appendChild(line);
    }

    gamepadIdx = gamepad.index;
});

window.addEventListener('gamepaddisconnected', function(e) {
    if (e.gamepad.index == gamepadIdx) {
        gp_id.innerText = '';
        gp_index.innerText = '';
        gp_mapping.innerText = '';
        gp_timestamp.innerText = '';
        gp_axes_num.innerText = '';
        gp_buttons_num.innerText = '';

        gp_axes.innerHTML = '<span class="red">Please connect your gamepad device and press any key on it!</span>';
        gp_buttons.innerHTML = '';

        gamepadIdx = -1;
    }
});

function frame(timestamp) {

    if (gamepadIdx > -1) {
        var gamepad = navigator.getGamepads()[gamepadIdx];

        if (gamepad) {

            var timestamp = gamepad.timestamp;

            if (timestamp != gamepadLastTimestamp) {

                gp_timestamp.innerText = Math.round(timestamp);

                for (var i = 0; i < gamepad.axes.length; i++) {
                    var axis = gamepad.axes[i];

                    var axisElem = document.getElementById(`axis_${i}`);

                    if (axis)
                        axisElem.innerText = axis.toFixed(3);
                    else
                        axisElem.innerText = '0';
                }

                for (var i = 0; i < gamepad.buttons.length; i++) {
                    var button = gamepad.buttons[i];
                    var pressed = button.pressed;
                    var value = button.value;

                    var buttonElem = document.getElementById(`button_${i}`);

                    if (pressed)
                        buttonElem.innerText =
                                `pressed`;
                    else
                        buttonElem.innerText = '';
                }
            }

            gamepadLastTimestamp = timestamp;
        }

    }

    window.requestAnimationFrame(frame);
}

window.requestAnimationFrame(frame);


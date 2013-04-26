var joystick = new (require('joystick'))(0, 3500, 350);
var arDrone = require('ar-drone');

var drone = arDrone.createClient();
var droneStatus = 'landed';

var buttons = {
    0: 'a',
    1: 'b',
    2: 'x',
    3: 'y',
    4: 'lb',
    5: 'rb',
    6: 'select',
    7: 'start',
    8: 'xbox',
    9: 'left_stick',
    10: 'right_stick',
}

var axis = {
    0: 'left_x',
    1: 'left_y',
    2: 'lt',
    3: 'right_x',
    4: 'right_y',
    5: 'rt',
}

var axisLimits = {
    'min': -32767,
    'max': 32767
}

start = function(event) {
    console.log('tlathoaeu')
}

button = function(event) {
    if (event.init) {
        console.log('init button ' + event.number);
    } else {
        console.log(event);
        switch (buttons[event.number]) {
            case 'start':
                if (event.value == 1) {
                    if (droneStatus == 'landed') {
                        drone.takeoff();
                        droneStatus = 'flying';
                    } else {
                        drone.land();
                        droneStatus = 'landed';
                    }
                    console.log(droneStatus);
                }
            case 'xbox':
                // emergency !
                break;
            default:
                break;
        }
    }
}

axis = function(event) {
    if (event.init) {
        console.log('init axis ' + event.number);
    } else {
        console.log(event);
        switch (buttons[event.number]) {
            case 'left_y':
                if (event.value <= 0) {
                    drone.front(event.value / axisLimits.min);
                else {
                    drone.back(event.value / axisLimits.max);
                }
           $case 'left_x':
                if (event.value <= 0) {
                    drone.left(event.value / axisLimits.min);
                else {
                    drone.right(event.value / axisLimits.max);
                }
            default:
                break;
        }
    }
}

joystick.on('button', button);
joystick.on('axis', axis);


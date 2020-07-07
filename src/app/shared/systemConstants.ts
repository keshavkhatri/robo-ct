// Systems constants used app wide

const DIRECTIONS = {
    NORTH: 'north',
    SOUTH: 'south',
    EAST: 'east',
    WEST: 'west'
};

const SIDES = {
    LEFT: 'left',
    RIGHT: 'right'
}

const MESSAGES = {
    TITLE:'Robo CT',
    PLACE:'Place',
    REPORT:'Report',
    MOVE:'Move',
    LEFT:'Left',
    RIGHT:'Right',
    ERROR_X: 'X axis value is not correct',
    ERROR_Y: 'Y axis value is not correct',
    ERROR_DIRECTION: 'Direction is not correct',
    LABEL_X: 'X axis between 0 to ',
    LABEL_Y: 'Y axis between 0 to ',
    LABEL_DIRECTION: 'One of north, south, east, west',
    HEADER_PLACE: 'Place me anywhere',
    TEXT_CANCEL: 'Cancel',
    TEXT_OK: 'Ok',
    TEXT_SAVE: 'Save me!',
    TEXT_DONT: 'Dont try to kill me mate.',
    TEXT_WHERE: 'Where i am?',
    INFO_HEADER: 'HELP !',
    INFO_DESC: 'This is a robo program, you can use PLACE button to teleport robo anywhere. \n Click REPORT to check its location. \n Clicking MOVE will move robo forward. \n Click LEFT or RIGHT to change robo direction.',
}

const LENGTH: number = 5;

export {DIRECTIONS, MESSAGES, LENGTH, SIDES};
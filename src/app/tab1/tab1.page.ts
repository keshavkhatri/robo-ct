// Core component
import { Component } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

// Static values
import { DIRECTIONS, MESSAGES, LENGTH, SIDES } from '../shared/systemConstants';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})

/*
    Class for our main tab page.
*/
export class Tab1Page {

    xArr: Array<any> = [];
    yArr: Array<any> = [];
    xCurrent: number = 0;
    yCurrent: number = 0;
    direction: string;
    messages:any = MESSAGES;

    constructor(
        private alert: AlertController,
        private toastController: ToastController
    ) { }

    ngOnInit() {
        for (let i = 0; i < LENGTH; i++) {
            this.xArr.push({});
            this.yArr.push({});
        }
        this.direction = DIRECTIONS.NORTH;
    }

    /*
        Function move
        Used to move the robo forward
        @param: void 
    */
    move() {
        // Making coordinate changes according to current direction
        // Showing error in case of robo falling out of bounds
        switch (this.direction) {
            case DIRECTIONS.EAST:
                this.xCurrent < LENGTH - 1 ? this.xCurrent++ : this.dontKill();
                break;
            case DIRECTIONS.WEST:
                this.xCurrent > 0 ? this.xCurrent-- : this.dontKill();
                break;
            case DIRECTIONS.NORTH:
                this.yCurrent < LENGTH - 1 ? this.yCurrent++ : this.dontKill();
                break;
            case DIRECTIONS.SOUTH:
                this.yCurrent > 0 ? this.yCurrent-- : this.dontKill();
                break;
            default:
                break;
        }
    }

    /*
        Function changeDirection
        Used to change direction of the robo
        @param {side} either left or right.
    */
    changeDirection(side) {
        // Changing current direction according to input given 
        switch (this.direction) {
            case DIRECTIONS.EAST:
                this.direction = side == SIDES.LEFT ? DIRECTIONS.NORTH : DIRECTIONS.SOUTH;
                break;
            case DIRECTIONS.WEST:
                this.direction = side == SIDES.LEFT ? DIRECTIONS.SOUTH : DIRECTIONS.NORTH;
                break;
            case DIRECTIONS.NORTH:
                this.direction = side == SIDES.LEFT ? DIRECTIONS.WEST : DIRECTIONS.EAST;
                break;
            case DIRECTIONS.SOUTH:
                this.direction = side == SIDES.LEFT ? DIRECTIONS.EAST : DIRECTIONS.WEST;
                break;
            default:
                break;
        }
    }

    /*
        Function dontKill
        Used to show an alert in case of 
        robo falling out of bounds
        @param void
    */
    dontKill() {
        this.infoAlert(MESSAGES.TEXT_SAVE,MESSAGES.TEXT_DONT);
    }

    /*
        Function report
        Used to show an alert with
        current coordinates and direction of the robo
        @param void
    */
    report() {
        let msg = 'Here is my location X: ' + this.xCurrent + ', Y: ' + this.yCurrent + ' and facing ' + this.direction;
        this.infoAlert(MESSAGES.TEXT_WHERE,msg);
    }

    /*
        Function infoAlert
        To create an instance of alert commonly used
        @param {header} header text of alert
        @param {message} message text of alert
    */
    infoAlert(header, message){
        this.alert.create({
            header: header,
            message: message,
            buttons: [MESSAGES.TEXT_OK]
        }).then(alert => alert.present());
    }

    /*
        Function place
        To get new coordinates of robo from user
        @param void
    */
    async place() {
        const alert = await this.alert.create({
            header: MESSAGES.HEADER_PLACE,
            inputs: [
                {
                    name: 'xaxis',
                    type: 'tel',
                    placeholder: MESSAGES.LABEL_X+(LENGTH-1)
                },
                {
                    name: 'yaxis',
                    type: 'tel',
                    placeholder: MESSAGES.LABEL_Y+(LENGTH-1)
                },
                {
                    name: 'direction',
                    type: 'text',
                    placeholder: MESSAGES.LABEL_DIRECTION,
                }
            ],
            buttons: [
                {
                    text: MESSAGES.TEXT_CANCEL,
                    role: 'cancel',
                }, {
                    text: MESSAGES.TEXT_OK,
                    handler: (data) => {
                        if (this.validate(data)) {
                            this.setPlace(data);
                        } else {
                            return false;
                        }
                    }
                }
            ]
        });

        await alert.present();
    }

    /*
        Function setPlace
        To get values from user and place robo according to given values
        @param {data} object containing xaxis, yaxis and direction
    */
    setPlace(data) {
        this.xCurrent = data.xaxis;
        this.yCurrent = data.yaxis;
        this.direction = data.direction.toLowerCase();
    }

    /*
        Function validate
        To validate user data
        @param {data} object containing xaxis, yaxis and direction
    */
    validate(data) {
        if (data.xaxis > LENGTH-1 || data.xaxis < 0) {
            this.toastError(MESSAGES.ERROR_X);
            return false;
        } else if (data.yaxis > LENGTH-1 || data.yaxis < 0) {
            this.toastError(MESSAGES.ERROR_Y);
            return false;
        } else if (!this.checkDirection(data.direction.toLowerCase())) {
            this.toastError(MESSAGES.ERROR_DIRECTION);
            return false;
        }
        return true;
    }

    /*
        Function checkDirection
        Helper function to check if given direction is correct
        @param {input} text to check
    */
    checkDirection(input){
        return Object.keys(DIRECTIONS).find(key => DIRECTIONS[key] === input);
    }

    /*
        Function toastError
        Used to show toast error in case of wrong input
        @param {msg} text to show
    */
    async toastError(msg) {
        const toast = await this.toastController.create({
            message: msg,
            position: 'bottom',
            duration: 3000
        });
        toast.present();
    }

    /*
        Function info
        Used to show info about the app
        @param void
    */
    info() {
        this.infoAlert(MESSAGES.INFO_HEADER,MESSAGES.INFO_DESC);
    }
}

import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    length: number = 5;
    xArr: Array<any> = [];
    yArr: Array<any> = [];
    xCurrent: number = 0;
    yCurrent: number = 0;
    direction: string = 'north';
    dirArr: Array<any> = [
        'north',
        'south',
        'east',
        'west',
    ];

    constructor(
        private alertController: AlertController,
        public toastController: ToastController
    ) { }

    ngOnInit() {
        for (let i = 0; i < this.length; i++) {
            this.xArr.push({});
            this.yArr.push({});
        }
    }

    move() {
        switch (this.direction) {
            case 'east':
                if (this.xCurrent < this.length - 1) {
                    this.xCurrent++;
                    break;
                } else {
                    this.dontKill()
                }
                break;
            case 'west':
                if (this.xCurrent > 0) {
                    this.xCurrent--;
                    break;
                } else {
                    this.dontKill()
                }
                break;
            case 'north':
                if (this.yCurrent < this.length - 1) {
                    this.yCurrent++;
                    break;
                } else {
                    this.dontKill()
                }
                break;
            case 'south':
                if (this.yCurrent > 0) {
                    this.yCurrent--;
                    break;
                } else {
                    this.dontKill()
                }
                break;
            default:
                break;
        }
    }

    changeDirection(side) {
        switch (this.direction) {
            case 'east':
                if (side == 'left') {
                    this.direction = 'north';
                } else {
                    this.direction = 'south';
                }
                break;
            case 'west':
                if (side == 'left') {
                    this.direction = 'south';
                } else {
                    this.direction = 'north';
                }
                break;
            case 'north':
                if (side == 'left') {
                    this.direction = 'west';
                } else {
                    this.direction = 'east';
                }
                break;
            case 'south':
                if (side == 'left') {
                    this.direction = 'east';
                } else {
                    this.direction = 'west';
                }
                break;
            default:
                break;
        }
    }

    async dontKill() {
        const alert = await this.alertController.create({
            header: 'Save me!',
            message: 'Dont try to kill me mate.',
            buttons: ['OK']
        });

        await alert.present();
    }

    async report() {
        const alert = await this.alertController.create({
            header: 'Where i am?',
            message: 'Here is my location X: ' + this.xCurrent + ', Y: ' + this.yCurrent + ' and facing ' + this.direction,
            buttons: ['OK']
        });

        await alert.present();
    }

    async place() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Place me anywhere',
            inputs: [
                {
                    name: 'xaxis',
                    type: 'tel',
                    placeholder: 'x axis between 0 to 4'
                },
                {
                    name: 'yaxis',
                    type: 'tel',
                    placeholder: 'y axis between 0 to 4'
                },
                {
                    name: 'direction',
                    type: 'text',
                    placeholder: 'one of north, south, east, west',
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                }, {
                    text: 'Ok',
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

    setPlace(data) {
        this.xCurrent = data.xaxis;
        this.yCurrent = data.yaxis;
        this.direction = data.direction;
    }

    validate(data) {
        console.log(data.xaxis);
        if (data.xaxis > 4 || data.xaxis < 0) {
            this.toastError('x axis value is not correct');
            return false;
        }else if (data.yaxis > 4 || data.yaxis < 0) {
            this.toastError('y axis value is not correct');
            return false;
        }else if (!this.dirArr.includes(data.direction)) {
            this.toastError('direction is not correct');
            return false;
        }
        return true;
    }

    async toastError(msg) {
        const toast = await this.toastController.create({
            message: msg,
            position: 'bottom',
            duration: 3000
        });
        toast.present();
    }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Tab1Page } from './tab1.page';
import { DIRECTIONS, LENGTH, SIDES } from '../shared/systemConstants';

describe('Tab1Page', () => {
    let component: Tab1Page;
    let fixture: ComponentFixture<Tab1Page>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [Tab1Page],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(Tab1Page);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize x and y array and direction', () => {
        component.ngOnInit();
        expect(component.direction).toBe(DIRECTIONS.NORTH);
        expect(component.xArr.length).toBeGreaterThan(0);
        expect(component.yArr.length).toBeGreaterThan(0);
    });

    it('should move robo forward', () => {
        /*
            Positive cases testing for robo moves
            by passing current coordinates and directions
        */
        spyOn(component, 'dontKill');
        
        component.direction = DIRECTIONS.NORTH;
        component.xCurrent = 3;
        component.yCurrent = 2;
        component.move();
        expect(component.yCurrent).toBe(3);

        component.xCurrent = 2;
        component.yCurrent = 2;
        component.changeDirection(DIRECTIONS.NORTH,SIDES.RIGHT);
        component.move();
        expect(component.xCurrent).toBe(3);
    })

    it('should not let robo fall', () => {
        /*
            Robo faliing cases testing
            by passing current coordinates and directions
        */
        spyOn(component, 'dontKill');
        component.xCurrent = 1;
        component.yCurrent = 4;
        component.move();
        expect(component.dontKill).toHaveBeenCalled();
        expect(component.yCurrent).toBe(4);
    })

    it('should give new direction', () => {
        let result = component.changeDirection(DIRECTIONS.NORTH,SIDES.LEFT);
        expect(result).toBe(DIRECTIONS.WEST);
        result = component.changeDirection(DIRECTIONS.NORTH,SIDES.RIGHT);
        expect(result).toBe(DIRECTIONS.EAST);

        result = component.changeDirection(DIRECTIONS.EAST,SIDES.LEFT);
        expect(result).toBe(DIRECTIONS.NORTH);
        result = component.changeDirection(DIRECTIONS.EAST,SIDES.RIGHT);
        expect(result).toBe(DIRECTIONS.SOUTH);

        result = component.changeDirection(DIRECTIONS.WEST,SIDES.LEFT);
        expect(result).toBe(DIRECTIONS.SOUTH);
        result = component.changeDirection(DIRECTIONS.WEST,SIDES.RIGHT);
        expect(result).toBe(DIRECTIONS.NORTH);

        result = component.changeDirection(DIRECTIONS.SOUTH,SIDES.LEFT);
        expect(result).toBe(DIRECTIONS.EAST);
        result = component.changeDirection(DIRECTIONS.SOUTH,SIDES.RIGHT);
        expect(result).toBe(DIRECTIONS.WEST);
    })

    it('should change coordinates of robo', () => {
        let data = {
            xaxis:2,
            yaxis:3,
            direction: DIRECTIONS.SOUTH,
        }
        component.setPlace(data);
        expect(component.direction).toBe(DIRECTIONS.SOUTH);
        expect(component.xCurrent).toBe(2);
        expect(component.yCurrent).toBe(3);
    })

    it('should validate data and show error if fails', () => {
        spyOn(component, 'toastError');
        let data = {
            xaxis:2,
            yaxis:3,
            direction: DIRECTIONS.SOUTH,
        }
        let result = component.validate(data);
        expect(result).toBeTruthy();

        data = {
            xaxis:20,
            yaxis:33,
            direction: 'random',
        }
        result = component.validate(data);
        expect(component.toastError).toHaveBeenCalled();
    })

    it('check if given direction is correct', () => {
        expect(component.checkDirection(DIRECTIONS.EAST)).toBeTruthy();
        expect(component.checkDirection('random')).toBeFalsy();
    })

    it('should call function to show info', () => {
        spyOn(component, 'infoAlert');
        component.info();
        expect(component.infoAlert).toHaveBeenCalled();
    })
});
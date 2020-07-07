<!--
  Title: Robo CT
  Description: A simple solution for toy robot simulator.
  Author: Keshav Khatri
-->

### What is Robo CT?

This is a simple programmatic solution for toy robot simulator problem. In which a toy robot moving on a square tabletop when there are no other obstructions on the table surface. The robot is free to roam around the surface of the table, but its prevented from falling to destruction. Any movement that would result in the robot falling from the table is prevented, however further valid movement commands must still allowed.

### Functions available

##### PLACE 
This will put the toy robot on the table in position given X,Y and direction one of NORTH, SOUTH, EAST or WEST.

##### MOVE
This will move the toy robot one unit forward in the direction it is currently facing.

##### LEFT and RIGHT 
This will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

##### REPORT
REPORT will announce the X,Y and Direction of the robot.

### Installation

> git clone https://github.com/keshavkhatri/robo-ct.git <br />
> cd robot-ct <br />
> npm i <br />
> ionic serve <br />

### Dependencies

- IONIC CLI
- NodeJS
- Cordova

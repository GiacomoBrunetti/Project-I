# Project-I: It's raining Cats and Dogs!

A very basic yet addiciting game where you have to save from certain death cats and dogs falling from the sky!

![home](./images/ScreenShot.png)

## How to play 

If using non touch devices use your Left and Right arrow keys to move the protal, use the provided arrow buttons if using touch devices. The goal is to catch as many animals as possible before loosing all the 9 lives that you have. Beware! The speed at which the animals fall increases in time.

![running](./images/ScreenShot2.png)

## How it works

Animals are randomly positioned inside one of the 6 divs at the top of the grid and start falling along that column. 
The portal is positioned by default in the bottom left div and can be moved only across the bottom line of divs. 
If an animal is caught the score goes up by one, on the contrary, if an animal is not caught in time, one life will be popped from the array.
The moment the number of lives is equal to 0, the gameboard will disappear and your score and a button to play again will be displayed.

![another running](./images/screenShot3.png)

Sounds are triggered upon:

1. the page loading
2. saving an animal
3. losing an animal
4. reaching a score of 50 

![game over](./images/ScreenShot4.png)

## Built With

Built using HTML5, CSS3, and ES6.

## Challenges 
The main problem with this project has been CSS, something that I would have never thought could be this hard. Trying to make it responsive has taken a lot longer than what I originally planned and it still is not perfectly responsive.

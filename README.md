# ![](static/assets/favicon.ico) JavaScript Quiz

This repository hosts the source code for my a JavaScript quiz game that can be rendered in any browser. It uses a canvas tag and renders the entire page entirely through JavaScript animations. Currently, this project is for me to showcase my JavaScript knowledge and to see how to use JavaScript to produce a project that scales to a lot of screen sizes for responsive behavior. The entire project has been created from scratch and is ran on a single thread.

You may fork this repository if you wish, but you can not submit code to this repository.

## UX

One of the interesting aspects this project is how it scales to almost any browser with canvas support. This project has allowed me to challenge myself in creating my own mini rendering engine for the sole purpose of creating this quiz game. This engine allows for responsivenes and animations through [Linear Interpolation](https://en.wikipedia.org/wiki/Linear_interpolation).

## Features

- ### **Custom Rending Engine**

	The game uses a small mini rendering engine that handles each page as a single file found in [static/js/src](static/js/src/). Each page is loaded accordingly to what the render is told to load by the game. This can be controlled via input such as keyboard, mouse or touch behaviors.

	It also supports frame by frame animations allowing for features such as Linear Interpolation animations to work. Best demonstrated by the title screen and all of the transition effects.
- ### **Custom Responsive Behavior**

	All elements within the canvas messure responsive in 2 ways:

	1. One for visual elements like buttons.
	2. One for text to scale accordingly to screen resolution.

	The first one is done by messuring the width and height of the client and finding out if the height is larger than the width (portrait mode). If it is, the elements are responsive and you just have to create a second layout for it. Majority of pages have two layouts because of this. A non responsive and responsive layout to create. This is found in [static/js/api/responsive.js](static/js/api/responsive.js).

	The second is by messureing if the text that is about to be drawn on the canvas is larger than a specifed size. If you specify the size to be half the total width of the screen for example, the responsive system will calculate if the text will overlap those bounds. If it does, it will adjust the size accordingly until it fits in the specifed bounds. The code for this is found in [static/js/api/text.js](static/js/api/text.js).


- ### **Input Handling**
	This system allows me to write a single function and supply it any input from JavaScript events. Events such as *"touchstart"*, *"mousedown"* or *"keydown"* return input values that I can assign to a single function - creating a univseral system for all inputs I wish to support.
- ### **Editor for Custom Quizes**
	This will allow for further expansion of content instead of relying on just one quiz. Users can create their own quiz and export that as a set of characters they can share with other users or just to save their own quizes. This system aslo allows users to import a quiz by giving the code back into the system.

## Pages

- [index.html](index.html) - The main page with a blank canvas.
- [title.js](static/js/src/title.js) - A landing page greeting the user about the game.
- [menu.js](static/js/src/menu.js) - A page to allow access to different parts of the site.
- [game.js](static/js/src/game.js) - The page that loads the selected quiz.
- [questionAnswer.js](static/js/src/questionAnswer.js) - Tells the user if they answered a question right or wrong.
- [result.js](static/js/src/result.js) - Shows the user their overall performance at the end of the quiz.
- [editor.js](static/js/src/editor.js) - The page that allows users to import or make their own quiz.

## Technologies

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript)
- [Git](https://git-scm.com/)
- [Github](https://github.com)

## Deployment

Getting the files onto your system:
1. Load up your terminal on your machine.
2. Pull the website from github:
	> git clone https://github.com/WatermelonArray/jsQuiz
3. No need to build any files as everything should already be there ready to use!

Any changes made should be using the command interface:
1. Add any changed files using
	> git add .

	> "." being the prefix for all files.

2. Commit your staged files:
	> git commit -m "Commit message here"

3. Make sure you set your remote repository
	> git remote add origin https://github.com/WatermelonArray/jsQuiz

	> Or the remote to any other repository (preferably yours)

4. Push your commits **AND** set your push command's default remote using "-u"
	> git push -u origin master

	> "master" can be replaced by any branch you want on the remote repository

	> Once you do this, you can just run "git push" without setting upstream for faster workflows

5. Start deploying on your prefered deployment service like Github Pages.
	> Repository Settings > Github Pages > Select source to master branch. *(Or any other prefered branch)*

Using github’s page service I am able to deploy this website live to https://watermelonarray.github.io/jsQuiz

## Credit

Learning resources used heavily:

- https://www.w3schools.com/
- https://developer.mozilla.org/en-US/docs/Web/API

Music resources created by
- babasmasmoosic - https://soundcloud.com/babasmasmoosic

	Tracks used:

		Space Journey
		A Turtle's Adventures - The Begininng

Sound resources created by
- original_sound https://freesound.org/people/original_sound/sounds/366102/
- Natty23 https://freesound.org/people/Natty23/sounds/349182/
- Sjonas88 https://freesound.org/people/Sjonas88/sounds/538540/
- Sjonas88 https://freesound.org/people/Sjonas88/sounds/538554/
- lebaston100 https://freesound.org/people/lebaston100/sounds/192273/
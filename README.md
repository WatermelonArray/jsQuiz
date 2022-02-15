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

	The first one is done by messuring the width and height of the client and finding out if the height is larger than the width (portrait mode). If it is, the elements are responsive and you just have to create a second layout for it. Majority of pages have two layouts because of this. A non responsive and responsive layout to create.

	The second is by messureing if the text that is about to be drawn on the canvas is larger than a specifed size. If you specify the size to be half the total width of the screen for example, the responsive system will calculate if the text will overlap those bounds. If it does, it will adjust the size accordingly until it fits in the specifed bounds.


## Technologies

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript)
- [Git](https://git-scm.com/)
- [Github](https://github.com)
- ### **Navbar**
	
  A Navbar is available on every page that has sections defined that you can scroll to. Some pages do not have a Navbar if there is very little content. The navbar contains buttons that allow the user to scroll to specific sections on the page and also highlights the buttons depending on the section you are viewing using Bootstrap’s Scrollspy feature.

- ### **Scroll to top**

	Some pages are too long and scrolling for a long time to reach back to the top is not a user-friendly experience. This is a small circular button on the bottom right of your view and follows you everywhere you scroll. Pressing the button will scroll the page all the way to the top of the page. - ### **Navbar**

	A Navbar is available on every page that has sections defined that you can scroll to. Some pages do not have a Navbar if there is very little content. The navbar contains buttons that allow the user to scroll to specific sections on the page and also highlights the buttons depending on the section you are viewing using Bootstrap’s Scrollspy feature.

- ### **Scroll to top**

	Some pages are too long and scrolling for a long time to reach back to the top is not a user-friendly experience. This is a small circular button on the bottom right of your view and follows you everywhere you scroll. Pressing the button will scroll the page all the way to the top of the page./jsQuiz
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
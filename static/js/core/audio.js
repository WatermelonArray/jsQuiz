"use strict";

const musicList = {
	title: new Audio("static/assets/audio/titleMusic.wav"),
	idle: new Audio("static/assets/audio/idleMusic.wav"),
	quiz: new Audio("static/assets/audio/quizMusic.wav"),
	result: new Audio("static/assets/audio/resultsMusic.wav")
};

musicList.title.volume = 0.05;
musicList.idle.volume = 0.05;
musicList.quiz.volume = 0.05;
musicList.result.volume = 0.05;
musicList.title.loop = true;
musicList.idle.loop = true;
musicList.quiz.loop = true;
musicList.result.loop = false;

const musicPlay = (x) => {

	musicList.title.pause();
	musicList.idle.pause();
	musicList.quiz.pause();
	musicList.result.pause();

	musicList.title.currentTime = 0;
	musicList.idle.currentTime = 0;
	musicList.quiz.currentTime = 0;
	musicList.result.currentTime = 0;

	if (x) {musicList[x].play()}

}

const setupAudio = (callback) => {
	callback.setMusic = musicPlay;
}

export {setupAudio};
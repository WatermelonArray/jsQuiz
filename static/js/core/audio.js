"use strict";

const musicList = {
	title: new Audio("static/assets/audio/titleMusic.wav"),
	idle: new Audio("static/assets/audio/idleMusic.wav"),
	quiz: new Audio("static/assets/audio/quizMusic.wav"),
	result: new Audio("static/assets/audio/resultsMusic.wav")
};
const soundList = {
	confirm: new Audio("static/assets/audio/titleClick.wav"),
	click: new Audio("static/assets/audio/click.wav"),
	swipe: new Audio("static/assets/audio/swipe.wav"),
	correct: new Audio("static/assets/audio/questionCorrect.wav"),
	fail: new Audio("static/assets/audio/questionFail.wav"),
};

const init = () => {
	musicList.title.volume = 0.05;
	musicList.idle.volume = 0.05;
	musicList.quiz.volume = 0.05;
	musicList.result.volume = 0.05;
	soundList.confirm.volume = 0.05;
	soundList.click.volume = 0.05;
	soundList.swipe.volume = 0.05;
	soundList.correct.volume = 0.05;
	soundList.fail.volume = 0.05;

	musicList.title.loop = true;
	musicList.idle.loop = true;
	musicList.quiz.loop = true;
	musicList.result.loop = false;
	soundList.confirm.loop = false;
	soundList.click.loop = false;
	soundList.swipe.loop = false;
	soundList.correct.loop = false;
	soundList.fail.loop = false;
};


const musicPlay = (x) => {

	musicList.title.pause();
	musicList.idle.pause();
	musicList.quiz.pause();
	musicList.result.pause();

	musicList.title.currentTime = 0;
	musicList.idle.currentTime = 0;
	musicList.quiz.currentTime = 0;
	musicList.result.currentTime = 0;

	if (x) {musicList[x].play();}

}

const playSound = (x) => {
	if (x) {soundList[x].pause(); soundList[x].currentTime = 0; soundList[x].play();}
}

const setupAudio = (callback) => {

	init();

	callback.setMusic = musicPlay;
	callback.playSound = playSound;

	callback.muteAudio = () => {
		if (this.state.sound) {
			this.state.sound = false;
			musicList.title.volume = 0;
			musicList.idle.volume = 0;
			musicList.quiz.volume = 0;
			musicList.result.volume = 0;
		}
		else {
			this.state.sound = true;
			musicList.title.volume = 0.05;
			musicList.idle.volume = 0.05;
			musicList.quiz.volume = 0.05;
			musicList.result.volume = 0.05;
		}
	}
}

export {setupAudio};
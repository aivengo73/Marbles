'use strict';

(() => {
	const isNumber = function (n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};
	const verifyResponseString = (str) => {
		return FIGURES_RUS.includes(str.toLocaleLowerCase());
	};
	const FIGURES_RUS = ['камень', 'ножницы', 'бумага'];
	const PARITY_SIGN = ['Чётное', 'Нечётное'];
	const game = () => {
		let currentPlayer = 1;
		let numBalls,
			answerChoice,
			level,
			numBallsChoice,
			choice,
			askMore,
			askString,
			getRandomIntInclusive,
			compareResponses,
			askPlayers,
			resultGame;

		const result = {
			playerBalls: 5,
			botBalls: 5,
			player: 0,
			bot: 0,
		};

		// функция 	переключающая уровни игры
		const choiceLevel = (level) => {
			if (level === 'number') {
				return choiceLevel(level);
			} else {
				level = +prompt('Выберите уровень игры: 1, 2, 3');
			}
			if (!level) return;
			if (!isNumber(level) || level < 1 || level > 3) {
				alert('Выберите уровень игры: 1, 2, 3');
				return choiceLevel();
			} else {
				return level;
			}
		};

		// функция принимающая ответ от пользователя камень ножницы бумага
		const playerSelection = () => {
			askPlayers = () => {
				let player = prompt('камень, ножницы, бумага?');
				if (player === null) {
					askExit();
				}
				if (verifyResponseString(player)) {
					return player.toLowerCase();
				} else {
					alert('Введите камень, ножницы, бумага');
					return askPlayers();
				}
			};

			//функция формирующая случайный ответ компьютера (камень ножницы бумага)
			getRandomIntInclusive = (FIGURES_RUS) => {
				return FIGURES_RUS[Math.floor(Math.random() * FIGURES_RUS.length)];
			};

			//функция сравнивает ответы пользователя и бота 
			compareResponses = (computerVariant, userVariant) => {
				if (userVariant === computerVariant) {
					alert(`Бот: ${computerVariant} \nВы: ${userVariant}\n \nНичья`);
					result.tie++;
					return playerSelection();
				}
				else if (
					(userVariant === FIGURES_RUS[0] && computerVariant === FIGURES_RUS[1]) ||
					(userVariant === FIGURES_RUS[2] && computerVariant === FIGURES_RUS[0]) ||
					(userVariant === FIGURES_RUS[1] && computerVariant === FIGURES_RUS[2])
				) {
					alert(`Бот: ${computerVariant} \nВы: ${userVariant} \n \nВы: выиграли`);
					result.player++;
					currentPlayer = 2;
					return currentPlayer;
				} else {
					alert(`Бот: ${computerVariant} \nВы: ${userVariant} \n \nБот: выиграл`);
					result.bot++;
					currentPlayer = 1;
					return currentPlayer;
				}
			};
		};

		//функция формирующая случайный ответ игроков Чётное или нечётное
		const randomChoice = () => {
			if (currentPlayer === 1) {
				askString = +prompt(`Какое число загадал Бот ?\nнечётное: 1\nчётное: 2`);
				if (!isNumber(askString) || askString === 0 || askString > 2) {
					return randomChoice();
				} else askString;
			}
			if (currentPlayer === 2) {
				return PARITY_SIGN[Math.floor(Math.random() * PARITY_SIGN.length)];
			}
		};

		const numRandom = () => {
			const n = 1;
			const m = result.botBalls
			let randomNum = Math.floor(Math.random() * (m - n) + n);
			alert('Число загадано!')
			return randomNum;
		};

		// функция сравнивает число введённое игроком с колличеством имеющимся у него шариков 
		const numberQuery = () => {
			let num = +prompt(`Введите число от 1 до ${result.playerBalls}`);
			alert('Бот постарается угадать: Чётное или Нечётное...')
			if (num === null) {
				return askExit();
			}
			if (!isNumber(num) || num < 1 || num > result.playerBalls) {
				alert(`Введите число от 1 до ${result.playerBalls}`);
				return numberQuery();
			}
			return num;
		};

		// функция следящая за очередностью хода
		function getTurn() {
			if (currentPlayer === 1) {
				alert('Ход Бота');
				currentPlayer = 2;
				return currentPlayer;
			}
			if (currentPlayer === 2) {
				alert('Ход Игрока');
				currentPlayer = 1;
				return currentPlayer;
			}
		}

		// функция переводит данные из числа в строку Чётное или Нечётное
		const getParityTest = (numBalls, numBallsChoice) => {
			if ((numBalls % 2) === 0) {
				numBallsChoice = 'Чётное';
			} else {
				numBallsChoice = 'Нечётное';
			}
			return numBallsChoice;
		};

		// функция для выхода из игры
		function askExit() {
			const exit = confirm('Точно хотите выйти?');
			if (exit) {
				alert(`Ваши очки: ${result.player} \nБот: ${result.bot}`);
				return;
			} else {
				return start();
			}
		};

		//функция сравнения значения чётности от игрока со случайно выбранным значением чётности от бота
		function compare(numBallsChoice, choice) {
			if (currentPlayer === 1) {
				if (numBallsChoice === choice) {
					alert('вы выиграли');
					result.playerBalls = result.playerBalls + numBalls;
					result.botBalls = result.botBalls - numBalls;
					result.player++;
					alert(`Бот: ${result.bot} \nКолличество шаров у бота: ${result.botBalls} \nВы: ${result.player}\nКолличество шаров у Вас: ${result.playerBalls} \n\nВы: выиграли`);
					return result.player;
				} else {
					alert('бот выиграл');
					result.playerBalls = result.playerBalls - numBalls;
					result.botBalls = result.botBalls + numBalls;
					result.bot++;
					alert(`Бот: ${result.bot} \nКолличество шаров у бота: ${result.botBalls} \nВы: ${result.player}\nКолличество шаров у Вас: ${result.playerBalls} \n\nБот выиграл`);
					return result.bot;
				}
			} else {
				if (numBallsChoice === choice) {
					alert('бот выиграл');
					result.playerBalls = result.playerBalls - numBalls;
					result.botBalls = result.botBalls + numBalls;
					result.bot++;
					alert(`Бот: ${result.bot} \nКолличество шаров у бота: ${result.botBalls} \nВы: ${result.player}\nКолличество шаров у Вас: ${result.playerBalls}\n\nБот выиграл`);
					return result.player;
				} else {
					alert('Вы выиграли');
					result.playerBalls = result.playerBalls + numBalls;
					result.botBalls = result.botBalls - numBalls;
					result.player++;
					alert(`Бот: ${result.bot} \nКолличество шаров у бота: ${result.botBalls} \nВы: ${result.player}\nКолличество шаров у Вас: ${result.playerBalls}\n\nВы: выиграли`);
					return result.bot;
				}
			}
		};

		// функция старта игры
		return function start(levelGame) {
			if (result.playerBalls <= 0 || result.botBalls <= 0) {
				alert(`Игра закончена.\nКолличество шаров у одного из участников равно или меньше 0`);
				alert(`Бот: ${result.bot} \nКолличество шаров у бота: ${result.botBalls} \nВы: ${result.player}\nКолличество шаров у Вас: ${result.playerBalls}`);
				return;
			}
			if (levelGame) {
				level = levelGame;
			} else {
				levelGame = choiceLevel(level);
			}
// уровень 1
			if (levelGame === 1) {
				currentPlayer = 2;
				numBalls = numberQuery();
				numBallsChoice = getParityTest(numBalls);
				choice = randomChoice(PARITY_SIGN);
				alert(`${choice}?`)
				resultGame = compare(numBallsChoice, choice);
				result[resultGame]++;
			}
// уровень 2
			if (levelGame === 2) {
				currentPlayer = getTurn();
				numBalls = numRandom();
				numBallsChoice = getParityTest(numBalls);
				let numBallsChoiceBot = numBallsChoice;
				currentPlayer = getTurn();
				askString = randomChoice(currentPlayer);
				answerChoice = askString;
				let numBallsChoicePlayer = getParityTest(answerChoice, numBallsChoiceBot);
				resultGame = compare(numBallsChoiceBot, numBallsChoicePlayer);
				result[resultGame]++;
			}
// уровень 3
			if (levelGame === 3) {
				alert('Разыграем очерёдность хода');
				playerSelection();
				let userVariant = askPlayers();
				const computerVariant = getRandomIntInclusive(FIGURES_RUS);
				alert(`${computerVariant}`)
				let resultGames = compareResponses(computerVariant, userVariant);
				currentPlayer = resultGames;
				currentPlayer = getTurn();
				numBalls = numRandom();
				numBallsChoice = getParityTest(numBalls);
				let numBallsChoiceBot = numBallsChoice;
				currentPlayer = getTurn();
				askString = randomChoice(currentPlayer);
				answerChoice = askString;
				let numBallsChoicePlayer = getParityTest(answerChoice, numBallsChoiceBot);
				resultGame = compare(numBallsChoiceBot, numBallsChoicePlayer);
				result[resultGame]++;
			}
			if (numBalls === null) {
				askExit();
			}
			if (typeof numBalls === 'number') {
				askMore = confirm('Хотите сыграть ещё?');
				if (!askMore) {
					alert(`Ваши очки: ${result.player} \nБот: ${result.bot}`);
					return;
				} else {
					start(levelGame);
				}
			}
		}
	};
	window.mrbl = game;
})();


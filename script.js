'use strict';

(() => {
  const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  };

  const game = () => {
    const PARITY_SIGN = ['чётное', 'нечётное'];
    let numBalls;
    let numBallsChoice;
    let choice;
    let askMore;

    const result = {
      playerBalls: 5,
      botBalls: 5,
      player: 0,
      bot: 0,
    };

    // функция для выхода из игры
    const askExit = () => {
      const exit = confirm('Точно хотите выйти?');
      if (exit) {
        alert(`Ваши очки : ${result.player} \nБот : ${result.bot}`);
        return;
      }
      return game();
    };

    /* функция сравнивает число введённое игроком с колличеством
имеющимся у него шариков */
    const numberQuery = () => {
      const num = prompt(`Введите число от 1 до ${result.playerBalls}`);
      if (num === null) {
        askExit();
        return;
      }
      if (!isNumber(num) || num < 1 || num > result.playerBalls) {
        numberQuery();
      }
      return num;
    };

    /* функция формирующая случайный ответ игроков Чётное
или нечётное */
    const randomChoice = (arrayWord) =>
      arrayWord[Math.floor(Math.random() * arrayWord.length)];

    /* функция сравнения значения чётности от игрока со
случайно выбранным значением чётности от бота */
    const compare = (numBallsChoice, choice) => {
      if (numBallsChoice === choice) {
        alert(`У Бота шариков стало на ${numBalls} больше`);
        result.playerBalls -= numBalls;
        result.botBalls += numBalls;
        result.bot++;
      } else {
        alert(`У Вас шариков стало на ${numBalls} больше`);
        result.playerBalls += numBalls;
        result.botBalls -= numBalls;
        result.player++;
      }
      alert(`Шаров у бота : ${result.botBalls}
Шаров у Вас : ${result.playerBalls}`);
    };

    // функция старта игры
    return function start() {
      alert(`Текущее состояние игры:\n\nШары бота : ${result.botBalls} 
Ваши шары : ${result.playerBalls}`);
      numBalls = numberQuery();
      if (!isNumber(numBalls)) return;
      numBalls *= 1;
      choice = randomChoice(PARITY_SIGN);
      alert(`Число ${choice}`);
      compare(numBallsChoice, choice);
      if (result.botBalls > 0 && result.playerBalls > 0) {
        return start();
      }
      if (result.botBalls > result.playerBalls) {
        alert(`\nИгра закончена.\n\nШары у бота : ${result.botBalls}
Шары у Вас : ${result.playerBalls}\n\n Бот выиграл`);
      } else {
        alert(`\nИгра закончена.\n\nШары у бота : ${result.botBalls}
Шары у Вас : ${result.playerBalls}\n\nИгрок выиграл`);
      }
      askMore = confirm('Хотите сыграть ещё?');
      if (!askMore) {
        alert(`Ваши очки : ${result.player} \nБот : ${result.bot}`);
        return;
      } else {
        result.botBalls = 5;
        result.playerBalls = 5;
        return start();
      }
    };
  };
  window.mrbl = game;
})();
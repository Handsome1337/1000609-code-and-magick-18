'use strict';

/* Учебный проект, второе задание */

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100; // координата облака по оси X
var CLOUD_X_CENTER = 310; // координата центра облака по оси X
var CLOUD_Y = 10; // координата облака по оси Y
var OFFSET = 10; // смещение тени
var GREETING_Y = 30; // координата приветствия по оси Y
var INDENT = 55; // отступ первой колонки от левого края облака
var COLUMN_WIDTH = 40; // ширина колонки
var COLUMN_ROOF = 95; // координата самой высокой колонки по оси Y
var SPACING = 50; // расстояние между колонками
var TEXT_SPACING = 20; // смещение текста
var PLAYER_Y = 255; // координата имени игрока по оси Y
var COLUMN_HIGHEST = 150; // максимальная высота колонки

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderColumn = function (ctx, x, y, height) {
  ctx.fillRect(x, y, COLUMN_WIDTH, height);
};

var renderResults = function (ctx, text, x, y) {
  ctx.fillStyle = '#000000';
  if (typeof (text) === 'number') {
    text = Math.round(text);
  }
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var equateArrs = function (arr1, arr2) {
  var arr1Length = arr1.length;
  var arr2Length = arr2.length;
  if (arr1Length > arr2Length) {
    arr1 = arr1.slice(0, arr2Length);
  } else if (arr1Length < arr2Length) {
    arr2 = arr2.slice(0, arr1Length);
  }
  return [arr1, arr2];
};

/* Отрисовывает поздравление */
var renderGreeting = function (ctx) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'center';
  renderResults(ctx, 'Ура, Вы победили!', CLOUD_X_CENTER, GREETING_Y);
  renderResults(ctx, 'Список результатов:', CLOUD_X_CENTER, GREETING_Y + TEXT_SPACING);
};

/* Отрисовывает колонку с результатом одного игрока */
var renderPlayerResult = function (ctx, i, names, times) {
  /* Выбирает максимальное время из [times] */
  var maxTime = getMaxElement(times);

  /* Рассчитывает координату X для колонки */
  var columnX = CLOUD_X + INDENT + (COLUMN_WIDTH + SPACING) * i;

  /* Рассчитывает координату Y для колонки */
  var columnY = COLUMN_ROOF + (COLUMN_HIGHEST - ((COLUMN_HIGHEST * times[i]) / maxTime));

  /* Рассчитывает высоту колонки */
  var columnHeight = (COLUMN_HIGHEST * times[i]) / maxTime;

  renderColumn(ctx, columnX, columnY, columnHeight);

  ctx.textAlign = 'start';
  renderResults(ctx, names[i], columnX, PLAYER_Y);
  renderResults(ctx, times[i], columnX, columnY - TEXT_SPACING);
};

/* Отрисовывает колонки с результатами всех игроков */
var renderAllPlayersResults = function (ctx, names, times) {
  for (var i = 0; i < names.length; i++) {
    /* Определяет цвет колонки */
    var randomSaturation = getRandomInt(1, 100) + '%';
    ctx.fillStyle = 'hsl(240, ' + randomSaturation + ', 50%)';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    renderPlayerResult(ctx, i, names, times);
  }
};

window.renderStatistics = function (ctx, names, times) {
  /* Сравнивает длины массивов с именами и временами. В случае, если не хватает пары к какому-либо из значений, больший массив обрезается */
  var results = equateArrs(names, times);
  names = results[0];
  times = results[1];

  /* Отрисовывает облако и тень */
  renderCloud(ctx, CLOUD_X + OFFSET, CLOUD_Y + OFFSET, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  renderGreeting(ctx);
  renderAllPlayersResults(ctx, names, times);
};

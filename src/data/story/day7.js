/**
 * Day 7 — final day. The base choice plus the whole week's flags/stats decide
 * which of several distinct emotional endings the player gets.
 */

export default {
  start: { afterDay: 'day6' },
  steps: [
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Привет. я уже в парке, на скамейке у пруда' },
        { sender: 'alisa', textKey: 'Что бы ты сейчас ни сказал' },
        { sender: 'alisa', textKey: 'Я хочу, чтобы это было честно.' },
        { sender: 'alisa', textKey: 'Без красивых слов ради красивых слов' }
      ]
    },
    {
      type: 'choice',
      id: 'day7_choice',
      options: [
        { id: 'opt7_1', labelKey: 'Я готов рискнуть. хочу быть с тобой' },
        { id: 'opt7_2', labelKey: 'Давай подождём, пока всё уляжется' },
        { id: 'opt7_3', labelKey: 'Оставим всё как есть, без ярлыков' },
        { id: 'opt7_4', labelKey: 'У меня встречное предложение...', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day7_choice',
      branches: {
        opt7_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Я тоже готова. страшно, но готова' },
          { type: 'stats', changes: { success: 5, romance: 15, humor: 0 } },
          { type: 'flags', set: { finalCommit: true } }
        ],
        opt7_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Это мудро. я подожду, сколько нужно' },
          { type: 'stats', changes: { success: 10, romance: 8, humor: 0 } },
          { type: 'flags', set: { finalWait: true } }
        ],
        opt7_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Без ярлыков - это честно. мне подходит' },
          { type: 'stats', changes: { success: 5, romance: 6, humor: 4 } },
          { type: 'flags', set: { finalOpen: true } }
        ],
        opt7_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ну давай, удиви меня' },
          { type: 'stats', changes: { success: 3, romance: 10, humor: 10 } },
          { type: 'flags', set: { finalPlayful: true } }
        ]
      }
    },
    { type: 'flags', set: { gameEnded: true } },
    { type: 'achievement' },

    // --- Ending router: first matching condition wins, then jumps to the shared 'end' label ---
    {
      type: 'if',
      check: { and: [{ hasFlag: 'downplayedRelationship' }, { stat: 'romance', lt: 20 }] },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'Знаешь, я весь вечер пытаюсь понять' },
        { type: 'reaction', sender: 'alisa', textKey: 'Что мы вообще друг для друга' },
        { type: 'reaction', sender: 'alisa', textKey: 'Наверное, нам обоим нужно время.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Просто время, без обещаний' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '🌫️ Финал: неопределённость' },
            { sender: 'system', textKey: 'Вы не разошлись, но и не стали по-настоящему близки — слишком много было недосказанного по пути. Может, всё ещё наладится, а может, так и останется на паузе.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },
    {
      type: 'if',
      check: { and: [{ hasFlag: 'finalCommit' }, { hasFlag: 'chosePathClean' }] },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'С понедельника у меня официально другой куратор' },
        { type: 'reaction', sender: 'alisa', textKey: 'Групп. с тобой я теперь просто... я' },
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, что придумал это тогда.' },
        { type: 'reaction', sender: 'alisa', textKey: 'По-моему, у нас всё получится' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '💛 Финал: честное начало' },
            { sender: 'system', textKey: 'Вы всё сделали правильно — сначала разобрались с формальностями, и только потом позволили себе быть вместе. Ни тайн, ни компромиссов с совестью. Начало получилось спокойным и настоящим.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },
    {
      type: 'if',
      check: { and: [{ hasFlag: 'finalCommit' }, { stat: 'romance', gte: 45 }] },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'Я не знаю, что будет с работой.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Но я знаю, что не хочу тебя терять' },
        { type: 'reaction', sender: 'alisa', textKey: 'Давай просто попробуем. разберёмся по ходу' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '💖 Финал: рискнули' },
            { sender: 'system', textKey: 'Вы выбрали друг друга, даже не имея всех ответов. Впереди неловкие разговоры с начальством и, возможно, трудный выбор — но сейчас вы вместе, и это главное.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },
    {
      type: 'if',
      check: { hasFlag: 'finalWait' },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'Мне нравится, что ты не торопишь события.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Это редкость' },
        { type: 'reaction', sender: 'alisa', textKey: 'А пока - у нас есть уроки' },
        { type: 'reaction', sender: 'alisa', textKey: 'Кофе по субботам и очень много времени' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '🤝 Финал: пауза с надеждой' },
            { sender: 'system', textKey: 'Вы решили не торопиться. Ничего не разрушено, ничего пока не начато по-настоящему — но между вами осталась тёплая, честная связь, которой можно дать вырасти.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },
    {
      type: 'if',
      check: { hasFlag: 'finalOpen' },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'Без ярлыков - значит без давления.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Мне так спокойнее' },
        { type: 'reaction', sender: 'alisa', textKey: 'А там видно будет, во что это вырастет' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '🌤️ Финал: без определений' },
            { sender: 'system', textKey: 'Вы не назвали то, что между вами происходит, но и не отказались друг от друга. Иногда это и есть самое честное решение — жить дальше и смотреть, куда приведёт.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },
    {
      type: 'if',
      check: { and: [{ hasFlag: 'finalPlayful' }, { stat: 'humor', gte: 25 }] },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'Ахах, ладно, ты меня удивил. согласна' },
        { type: 'reaction', sender: 'alisa', textKey: 'У нас будет самая странная история знакомства' },
        { type: 'reaction', sender: 'alisa', textKey: 'Из всех, что я знаю' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '😄 Финал: на своей волне' },
            { sender: 'system', textKey: 'Серьёзные разговоры у вас почему-то всегда превращались в шутки — и, кажется, именно так вы и держались друг за друга всю неделю. Получилось легко, тепло и очень по-настоящему.' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },
    {
      type: 'if',
      check: { always: true },
      then: [
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, что был честен со мной сегодня. правда' },
        {
          type: 'endGame',
          messages: [
            { sender: 'system', textKey: '🎬 Игра завершена. Спасибо за прохождение!' },
            { sender: 'system', textKey: '📊 Итог: Успеваемость {{success}}, Романтика {{romance}}, Юмор {{humor}}' },
            { sender: 'system', textKey: 'Ты прошёл все 7 дней. Каким будет твой финал - зависит только от тебя.' }
          ]
        },
        { type: 'goto', label: 'end' }
      ]
    },
    { type: 'label', name: 'end' }
  ]
};

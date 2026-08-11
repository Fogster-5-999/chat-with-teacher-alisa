/**
 * Day 4 — Sunday. Deeper, more personal conversation after Saturday.
 */

export default {
  start: { afterDay: 'day3' },
  steps: [
    {
      type: 'if',
      check: { hasFlag: 'cameToCafe' },
      then: [
        { type: 'message', sender: 'alisa', textKey: 'Привет. ты вчера нормально добрался?' },
        { type: 'message', sender: 'alisa', textKey: 'Если честно, не была уверена' },
        { type: 'message', sender: 'alisa', textKey: 'Что ты правда придёшь' }
      ],
      else: [
        { type: 'message', sender: 'alisa', textKey: 'Привет) я всё ещё думаю про наш вчерашний разговор' }
      ]
    },
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'У меня редко получается вот так просто' },
        { sender: 'alisa', textKey: 'Общаться с учениками' },
        { sender: 'alisa', textKey: 'Обычно это только уроки и дедлайны.' },
        { sender: 'alisa', textKey: 'С тобой почему-то иначе' }
      ]
    },
    {
      type: 'choice',
      id: 'day4_choice',
      options: [
        { id: 'opt4_1', labelKey: 'Мне тоже было легко. спасибо за это' },
        { id: 'opt4_2', labelKey: 'Я весь день думал про наш разговор, если честно' },
        { id: 'opt4_3', labelKey: 'Наверное, потому что я обаятельный. шучу' },
        { id: 'opt4_4', labelKey: 'Я тоже всё это время думал про тебя. всё, сказал', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day4_choice',
      branches: {
        opt4_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Прям тепло стало. спасибо' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я тоже иногда устаю быть "училкой".' },
          { type: 'reaction', sender: 'alisa', textKey: 'С тобой могу быть просто собой' },
          { type: 'stats', changes: { success: 6, romance: 8, humor: 0 } }
        ],
        opt4_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ого. я тоже, если честно.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Весь вечер вчера в голове прокручивала' },
          { type: 'stats', changes: { success: 2, romance: 12, humor: 0 } }
        ],
        opt4_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Обаятельный - это громко сказано. но забавный - да' },
          { type: 'stats', changes: { success: 3, romance: 5, humor: 8 } }
        ],
        opt4_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ого. вот это признание с утра' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я, если честно, тоже.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Только боялась сказать первой' },
          { type: 'stats', changes: { success: 2, romance: 12, humor: 0 } }
        ]
      }
    },
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Если честно, я подумываю сменить работу' },
        { sender: 'alisa', textKey: 'В последнее время' },
        { sender: 'alisa', textKey: 'Устала немного.' },
        { sender: 'alisa', textKey: 'Не от учеников, а от всей этой... системы' },
        { sender: 'alisa', textKey: 'Извини, не хотела грузить тебя этим' }
      ]
    },
    {
      type: 'choice',
      id: 'day4_choice2',
      options: [
        { id: 'opt4b_1', labelKey: 'Не извиняйся, мне интересно тебя слушать' },
        { id: 'opt4b_2', labelKey: 'Я тебя понимаю, у меня похожая история' },
        { id: 'opt4b_3', labelKey: 'Зато у тебя есть я - твой лучший ученик 😄' },
        { id: 'opt4b_4', labelKey: 'Если решишь уйти с работы - я рядом. и это не про учёбу', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day4_choice2',
      branches: {
        opt4b_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, что не свёл всё к шутке. серьёзно' },
          { type: 'stats', changes: { success: 0, romance: 10, humor: 0 } },
          { type: 'flags', set: { caringResponse: true } }
        ],
        opt4b_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Правда? расскажешь как-нибудь.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Приятно, что не только я тут раскрываюсь' },
          { type: 'stats', changes: { success: 0, romance: 9, humor: 0 } },
          { type: 'flags', set: { reciprocal: true } }
        ],
        opt4b_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ахах, ну хоть кто-то ценит мои старания' },
          { type: 'stats', changes: { success: 2, romance: 5, humor: 7 } },
          { type: 'flags', set: { humorRelief: true } }
        ],
        opt4b_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ты серьёзно?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Мы ведь даже не до конца знаем друг друга' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но почему-то я тебе верю. глупо, да?' },
          { type: 'stats', changes: { success: 0, romance: 10, humor: 0 } },
          { type: 'flags', set: { caringResponse: true } }
        ]
      }
    },
    { type: 'message', sender: 'alisa', textKey: 'Ладно, спать пора. завтра понедельник' },
    { type: 'message', sender: 'alisa', textKey: 'У меня с утра проверка от начальства' },
    { type: 'achievement' },
    { type: 'goto', day: 'day5_1' }
  ]
};

/**
 * Day 4 — deeper conversation after Saturday.
 * Rewritten: shorter, less literary, more natural.
 */

export default {
  start: { afterDay: 'day3' },
  steps: [
    {
      type: 'if',
      check: { hasFlag: 'cameToCafe' },
      then: [
        { type: 'message', sender: 'alisa', textKey: 'Привет' },
        { type: 'message', sender: 'alisa', textKey: 'Ты вчера нормально добрался?' },
        { type: 'message', sender: 'alisa', textKey: 'Если честно, не была уверена' },
        { type: 'message', sender: 'alisa', textKey: 'Что ты правда придёшь' }
      ],
      else: [
        { type: 'message', sender: 'alisa', textKey: 'Привет)' },
        { type: 'message', sender: 'alisa', textKey: 'Всё ещё думаю про вчерашний разговор' }
      ]
    },
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Я редко вот так общаюсь с учениками' },
        { sender: 'alisa', textKey: 'Обычно всё сводится к урокам и дедлайнам' },
        { sender: 'alisa', textKey: 'С тобой почему-то иначе' }
      ]
    },
    {
      type: 'choice',
      id: 'day4_choice',
      options: [
        { id: 'opt4_1', labelKey: 'Мне тоже было легко. спасибо' },
        { id: 'opt4_2', labelKey: 'Я весь день думал про наш разговор' },
        { id: 'opt4_3', labelKey: 'Наверное, потому что я обаятельный. шучу' },
        { id: 'opt4_4', labelKey: 'Я тоже думал про тебя. всё, сказал', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day4_choice',
      branches: {
        opt4_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Прям тепло стало' },
          { type: 'reaction', sender: 'alisa', textKey: 'Иногда устаю быть только «училкой»' },
          { type: 'reaction', sender: 'alisa', textKey: 'С тобой могу быть просто собой' },
          { type: 'stats', changes: { success: 6, romance: 8, humor: 0 } }
        ],
        opt4_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ого' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я тоже, если честно' },
          { type: 'reaction', sender: 'alisa', textKey: 'Весь вечер прокручивала наш разговор' },
          { type: 'stats', changes: { success: 2, romance: 12, humor: 0 } }
        ],
        opt4_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Обаятельный — громко сказано' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но забавный — да' },
          { type: 'stats', changes: { success: 3, romance: 5, humor: 8 } }
        ],
        opt4_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'С утра сразу такие заявления' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я, если честно, тоже' },
          { type: 'reaction', sender: 'alisa', textKey: 'Просто первой говорить не хотела' },
          { type: 'stats', changes: { success: 2, romance: 12, humor: 0 } }
        ]
      }
    },
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Если честно' },
        { sender: 'alisa', textKey: 'Я подумываю сменить работу' },
        { sender: 'alisa', textKey: 'Устала немного' },
        { sender: 'alisa', textKey: 'Не от учеников' },
        { sender: 'alisa', textKey: 'От всей этой... системы' },
        { sender: 'alisa', textKey: 'Извини, не хотела грузить' }
      ]
    },
    {
      type: 'choice',
      id: 'day4_choice2',
      options: [
        { id: 'opt4b_1', labelKey: 'Не извиняйся. мне интересно тебя слушать' },
        { id: 'opt4b_2', labelKey: 'Я понимаю. у меня похожая история' },
        { id: 'opt4b_3', labelKey: 'Зато у тебя есть я — твой лучший ученик 😄' },
        { id: 'opt4b_4', labelKey: 'Если решишь уйти — я рядом. и это не про учёбу', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day4_choice2',
      branches: {
        opt4b_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, что не свёл к шутке' },
          { type: 'stats', changes: { success: 0, romance: 10, humor: 0 } },
          { type: 'flags', set: { caringResponse: true } }
        ],
        opt4b_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Правда? расскажешь как-нибудь' },
          { type: 'reaction', sender: 'alisa', textKey: 'Приятно, что я тут не одна раскрываюсь' },
          { type: 'stats', changes: { success: 0, romance: 9, humor: 0 } },
          { type: 'flags', set: { reciprocal: true } }
        ],
        opt4b_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ахах' },
          { type: 'reaction', sender: 'alisa', textKey: 'Хоть кто-то ценит' },
          { type: 'stats', changes: { success: 2, romance: 5, humor: 7 } },
          { type: 'flags', set: { humorRelief: true } }
        ],
        opt4b_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ты серьёзно?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Мы ведь даже не до конца знаем друг друга' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но почему-то я тебе верю' },
          { type: 'stats', changes: { success: 0, romance: 10, humor: 0 } },
          { type: 'flags', set: { caringResponse: true } }
        ]
      }
    },
    { type: 'message', sender: 'alisa', textKey: 'Ладно, спать пора' },
    { type: 'message', sender: 'alisa', textKey: 'Завтра понедельник' },
    { type: 'message', sender: 'alisa', textKey: 'С утра проверка от начальства' },
    { type: 'achievement' },
    { type: 'goto', day: 'day5_1' }
  ]
};

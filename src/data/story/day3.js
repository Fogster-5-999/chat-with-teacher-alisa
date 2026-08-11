/**
 * Day 3 — Saturday. Alisa is off duty in a cafe; the player decides whether to show up.
 */

export default {
  start: { afterDay: 'day2' },
  steps: [
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Привет! суббота, сижу в кофейне, никакой школы' },
        { sender: 'alisa', textKey: 'Жизнь налаживается. ты как, чем занят?' }
      ]
    },
    {
      type: 'if',
      check: { hasFlag: 'interestedCafe' },
      then: [{ type: 'message', sender: 'alisa', textKey: 'Кстати, я всё ждала, придёшь ты или нет 🙂' }]
    },
    {
      type: 'if',
      check: { hasFlag: 'focusedStudy' },
      then: [{ type: 'message', sender: 'alisa', textKey: 'Если что, у меня тут и задание для тебя готово' }]
    },
    {
      type: 'choice',
      id: 'day3_choice',
      options: [
        { id: 'opt3_1', labelKey: 'А ты правда сейчас в той кофейне на Ленина?' },
        { id: 'opt3_2', labelKey: 'Дома сижу, лень. но соскучился по разговору' },
        { id: 'opt3_3', labelKey: 'Слушай, сегодня с домашкой приключилась целая история. Хочешь расскажу?' },
        { id: 'opt3_4', labelKey: 'Тогда приеду. хочу увидеть тебя не только в чате', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day3_choice',
      branches: {
        opt3_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ага, у окна, с ноутом.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Если хочешь - подходи, заодно разберём тему' },
          { type: 'reaction', sender: 'alisa', textKey: 'Только без формальностей сегодня.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я не "препод", а просто Алиса' },
          { type: 'stats', changes: { success: 8, romance: 5, humor: 0 } },
          { type: 'flags', set: { cameToCafe: true } }
        ],
        opt3_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Разговора - это про меня спросить?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Или про свои дела рассказать?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Ладно, давай тут, в переписке. тоже неплохо' },
          { type: 'stats', changes: { success: 2, romance: 4, humor: 0 } }
        ],
        opt3_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Давай. Надеюсь, будет смешно.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но после истории домашку всё равно жду. Ок?' },
          { type: 'stats', changes: { success: 3, romance: 0, humor: 8 } }
        ],
        opt3_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Приедешь? правда?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я уж думала, ты только в чате храбрый 🙂' },
          { type: 'reaction', sender: 'alisa', textKey: 'Тогда жду. столик у окна, без формальностей' },
          { type: 'stats', changes: { success: 4, romance: 8, humor: 0 } },
          { type: 'flags', set: { cameToCafe: true } }
        ]
      }
    },
    {
      type: 'if',
      check: { hasFlag: 'cameToCafe' },
      then: [
        { type: 'message', sender: 'alisa', textKey: 'О, ты реально пришёл.' },
        { type: 'message', sender: 'alisa', textKey: 'Садись, взяла тебе кофе на всякий случай' }
      ]
    },
    {
      type: 'message',
      sender: 'alisa',
      textKey: 'С чего начнём?'
    },
    {
      type: 'message',
      sender: 'alisa',
      textKey: 'Сразу к делу, или сначала выдохнем?'
    },
    {
      type: 'choice',
      id: 'day3_choice2',
      options: [
        { id: 'opt3b_1', labelKey: 'Давай сразу к делу, я собран' },
        { id: 'opt3b_2', labelKey: 'Выдохнем. расскажи, как у тебя дела' },
        { id: 'opt3b_3', labelKey: 'А можно просто помолчать немного?' },
        { id: 'opt3b_4', labelKey: 'Мне с тобой как-то спокойно. непривычно, но приятно', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day3_choice2',
      branches: {
        opt3b_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Уважаю деловой подход. ладно, начинаем' },
          { type: 'stats', changes: { success: 8, romance: 0, humor: 0 } },
          { type: 'flags', set: { politeTopic: true } }
        ],
        opt3b_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Дела... нормально, если честно.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Работы много, но не жалуюсь' },
          { type: 'reaction', sender: 'alisa', textKey: 'Странно, что тебе правда интересно. приятно' },
          { type: 'stats', changes: { success: 0, romance: 8, humor: 0 } },
          { type: 'flags', set: { openTopic: true } }
        ],
        opt3b_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Можно. иногда это лучше любых разговоров' },
          { type: 'stats', changes: { success: 2, romance: 6, humor: 2 } },
          { type: 'flags', set: { openTopic: true } }
        ],
        opt3b_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Спокойно... даже не думала, что кто-то так скажет' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я обычно на работе выключаю эмоции.' },
          { type: 'reaction', sender: 'alisa', textKey: 'С тобой не получается' },
          { type: 'stats', changes: { success: 0, romance: 10, humor: 0 } },
          { type: 'flags', set: { openTopic: true } }
        ]
      }
    },
    { type: 'message', sender: 'alisa', textKey: 'Ладно, мне пора домой.' },
    { type: 'message', sender: 'alisa', textKey: 'Но сегодня было... неожиданно хорошо' },
    { type: 'achievement' },
    { type: 'goto', day: 'day4' }
  ]
};

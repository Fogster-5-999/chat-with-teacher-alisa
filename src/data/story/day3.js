/**
 * Day 3 — Saturday. Cafe decision.
 * Rewritten: shorter, more natural.
 */

export default {
  start: { afterDay: 'day2' },
  steps: [
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Привет! суббота' },
        { sender: 'alisa', textKey: 'Сижу в кофейне, никакой школы' },
        { sender: 'alisa', textKey: 'Ты как, чем занят?' }
      ]
    },
    {
      type: 'if',
      check: { hasFlag: 'interestedCafe' },
      then: [{ type: 'message', sender: 'alisa', textKey: 'Кстати, я ждала, придёшь или нет 🙂' }]
    },
    {
      type: 'if',
      check: { hasFlag: 'focusedStudy' },
      then: [{ type: 'message', sender: 'alisa', textKey: 'Если что, у меня тут и задание готово' }]
    },
    {
      type: 'choice',
      id: 'day3_choice',
      options: [
        { id: 'opt3_1', labelKey: 'Ты правда сейчас в той кофейне на Ленина?' },
        { id: 'opt3_2', labelKey: 'Дома сижу. лень. но соскучился по разговору' },
        { id: 'opt3_3', labelKey: 'Сегодня с домашкой целая история. хочешь расскажу?' },
        { id: 'opt3_4', labelKey: 'Тогда приеду. хочу увидеть не только в чате', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day3_choice',
      branches: {
        opt3_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ага, у окна, с ноутом' },
          { type: 'reaction', sender: 'alisa', textKey: 'Если хочешь — подходи' },
          { type: 'reaction', sender: 'alisa', textKey: 'Сегодня без формальностей' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я просто Алиса' },
          { type: 'stats', changes: { success: 8, romance: 5, humor: 0 } },
          { type: 'flags', set: { cameToCafe: true } }
        ],
        opt3_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Разговора — это про меня спросить?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Или свои дела рассказать?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Ладно, давай тут. тоже нормально' },
          { type: 'stats', changes: { success: 2, romance: 4, humor: 0 } }
        ],
        opt3_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Давай' },
          { type: 'reaction', sender: 'alisa', textKey: 'Надеюсь, будет смешно' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но домашку всё равно жду' },
          { type: 'stats', changes: { success: 3, romance: 0, humor: 8 } }
        ],
        opt3_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Приедешь? правда?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Думала, ты только в чате храбрый 🙂' },
          { type: 'reaction', sender: 'alisa', textKey: 'Жду. столик у окна' },
          { type: 'stats', changes: { success: 4, romance: 8, humor: 0 } },
          { type: 'flags', set: { cameToCafe: true } }
        ]
      }
    },
    {
      type: 'if',
      check: { hasFlag: 'cameToCafe' },
      then: [
        { type: 'message', sender: 'alisa', textKey: 'О, ты реально пришёл' },
        { type: 'message', sender: 'alisa', textKey: 'Садись. взяла тебе кофе на всякий' }
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
      textKey: 'Сразу к делу или сначала выдохнем?'
    },
    {
      type: 'choice',
      id: 'day3_choice2',
      options: [
        { id: 'opt3b_1', labelKey: 'Давай сразу к делу. я собран' },
        { id: 'opt3b_2', labelKey: 'Выдохнем. расскажи, как у тебя дела' },
        { id: 'opt3b_3', labelKey: 'Можно просто помолчать немного?' },
        { id: 'opt3b_4', labelKey: 'Мне с тобой спокойно. непривычно, но приятно', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day3_choice2',
      branches: {
        opt3b_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Уважаю деловой подход' },
          { type: 'reaction', sender: 'alisa', textKey: 'Начинаем' },
          { type: 'stats', changes: { success: 8, romance: 0, humor: 0 } },
          { type: 'flags', set: { politeTopic: true } }
        ],
        opt3b_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Дела... нормально' },
          { type: 'reaction', sender: 'alisa', textKey: 'Работы много, но не жалуюсь' },
          { type: 'reaction', sender: 'alisa', textKey: 'Странно, что тебе правда интересно' },
          { type: 'stats', changes: { success: 0, romance: 8, humor: 0 } },
          { type: 'flags', set: { openTopic: true } }
        ],
        opt3b_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Можно' },
          { type: 'reaction', sender: 'alisa', textKey: 'Иногда это лучше любых разговоров' },
          { type: 'stats', changes: { success: 2, romance: 6, humor: 2 } },
          { type: 'flags', set: { openTopic: true } }
        ],
        opt3b_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Спокойно...' },
          { type: 'reaction', sender: 'alisa', textKey: 'Даже не думала, что кто-то так скажет' },
          { type: 'reaction', sender: 'alisa', textKey: 'На работе я обычно выключаю эмоции' },
          { type: 'reaction', sender: 'alisa', textKey: 'С тобой не получается' },
          { type: 'stats', changes: { success: 0, romance: 10, humor: 0 } },
          { type: 'flags', set: { openTopic: true } }
        ]
      }
    },
    { type: 'message', sender: 'alisa', textKey: 'Ладно, мне пора домой' },
    { type: 'message', sender: 'alisa', textKey: 'Но сегодня было... неожиданно хорошо' },
    { type: 'achievement' },
    { type: 'goto', day: 'day4' }
  ]
};

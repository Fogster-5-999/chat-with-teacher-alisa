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
          { type: 'reaction', sender: 'alisa', textKey: 'Разговоры — это меня расспрашивать?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Или мне про себя рассказывать?' },
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
        { type: 'message', sender: 'system', textKey: '— Дальше — без экрана. Кофе, разговор, тишина 🙂' },
        { type: 'message', sender: 'alisa', textKey: 'Всё, я с чаем на кухне. как добрался?' }
      ]
    },
    {
      type: 'if',
      check: { not: { hasFlag: 'cameToCafe' } },
      then: [
        { type: 'message', sender: 'alisa', textKey: 'Я дома)' },
        { type: 'message', sender: 'alisa', textKey: 'Редко выходит поговорить просто так' },
        { type: 'message', sender: 'alisa', textKey: 'С тобой как-то легко' }
      ]
    },
    {
      type: 'choice',
      id: 'day3_evening_choice',
      options: [
        { id: 'ev_1', labelKey: 'Мне тоже было приятно. до завтра)' },
        { id: 'ev_2', labelKey: 'Пойду заниматься. с понедельника зубрю)' },
        { id: 'ev_3', labelKey: 'До понедельника. не скучай 😄' }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day3_evening_choice',
      branches: {
        ev_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Приятно слышать)' },
          { type: 'stats', changes: { success: 0, romance: 4, humor: 0 } }
        ],
        ev_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Вот и отлично' },
          { type: 'stats', changes: { success: 4, romance: 0, humor: 0 } }
        ],
        ev_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ахах, не обещаю)' },
          { type: 'stats', changes: { success: 0, romance: 0, humor: 4 } }
        ]
      }
    },
    {
      type: 'if',
      check: { hasFlag: 'cameToCafe' },
      then: [{ type: 'voice', voiceId: 'day_3' }]
    },
    {
      type: 'if',
      check: { not: { hasFlag: 'cameToCafe' } },
      then: [{ type: 'message', sender: 'alisa', textKey: 'Ладно, спокойной ночи' }]
    },
    { type: 'achievement' },
    { type: 'goto', day: 'day4' }
  ]
};

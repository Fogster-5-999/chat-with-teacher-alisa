/**
 * Day 1 — evening check-in from Alisa about missed homework.
 */

export default {
  start: { hour: 20, minute: 0 },
  steps: [
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'привет) не спишь?' },
        { sender: 'alisa', textKey: 'я тут смотрю в журнал и ахриневаю... тест по временам ты просто слил, дз пустое. есть что сказать?' },
        { sender: 'alisa', textKey: 'или мне просто пару поставить и не париться? =(' }
      ]
    },
    {
      type: 'choice',
      id: 'day1_choice',
      options: [
        { id: 'opt1_1', labelKey: 'простите, реально не понял тему( можно пересдать? объясните, я всё сделаю' },
        { id: 'opt1_2', labelKey: 'ой, вы меня проверяете? приятно, что думаете обо мне вечером) объясните лично? 😏' },
        { id: 'opt1_3', labelKey: 'сорян, выпал - интернет лагал, забыл. могу сделать сейчас, или мем в качестве извинений?' }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day1_choice',
      branches: {
        opt1_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'ого, слышать такое от тебя - праздник. ладно, скину тебе таблицу с правилом, сделай 5 предложений с примерами. если завтра к вечеру пришлёшь - спишем. договорились?' },
          { type: 'stats', changes: { success: 10, romance: 0, humor: 0 } },
          { type: 'flags', set: { studiedHard: true, allHonest: true } }
        ],
        opt1_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'ой ты смелый) ладно, завтра подойди на перемене, разберём тему. но только потому, что я переживаю за твой аттестат, а не потому что я «красивая» (хотя спс, приятно)' },
          { type: 'stats', changes: { success: 0, romance: 5, humor: 0 } },
          { type: 'flags', set: { flirtWithTeacher: true } }
        ],
        opt1_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'я ничо не поняла из «лагал» и «выпал», но мемы люблю. давай так: ты делаешь задание на листочке завтра утром, а я посмотрю на кота. если кот смешной - поставлю 3, если нет - 2. идёт?' },
          { type: 'stats', changes: { success: -5, romance: 0, humor: 5 } },
          { type: 'flags', set: { joked: true } }
        ]
      }
    },
    { type: 'flags', set: { day1Completed: true } },
    { type: 'achievement' },
    // Conditional next day
    { type: 'if', check: { hasFlag: 'flirtWithTeacher' }, then: [{ type: 'goto', day: 'day2_flirt' }] },
    { type: 'if', check: { hasFlag: 'studiedHard' }, then: [{ type: 'goto', day: 'day2_study' }] },
    { type: 'goto', day: 'day2' }
  ]
};

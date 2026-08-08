/**
 * Day 7 — final day, the story's conclusion.
 */

export default {
  start: { afterDay: 'day6' },
  steps: [
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'привет. я уже в парке. сижу на той же скамейке. ты идёшь?' },
        { sender: 'alisa', textKey: 'я хочу, чтобы мы приняли решение вместе. что бы ты ни выбрал - я буду рядом. просто знай это.' }
      ]
    },
    {
      type: 'choice',
      id: 'day7_choice',
      options: [
        { id: 'opt7_1', labelKey: 'я пришёл. давай просто будем вместе. мне плевать на слухи' },
        { id: 'opt7_2', labelKey: 'ты для меня больше, чем учительница. может, подождём до выпуска?' },
        { id: 'opt7_3', labelKey: 'давай общаться, как сейчас, но без давления. это моё решение' },
        { id: 'opt7_4', labelKey: 'принёс тебе мем с котиком) а если серьёзно - я выбираю тебя', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day7_choice',
      branches: {
        opt7_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'я тоже. мы справимся, я верю. спасибо, что пришёл.' },
          { type: 'stats', changes: { success: 10, romance: 15, humor: 0 } }
        ],
        opt7_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'это мудрое решение. я подожду. а пока мы будем лучшими друзьями и я помогу тебе с учёбой. договорились?' },
          { type: 'stats', changes: { success: 15, romance: 10, humor: 0 } }
        ],
        opt7_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'это то, что я хотела услышать. никакого давления, просто общение. я согласна.' },
          { type: 'stats', changes: { success: 10, romance: 5, humor: 0 } }
        ],
        opt7_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'ахах, какой кот? показывай! но серьёзно... я тоже выбираю тебя. всегда.' },
          { type: 'stats', changes: { success: 5, romance: 15, humor: 10 } }
        ]
      }
    },
    { type: 'flags', set: { gameEnded: true } },
    { type: 'achievement' },
    {
      type: 'endGame',
      messages: [
        { sender: 'system', textKey: '🎬 Игра завершена. Спасибо за прохождение!' },
        { sender: 'system', textKey: '📊 Итоговые шкалы: Успеваемость: {{success}}, Романтика: {{romance}}, Юмор: {{humor}}' },
        { sender: 'system', textKey: 'Ты прошёл все 7 дней. Каким будет твой финал - зависит только от тебя.' }
      ]
    }
  ]
};

/** Day 4 — closeness is earned through restraint, not a confession on command. */
export default {
  start: { afterDay: 'day3' },
  steps: [
    { type: 'if', check: { hasFlag: 'cafeMet' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Привет.' },
        { sender: 'alisa', textKey: 'Я всё ещё думаю о субботе.' },
        { sender: 'alisa', textKey: 'Спасибо, что не сделал всё неловким.' }
      ] }
    ], else: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Привет.' },
        { sender: 'alisa', textKey: 'Как твоя тема, я сегодня проверяю ваши работы.' }
      ] }
    ] },
    { type: 'choice', id: 'day4_tone_choice', options: [
      { id: 'd4_listen', labelKey: 'd4_listen' },
      { id: 'd4_study', labelKey: 'd4_study' },
      { id: 'd4_joke', labelKey: 'd4_joke' },
      { id: 'd4_confess_early', labelKey: 'd4_confess_early', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day4_tone_choice', branches: {
      d4_listen: [
        { type: 'reaction', sender: 'alisa', textKey: 'Мне приятно. Только без громких слов, ладно?' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { trustBuilt: true } }
      ],
      d4_study: [
        { type: 'reaction', sender: 'alisa', textKey: 'Вот это мне нравится.' },
        { type: 'stats', changes: { success: 3, romance: 1, humor: 0 } },
        { type: 'flags', set: { studyFocused: true } }
      ],
      d4_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Хоть посмеялась.' },
        { type: 'stats', changes: { success: 0, romance: 0, humor: 3 } }
      ],
      d4_confess_early: [
        { type: 'reaction', sender: 'alisa', textKey: 'Мне пока рано такое слышать.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Я просто не знаю, что на это ответить.' },
        { type: 'stats', changes: { success: 0, romance: -3, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true } }
      ]
    } },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Завтра у меня разговор с руководителем.' },
      { sender: 'alisa', textKey: 'Не про тебя. Просто по работе.' },
      { sender: 'alisa', textKey: 'Но почему-то я нервничаю сильнее обычного.' }
    ] },
    { type: 'choice', id: 'day4_support_choice', options: [
      { id: 'd4_support_space', labelKey: 'd4_support_space' },
      { id: 'd4_support_transfer', labelKey: 'd4_support_transfer' },
      { id: 'd4_support_joke', labelKey: 'd4_support_joke' },
      { id: 'd4_support_pressure', labelKey: 'd4_support_pressure', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day4_support_choice', branches: {
      d4_support_space: [
        { type: 'reaction', sender: 'alisa', textKey: 'Только не торопи меня сейчас, ладно?' },
        { type: 'reaction', sender: 'alisa', textKey: 'Извини. Я сегодня совсем вымоталась.' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { respectsBoundary: true } }
      ],
      d4_support_transfer: [
        { type: 'reaction', sender: 'alisa', textKey: 'Ты правда готов перевестись?' },
        { type: 'reaction', sender: 'alisa', textKey: 'Не знаю, к чему это приведёт. Но спасибо.' },
        { type: 'stats', changes: { success: 3, romance: 2, humor: 0 } },
        { type: 'flags', set: { openToTransfer: true } }
      ],
      d4_support_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Я улыбнулась. Но завтра всё равно будет тяжело.' },
        { type: 'stats', changes: { success: 0, romance: 0, humor: 2 } },
      ],
      d4_support_pressure: [
        { type: 'reaction', sender: 'alisa', textKey: 'Не надо решать за меня, пожалуйста.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Если что, я сама скажу.' },
        { type: 'stats', changes: { success: 0, romance: -3, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true } }
      ]
    } },
    { type: 'message', sender: 'alisa', textKey: 'Ладно, пойду готовиться. Спокойной ночи.' },
    { type: 'achievement' },
    { type: 'goto', day: 'day5_1' }
  ]
};

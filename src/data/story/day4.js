/** Day 4 — closeness is earned through restraint, not a confession on command. */
export default {
  start: { afterDay: 'day3' },
  steps: [
    { type: 'if', check: { hasFlag: 'cafeMet' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Привет', time: '21:16' },
        { sender: 'alisa', textKey: 'Наша встреча всё ещё в голове', time: '21:17' },
        { sender: 'alisa', textKey: 'И спасибо, что без неловкостей', time: '21:19' }
      ] },
      { type: 'if', check: { hasFlag: 'askedPersonal' }, then: [
        { type: 'messages', list: [
          { sender: 'alisa', textKey: 'И насчёт вашего вопроса…', time: '21:21' },
          { sender: 'alisa', textKey: 'Я ещё думаю, как ответить. Дайте день-два, ладно?', time: '21:22' }
        ] }
      ] }
    ], else: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Здравствуйте', time: '21:16' },
        { sender: 'alisa', textKey: 'Как у вас с темой? Я сегодня проверяю работы', time: '21:17' }
      ] }
    ] },
    { type: 'choice', id: 'day4_tone_choice', time: '21:25', options: [
      { id: 'd4_listen', labelKey: 'd4_listen' },
      { id: 'd4_study', labelKey: 'd4_study' },
      { id: 'd4_joke', labelKey: 'd4_joke' },
      { id: 'd4_confess_early', labelKey: 'd4_confess_early', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day4_tone_choice', branches: {
      d4_listen: [
        { type: 'reaction', sender: 'alisa', textKey: 'Мне приятно)', time: '21:27' },
        { type: 'reaction', sender: 'alisa', textKey: 'Только без громких слов, ладно?', time: '21:28' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { trustBuilt: true } }
      ],
      d4_study: [
        { type: 'reaction', sender: 'alisa', textKey: 'Вот это мне нравится', time: '21:27' },
        { type: 'stats', changes: { success: 3, romance: 1, humor: 0 } },
        { type: 'flags', set: { studyFocused: true } }
      ],
      d4_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Хоть посмеялась', time: '21:27' },
        { type: 'stats', changes: { success: 0, romance: 0, humor: 3 } }
      ],
      d4_confess_early: [
        { type: 'reaction', sender: 'alisa', textKey: 'Мне пока рано такое слышать', time: '21:27' },
        { type: 'reaction', sender: 'alisa', textKey: 'Я просто не знаю, что на это ответить', time: '21:28' },
        { type: 'stats', changes: { success: 0, romance: -3, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true } }
      ]
    } },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Завтра у меня разговор с руководителем', time: '21:31' },
      { sender: 'alisa', textKey: 'Но почему-то я нервничаю сильнее обычного', time: '21:32' }
    ] },
    { type: 'choice', id: 'day4_support_choice', time: '21:35', options: [
      { id: 'd4_support_space', labelKey: 'd4_support_space' },
      { id: 'd4_support_transfer', labelKey: 'd4_support_transfer' },
      { id: 'd4_support_joke', labelKey: 'd4_support_joke' },
      { id: 'd4_support_pressure', labelKey: 'd4_support_pressure', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day4_support_choice', branches: {
      d4_support_space: [
        { type: 'reaction', sender: 'alisa', textKey: 'Только не торопите меня сейчас, ладно?', time: '21:37' },
        { type: 'reaction', sender: 'alisa', textKey: 'Извините. Я сегодня совсем вымоталась', time: '21:38' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { respectsBoundary: true } }
      ],
      d4_support_transfer: [
        { type: 'reaction', sender: 'alisa', textKey: 'Вы правда готовы перевестись?', time: '21:37' },
        { type: 'reaction', sender: 'alisa', textKey: 'Не знаю, к чему это приведёт. Но спасибо', time: '21:39' },
        { type: 'stats', changes: { success: 3, romance: 2, humor: 0 } },
        { type: 'flags', set: { openToTransfer: true } }
      ],
      d4_support_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Я улыбнулась)', time: '21:37' },
        { type: 'reaction', sender: 'alisa', textKey: 'Но завтра всё равно будет тяжело', time: '21:38' },
        { type: 'stats', changes: { success: 0, romance: 0, humor: 2 } },
      ],
      d4_support_pressure: [
        { type: 'reaction', sender: 'alisa', textKey: 'Не надо решать за меня, пожалуйста!', time: '21:37' },
        { type: 'reaction', sender: 'alisa', textKey: 'Если что, я сама скажу', time: '21:38' },
        { type: 'stats', changes: { success: 0, romance: -3, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true } }
      ]
    } },
    { type: 'if', check: { hasFlag: 'trustBuilt' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Знаешь…', time: '21:42' },
        { sender: 'alisa', textKey: 'Давай перейдём на «ты»?', time: '21:43' },
        { sender: 'alisa', textKey: 'Мне так легче, когда я с тобой говорю', time: '21:44' }
      ] }
    ], else: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Слушай…', time: '21:42' },
        { sender: 'alisa', textKey: 'Давай перейдём на «ты»', time: '21:43' },
        { sender: 'alisa', textKey: 'Столько уже переписывались — как-то странно на «вы».', time: '21:45' }
      ] }
    ] },
    { type: 'message', sender: 'alisa', textKey: 'Ладно, пойду готовиться. До завтра', time: '21:47' },
    { type: 'achievement' },
    { type: 'goto', day: 'day5_1' }
  ]
};

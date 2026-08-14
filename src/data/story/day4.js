/** Day 4 — closeness is earned through restraint, not a confession on command. */
export default {
  start: { afterDay: 'day3' },
  steps: [
    { type: 'if', check: { hasFlag: 'cafeMet' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Привет', time: '20:01' },
        { sender: 'alisa', textKey: 'Суббота всё ещё в голове', time: '20:02' },
        { sender: 'alisa', textKey: 'И спасибо, что без неловкостей', time: '20:04' }
      ] },
      { type: 'if', check: { hasFlag: 'askedPersonal' }, then: [
        { type: 'messages', list: [
          { sender: 'alisa', textKey: 'И насчёт вашего вопроса…', time: '20:06' },
          { sender: 'alisa', textKey: 'Я ещё думаю, как ответить. Дайте день-два, ладно?', time: '20:07' }
        ] }
      ] }
    ], else: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Здравствуйте', time: '20:01' },
        { sender: 'alisa', textKey: 'Как у вас с темой? Я сегодня проверяю работы', time: '20:02' }
      ] }
    ] },
    { type: 'choice', id: 'day4_tone_choice', time: '20:10', options: [
      { id: 'd4_listen', labelKey: 'd4_listen' },
      { id: 'd4_study', labelKey: 'd4_study' },
      { id: 'd4_joke', labelKey: 'd4_joke' },
      { id: 'd4_confess_early', labelKey: 'd4_confess_early', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day4_tone_choice', branches: {
      d4_listen: [
        { type: 'reaction', sender: 'alisa', textKey: 'Мне приятно)', time: '20:12' },
        { type: 'reaction', sender: 'alisa', textKey: 'Только без громких слов, ладно?', time: '20:13' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { trustBuilt: true } }
      ],
      d4_study: [
        { type: 'reaction', sender: 'alisa', textKey: 'Вот это мне нравится', time: '20:12' },
        { type: 'stats', changes: { success: 3, romance: 1, humor: 0 } },
        { type: 'flags', set: { studyFocused: true } }
      ],
      d4_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Хоть посмеялась', time: '20:12' },
        { type: 'stats', changes: { success: 0, romance: 0, humor: 3 } }
      ],
      d4_confess_early: [
        { type: 'reaction', sender: 'alisa', textKey: 'Мне пока рано такое слышать', time: '20:12' },
        { type: 'reaction', sender: 'alisa', textKey: 'Я просто не знаю, что на это ответить', time: '20:13' },
        { type: 'stats', changes: { success: 0, romance: -3, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true } }
      ]
    } },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Завтра у меня разговор с руководителем', time: '20:16' },
      { sender: 'alisa', textKey: 'Но почему-то я нервничаю сильнее обычного', time: '20:17' }
    ] },
    { type: 'choice', id: 'day4_support_choice', time: '20:20', options: [
      { id: 'd4_support_space', labelKey: 'd4_support_space' },
      { id: 'd4_support_transfer', labelKey: 'd4_support_transfer' },
      { id: 'd4_support_joke', labelKey: 'd4_support_joke' },
      { id: 'd4_support_pressure', labelKey: 'd4_support_pressure', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day4_support_choice', branches: {
      d4_support_space: [
        { type: 'reaction', sender: 'alisa', textKey: 'Только не торопите меня сейчас, ладно?', time: '20:22' },
        { type: 'reaction', sender: 'alisa', textKey: 'Извините. Я сегодня совсем вымоталась', time: '20:23' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { respectsBoundary: true } }
      ],
      d4_support_transfer: [
        { type: 'reaction', sender: 'alisa', textKey: 'Вы правда готовы перевестись?', time: '20:22' },
        { type: 'reaction', sender: 'alisa', textKey: 'Не знаю, к чему это приведёт. Но спасибо', time: '20:24' },
        { type: 'stats', changes: { success: 3, romance: 2, humor: 0 } },
        { type: 'flags', set: { openToTransfer: true } }
      ],
      d4_support_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Я улыбнулась)', time: '20:22' },
        { type: 'reaction', sender: 'alisa', textKey: 'Но завтра всё равно будет тяжело', time: '20:23' },
        { type: 'stats', changes: { success: 0, romance: 0, humor: 2 } },
      ],
      d4_support_pressure: [
        { type: 'reaction', sender: 'alisa', textKey: 'Не надо решать за меня, пожалуйста!', time: '20:22' },
        { type: 'reaction', sender: 'alisa', textKey: 'Если что, я сама скажу', time: '20:23' },
        { type: 'stats', changes: { success: 0, romance: -3, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true } }
      ]
    } },
    { type: 'if', check: { hasFlag: 'trustBuilt' }, then: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Знаешь…', time: '20:27' },
        { sender: 'alisa', textKey: 'Давай перейдём на «ты»?', time: '20:28' },
        { sender: 'alisa', textKey: 'Мне так легче, когда я с тобой говорю', time: '20:29' }
      ] }
    ], else: [
      { type: 'messages', list: [
        { sender: 'alisa', textKey: 'Слушай…', time: '20:27' },
        { sender: 'alisa', textKey: 'Давай перейдём на «ты»', time: '20:28' },
        { sender: 'alisa', textKey: 'Столько уже переписывались — как-то странно на «вы».', time: '20:30' }
      ] }
    ] },
    { type: 'message', sender: 'alisa', textKey: 'Ладно, пойду готовиться. До завтра', time: '20:32' },
    { type: 'achievement' },
    { type: 'goto', day: 'day5_1' }
  ]
};
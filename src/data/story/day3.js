/** Day 3 — the cafe stays off-screen; the choice is whether trust earned a meeting. */
export default {
  start: { afterDay: 'day2' },
  steps: [
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Привет, я уже в кофейне.' },
      { sender: 'alisa', textKey: 'С ноутом, конспектами и ужасным американо.' }
    ] },
    { type: 'if', check: { hasFlag: 'warmthShared' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Кстати, после твоего сообщения я всё-таки оставила то фото.' }
    ] },
    { type: 'if', check: { and: [{ hasFlag: 'cafePlan' }, { not: { hasFlag: 'pushedTooFast' } }] }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Если планы не поменялись, могу час тебе выделить.' },
      { type: 'choice', id: 'day3_cafe_choice', options: [
        { id: 'd3_come_study', labelKey: 'd3_come_study' },
        { id: 'd3_come_honest', labelKey: 'd3_come_honest' },
        { id: 'd3_stay_home', labelKey: 'd3_stay_home' },
        { id: 'd3_come_pushy', labelKey: 'd3_come_pushy', hidden: true }
      ] },
      { type: 'branch', onChoice: 'day3_cafe_choice', branches: {
        d3_come_study: [
          { type: 'reaction', sender: 'alisa', textKey: 'Хорошо. Я у окна. Но сначала правда разберём тему.' },
          { type: 'stats', changes: { success: 4, romance: 1, humor: 0 } },
          { type: 'flags', set: { cafeMet: true } }
        ],
        d3_come_honest: [
          { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, что нормально спросил.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Заходи. Сначала разберём тему, дальше посмотрим.' },
          { type: 'stats', changes: { success: 2, romance: 3, humor: 0 } },
          { type: 'flags', set: { cafeMet: true, warmthShared: true } }
        ],
        d3_stay_home: [
          { type: 'reaction', sender: 'alisa', textKey: 'Без проблем. Скину тебе заметки, не потеряешься.' },
          { type: 'stats', changes: { success: 2, romance: 0, humor: 0 } },
          { type: 'flags', set: { prefersDistance: true } }
        ],
        d3_come_pushy: [
          { type: 'reaction', sender: 'alisa', textKey: 'Нет, тогда лучше вообще не приходи.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я предлагала просто позаниматься, а не вот это всё.' },
          { type: 'stats', changes: { success: -2, romance: -5, humor: 0 } },
          { type: 'flags', set: { pushedTooFast: true } }
        ]
      } }
    ] },
    { type: 'if', check: { or: [{ hasFlag: 'prefersDistance' }, { hasFlag: 'pushedTooFast' }] }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Сегодня я только по работе. Если что-то по теме — пиши сюда.' },
      { type: 'choice', id: 'day3_remote_choice', options: [
        { id: 'd3_remote_study', labelKey: 'd3_remote_study' },
        { id: 'd3_remote_checkin', labelKey: 'd3_remote_checkin' },
        { id: 'd3_remote_leave', labelKey: 'd3_remote_leave' }
      ] },
      { type: 'branch', onChoice: 'day3_remote_choice', branches: {
        d3_remote_study: [
          { type: 'reaction', sender: 'alisa', textKey: 'Вот, с этого и начнём.' },
          { type: 'stats', changes: { success: 3, romance: 0, humor: 0 } },
          { type: 'flags', set: { studyFocused: true } }
        ],
        d3_remote_checkin: [
          { type: 'reaction', sender: 'alisa', textKey: 'Нормально, устала, но жить буду.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, что просто спросил.' },
          { type: 'stats', changes: { success: 0, romance: 1, humor: 0 } },
          { type: 'flags', set: { warmthShared: true } }
        ],
        d3_remote_leave: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ок, хороших выходных.' },
          { type: 'flags', set: { prefersDistance: true } }
        ]
      } }
    ] },
    { type: 'if', check: { hasFlag: 'cafeMet' }, then: [
      { type: 'message', sender: 'system', textKey: '— Дальше — без экрана. Кофе, конспекты и спокойный разговор.' },
      { type: 'message', sender: 'alisa', textKey: 'Я уже дома, ты нормально добрался?' },
      { type: 'choice', id: 'day3_after_cafe', options: [
        { id: 'd3_after_thanks', labelKey: 'd3_after_thanks' },
        { id: 'd3_after_study', labelKey: 'd3_after_study' },
        { id: 'd3_after_flirt', labelKey: 'd3_after_flirt', hidden: true }
      ] },
      { type: 'branch', onChoice: 'day3_after_cafe', branches: {
        d3_after_thanks: [
          { type: 'reaction', sender: 'alisa', textKey: 'Мне тоже было спокойно. Спасибо.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Не знаю, зачем это пишу. Но ладно.' },
          { type: 'stats', changes: { success: 0, romance: 3, humor: 0 } },
          { type: 'flags', set: { trustBuilt: true } }
        ],
        d3_after_study: [
          { type: 'reaction', sender: 'alisa', textKey: 'Вот это мне нравится. Завтра отдыхай.' },
          { type: 'stats', changes: { success: 3, romance: 1, humor: 0 } },
          { type: 'flags', set: { trustBuilt: true } }
        ],
        d3_after_flirt: [
          { type: 'reaction', sender: 'alisa', textKey: 'Не своди всё к намёкам, хорошо?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Вот сейчас уже перебор.' },
          { type: 'stats', changes: { success: 0, romance: -4, humor: 0 } },
          { type: 'flags', set: { pushedTooFast: true } }
        ]
      } },
      { type: 'voice', voiceId: 'day_3' }
    ] },
    { type: 'if', check: { not: { hasFlag: 'cafeMet' } }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Я ещё пару часов тут с работами, глаза уже квадратные. Потом напишу, как всё сдать.' }
    ] },
    { type: 'achievement' },
    { type: 'goto', day: 'day4' }
  ]
};

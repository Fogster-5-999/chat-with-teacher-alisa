/** Day 3 — the cafe stays off-screen; the choice is whether trust earned a meeting. */
export default {
  start: { afterDay: 'day2' },
  steps: [
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Добрый день', time: '20:01' },
      { sender: 'alisa', textKey: 'Если планы не поменялись, могу час вам выделить', time: '20:02' },
      { sender: 'alisa', textKey: 'Вы как подойдете, я уже по идее освобожусь', time: '20:03' }
    ] },
    { type: 'if', check: { hasFlag: 'warmthShared' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Кстати, после вашего сообщения я всё-таки оставила то фото', time: '20:05' }
    ] },
    { type: 'if', check: { and: [{ hasFlag: 'cafePlan' }, { not: { hasFlag: 'pushedTooFast' } }] }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Если планы не поменялись, могу час вам выделить', time: '20:06' },
      { type: 'choice', id: 'day3_cafe_choice', time: '20:09', options: [
        { id: 'd3_come_study', labelKey: 'd3_come_study' },
        { id: 'd3_come_honest', labelKey: 'd3_come_honest' },
        { id: 'd3_stay_home', labelKey: 'd3_stay_home' },
        { id: 'd3_come_pushy', labelKey: 'd3_come_pushy', hidden: true }
      ] },
      { type: 'branch', onChoice: 'day3_cafe_choice', branches: {
        d3_come_study: [
          { type: 'reaction', sender: 'alisa', textKey: 'Хорошо', time: '20:11' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я у окна. Но сначала правда разберём тему', time: '20:12' },
          { type: 'stats', changes: { success: 4, romance: 1, humor: 0 } },
          { type: 'flags', set: { cafeMet: true } }
        ],
        d3_come_honest: [
          { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, что спросили', time: '20:11' },
          { type: 'reaction', sender: 'alisa', textKey: 'Сначала разберём тему, дальше посмотрим', time: '20:13' },
          { type: 'stats', changes: { success: 2, romance: 3, humor: 0 } },
          { type: 'flags', set: { cafeMet: true, warmthShared: true } }
        ],
        d3_stay_home: [
          { type: 'reaction', sender: 'alisa', textKey: 'Без проблем. Скину вам заметки, не потеряетесь', time: '20:11' },
          { type: 'stats', changes: { success: 2, romance: 0, humor: 0 } },
          { type: 'flags', set: { prefersDistance: true } }
        ],
        d3_come_pushy: [
          { type: 'reaction', sender: 'alisa', textKey: 'Нет, тогда лучше вообще не приходите', time: '20:11' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я предлагала просто позаниматься, а не вот это всё', time: '20:13' },
          { type: 'stats', changes: { success: -2, romance: -5, humor: 0 } },
          { type: 'flags', set: { pushedTooFast: true } }
        ]
      } }
    ] },
    { type: 'if', check: { or: [{ hasFlag: 'prefersDistance' }, { hasFlag: 'pushedTooFast' }] }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Сегодня я только по работе. Если что-то по теме — пишите сюда', time: '20:14' },
      { type: 'choice', id: 'day3_remote_choice', time: '20:17', options: [
        { id: 'd3_remote_study', labelKey: 'd3_remote_study' },
        { id: 'd3_remote_checkin', labelKey: 'd3_remote_checkin' },
        { id: 'd3_remote_leave', labelKey: 'd3_remote_leave' }
      ] },
      { type: 'branch', onChoice: 'day3_remote_choice', branches: {
        d3_remote_study: [
          { type: 'reaction', sender: 'alisa', textKey: 'Вот, с этого и начнём', time: '20:19' },
          { type: 'stats', changes: { success: 3, romance: 0, humor: 0 } },
          { type: 'flags', set: { studyFocused: true } }
        ],
        d3_remote_checkin: [
          { type: 'reaction', sender: 'alisa', textKey: 'Нормально, устала, но жить буду', time: '20:19' },
          { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, что просто спросили', time: '20:20' },
          { type: 'stats', changes: { success: 0, romance: 1, humor: 0 } },
          { type: 'flags', set: { warmthShared: true } }
        ],
        d3_remote_leave: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ок', time: '20:19' },
          { type: 'reaction', sender: 'alisa', textKey: 'Хороших выходных', time: '20:20' },
          { type: 'flags', set: { prefersDistance: true } }
        ]
      } }
    ] },
    { type: 'if', check: { hasFlag: 'cafeMet' }, then: [
      { type: 'message', sender: 'system', textKey: '— Дальше — без экрана.' },
      { type: 'message', sender: 'system', textKey: 'Она черкает ручкой по полям тетради, разбирает твои ошибки — и вдруг смеётся над собственной фразой «ну что за ученик мне достался».' },
      { type: 'message', sender: 'system', textKey: 'К концу часа уже кажется, что говорили не про английский, а про всё подряд. И не хочется уходить.' },
      { type: 'message', sender: 'alisa', textKey: 'Вы нормально добрались?', time: '21:15' },
      { type: 'message', sender: 'alisa', textKey: 'Спасибо, что пришли. Вы стараетесь, это видно', time: '21:16' },
      { type: 'choice', id: 'day3_after_cafe', time: '21:19', options: [
        { id: 'd3_after_thanks', labelKey: 'd3_after_thanks' },
        { id: 'd3_after_study', labelKey: 'd3_after_study' },
        { id: 'd3_after_personal', labelKey: 'd3_after_personal' },
        { id: 'd3_after_flirt', labelKey: 'd3_after_flirt', hidden: true }
      ] },
      { type: 'branch', onChoice: 'day3_after_cafe', branches: {
        d3_after_thanks: [
          { type: 'reaction', sender: 'alisa', textKey: 'Мне тоже было спокойно. Спасибо', time: '21:21' },
          { type: 'reaction', sender: 'alisa', textKey: 'Не знаю, зачем это пишу. Но ладно', time: '21:22' },
          { type: 'stats', changes: { success: 0, romance: 3, humor: 0 } },
          { type: 'flags', set: { trustBuilt: true } }
        ],
        d3_after_study: [
          { type: 'reaction', sender: 'alisa', textKey: 'Вот это мне нравится. Завтра отдыхайте', time: '21:21' },
          { type: 'stats', changes: { success: 3, romance: 1, humor: 0 } },
          { type: 'flags', set: { trustBuilt: true } }
        ],
        d3_after_personal: [
          { type: 'reaction', sender: 'alisa', textKey: 'Это зависит от вопроса. Давайте не сейчас — поздно уже. Напишите завтра днём', time: '21:21' },
          { type: 'stats', changes: { success: 0, romance: 0, humor: 0 } },
          { type: 'flags', set: { warmthShared: true, askedPersonal: true } }
        ],
        d3_after_flirt: [
          { type: 'reaction', sender: 'alisa', textKey: 'Не сводите всё к намёкам, хорошо?', time: '21:21' },
          { type: 'reaction', sender: 'alisa', textKey: 'Вот сейчас уже перебор', time: '21:22' },
          { type: 'stats', changes: { success: 0, romance: -4, humor: 0 } },
          { type: 'flags', set: { pushedTooFast: true, afterCafeFlirt: true } }
        ]
      } },
      { type: 'if', check: { not: { hasFlag: 'afterCafeFlirt' } }, then: [
        { type: 'voice', voiceId: 'day_3', time: '21:24' }
      ] }
    ] },
    { type: 'if', check: { not: { hasFlag: 'cafeMet' } }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Я ещё пару часов тут с работами, глаза уже квадратные. Потом напишу, как всё сдам', time: '20:21' }
    ] },
    { type: 'achievement' },
    { type: 'goto', day: 'day4' }
  ]
};

/** Day 2 — competence and a first, deliberately small personal opening. */
export const day2 = {
  start: { afterDay: 'day1' },
  steps: [
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Здравствуйте', time: '20:31' },
      { sender: 'alisa', textKey: 'Работу получила, есть ошибки(', time: '20:32' }
    ] },
    { type: 'if', check: { hasFlag: 'pushedTooFast' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Давайте сегодня просто про учёбу, ладно?', time: '20:34' }
    ] },
    { type: 'if', check: { hasFlag: 'respectsBoundary' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Кстати, спасибо, что вчера без споров', time: '20:35' }
    ] },
    { type: 'if', check: { hasFlag: 'studyFocused' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'О, вы всё-таки не забросили тему', time: '20:36' }
    ] },
    { type: 'if', check: { hasFlag: 'selfStudy' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Вы сами разобрались? Вот это уже хорошо', time: '20:37' }
    ] },
    { type: 'if', check: { hasFlag: 'pushySchedule' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'После работы я обычно уже не отвечаю', time: '20:38' },
      { type: 'message', sender: 'alisa', textKey: 'Не обижайтесь', time: '20:39' }
    ] },
    { type: 'miniTest', id: 'day2_test', intro: 'Давай быстрый блиц. Всего три вопроса — и свободен', time: '20:42', questions: [
      { id: 'q1', text: 'Вставь правильное слово: ___ I a student? (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 0 },
      { id: 'q2', text: 'Вставь правильное слово: She ___ at home. (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 1 },
      { id: 'q3', text: 'Вставь правильное слово: They ___ going to school. (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 2 }
    ], achievementId: 'day2_minitest_passed', successPoints: 3, successMessage: 'Неплохо, +3 к успеваемости', failMessage: 'Не страшно, тему ещё раз закрепим' },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Ладно, с учёбой пока всё', time: '20:46' },
      { sender: 'alisa', textKey: 'Я новое фото для страницы кафедры сделала', time: '20:47' },
      { sender: 'alisa', textKey: 'Сама не могу решить, нормальное оно или нет. Глянете?', time: '20:48' }
    ] },
    { type: 'photo', url: 'res/chat1.png', blurred: true, time: '20:49' },
    { type: 'choice', id: 'day2_photo_response', time: '20:52', options: [
      { id: 'd2_photo_kind', labelKey: 'd2_photo_kind' },
      { id: 'd2_photo_honest', labelKey: 'd2_photo_honest' },
      { id: 'd2_photo_joke', labelKey: 'd2_photo_joke' },
      { id: 'd2_photo_flirt', labelKey: 'd2_photo_flirt', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day2_photo_response', branches: {
      d2_photo_kind: [
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо', time: '20:54' },
        { type: 'reaction', sender: 'alisa', textKey: 'Хоть не буду переделывать его в сотый раз)', time: '20:55' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { warmthShared: true } }
      ],
      d2_photo_honest: [
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо. Теперь я рада)', time: '20:54' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { honestWithAlisa: true } }
      ],
      d2_photo_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Всё, после такого вам фото больше не показываю)', time: '20:54' },
        { type: 'reaction', sender: 'alisa', textKey: 'Ахаха, надеюсь вы поверили', time: '20:56' },
        { type: 'stats', changes: { success: 0, romance: 0, humor: 3 } }
      ],
      d2_photo_flirt: [
        { type: 'reaction', sender: 'alisa', textKey: 'Стоп. Это звучит странно', time: '20:54' },
        { type: 'reaction', sender: 'alisa', textKey: 'Не надо превращать каждое сообщение в намёк', time: '20:55' },
        { type: 'stats', changes: { success: 0, romance: -4, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true } }
      ]
    } },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'А сейчас о английском', time: '20:58' },
      { sender: 'alisa', textKey: 'Завтра днём буду в кофейне на Ленина, готовить материалы для пар', time: '20:59' },
      { sender: 'alisa', textKey: 'Можете подойти, разберём ошибки вместе', time: '21:00' },
      { sender: 'alisa', textKey: 'Я там обычно пару часиков сижу', time: '21:02' },
      { sender: 'alisa', textKey: 'Но это просто консультация.', time: '21:03' }
    ] },
    { type: 'choice', id: 'day2_cafe_response', time: '21:06', options: [
      { id: 'd2_cafe_study', labelKey: 'd2_cafe_study' },
      { id: 'd2_cafe_home', labelKey: 'd2_cafe_home' },
      { id: 'd2_cafe_joke', labelKey: 'd2_cafe_joke' },
      { id: 'd2_cafe_date', labelKey: 'd2_cafe_date', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day2_cafe_response', branches: {
      d2_cafe_study: [
        { type: 'reaction', sender: 'alisa', textKey: 'Тогда можете заглянуть. Позанимаемся', time: '21:08' },
        { type: 'stats', changes: { success: 3, romance: 1, humor: 0 } },
        { type: 'flags', set: { cafePlan: true, respectsBoundary: true } }
      ],
      d2_cafe_home: [
        { type: 'reaction', sender: 'alisa', textKey: 'Тоже вариант. Вечером скину задания', time: '21:08' },
        { type: 'stats', changes: { success: 2, romance: 0, humor: 0 } },
        { type: 'flags', set: { prefersDistance: true } }
      ],
      d2_cafe_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Кофе тогда с вас', time: '21:08' },
        { type: 'stats', changes: { success: 1, romance: 0, humor: 3 } }
      ],
      d2_cafe_date: [
        { type: 'reaction', sender: 'alisa', textKey: 'Я не звала вас на свидание', time: '21:08' },
        { type: 'reaction', sender: 'alisa', textKey: 'Не ставьте меня, пожалуйста, в такое положение', time: '21:09' },
        { type: 'stats', changes: { success: 0, romance: -5, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true, prefersDistance: true } }
      ]
    } },
    { type: 'message', sender: 'alisa', textKey: 'Ладно, тогда до следующей пары', time: '21:11' },
    { type: 'achievement' },
    { type: 'goto', day: 'day3' }
  ]
};

// Kept for compatibility with old saves; new starts always use the common Day 2.
export const day2_flirt = day2;
export const day2_study = day2;

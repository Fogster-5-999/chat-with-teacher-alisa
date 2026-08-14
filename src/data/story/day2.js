/** Day 2 — competence and a first, deliberately small personal opening. */
export const day2 = {
  start: { afterDay: 'day1' },
  steps: [
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Здравствуйте' },
      { sender: 'alisa', textKey: 'Работу получила, есть ошибки(' }
    ] },
    { type: 'if', check: { hasFlag: 'pushedTooFast' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Давайте сегодня просто про учёбу, ладно?' }
    ] },
    { type: 'if', check: { hasFlag: 'respectsBoundary' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Кстати, спасибо, что вчера без споров' }
    ] },
    { type: 'if', check: { hasFlag: 'studyFocused' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'О, вы всё-таки не забросили тему' }
    ] },
    { type: 'if', check: { hasFlag: 'selfStudy' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Вы сами разобрались? Вот это уже хорошо' }
    ] },
    { type: 'if', check: { hasFlag: 'pushySchedule' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'После работы я обычно уже не отвечаю' },
      { type: 'message', sender: 'alisa', textKey: 'Не обижайтесь' }
    ] },
    { type: 'miniTest', id: 'day2_test', intro: 'Давай быстрый блиц. Всего три вопроса — и свободен', questions: [
      { id: 'q1', text: 'Вставь правильное слово: ___ I a student? (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 0 },
      { id: 'q2', text: 'Вставь правильное слово: She ___ at home. (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 1 },
      { id: 'q3', text: 'Вставь правильное слово: They ___ going to school. (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 2 }
    ], achievementId: 'day2_minitest_passed', successPoints: 3, successMessage: 'Неплохо, +3 к успеваемости', failMessage: 'Не страшно, тему ещё раз закрепим' },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Ладно, с учёбой пока всё' },
      { sender: 'alisa', textKey: 'Я новое фото для страницы кафедры сделала' },
      { sender: 'alisa', textKey: 'Сама не могу решить, нормальное оно или нет. Глянете?' }
    ] },
    { type: 'photo', url: 'res/chat1.png', blurred: true },
    { type: 'choice', id: 'day2_photo_response', options: [
      { id: 'd2_photo_kind', labelKey: 'd2_photo_kind' },
      { id: 'd2_photo_honest', labelKey: 'd2_photo_honest' },
      { id: 'd2_photo_joke', labelKey: 'd2_photo_joke' },
      { id: 'd2_photo_flirt', labelKey: 'd2_photo_flirt', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day2_photo_response', branches: {
      d2_photo_kind: [
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо' },
        { type: 'reaction', sender: 'alisa', textKey: 'Хоть не буду переделывать его в сотый раз)' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { warmthShared: true } }
      ],
      d2_photo_honest: [
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо. Теперь я рада)' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { honestWithAlisa: true } }
      ],
      d2_photo_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Всё, после такого вам фото больше не показываю)' },
        { type: 'reaction', sender: 'alisa', textKey: 'Ахаха, надеюсь вы поверили' },
        { type: 'stats', changes: { success: 0, romance: 0, humor: 3 } }
      ],
      d2_photo_flirt: [
        { type: 'reaction', sender: 'alisa', textKey: 'Стоп. Это звучит странно' },
        { type: 'reaction', sender: 'alisa', textKey: 'Не надо превращать каждое сообщение в намёк' },
        { type: 'stats', changes: { success: 0, romance: -4, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true } }
      ]
    } },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'А сейчас о английском' },
      { sender: 'alisa', textKey: 'Завтра днём буду в кофейне на Ленина, готовить материалы для пар' },
      { sender: 'alisa', textKey: 'Можете подойти, разберём ошибки вместе' },
      { sender: 'alisa', textKey: 'Я там обычно пару часиков сижу' },
      { sender: 'alisa', textKey: 'Но это просто консультация.' }
    ] },
    { type: 'choice', id: 'day2_cafe_response', options: [
      { id: 'd2_cafe_study', labelKey: 'd2_cafe_study' },
      { id: 'd2_cafe_home', labelKey: 'd2_cafe_home' },
      { id: 'd2_cafe_joke', labelKey: 'd2_cafe_joke' },
      { id: 'd2_cafe_date', labelKey: 'd2_cafe_date', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day2_cafe_response', branches: {
      d2_cafe_study: [
        { type: 'reaction', sender: 'alisa', textKey: 'Тогда можете заглянуть. Позанимаемся' },
        { type: 'stats', changes: { success: 3, romance: 1, humor: 0 } },
        { type: 'flags', set: { cafePlan: true, respectsBoundary: true } }
      ],
      d2_cafe_home: [
        { type: 'reaction', sender: 'alisa', textKey: 'Тоже вариант. Вечером скину задания' },
        { type: 'stats', changes: { success: 2, romance: 0, humor: 0 } },
        { type: 'flags', set: { prefersDistance: true } }
      ],
      d2_cafe_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Кофе тогда с вас' },
        { type: 'stats', changes: { success: 1, romance: 0, humor: 3 } }
      ],
      d2_cafe_date: [
        { type: 'reaction', sender: 'alisa', textKey: 'Я не звала вас на свидание' },
        { type: 'reaction', sender: 'alisa', textKey: 'Не ставьте меня, пожалуйста, в такое положение' },
        { type: 'stats', changes: { success: 0, romance: -5, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true, prefersDistance: true } }
      ]
    } },
    { type: 'message', sender: 'alisa', textKey: 'Ладно, тогда до следующей пары' },
    { type: 'achievement' },
    { type: 'goto', day: 'day3' }
  ]
};

// Kept for compatibility with old saves; new starts always use the common Day 2.
export const day2_flirt = day2;
export const day2_study = day2;

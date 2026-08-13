/** Day 2 — competence and a first, deliberately small personal opening. */
export const day2 = {
  start: { afterDay: 'day1' },
  steps: [
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Привет. Ну как там с темой?' },
      { sender: 'alisa', textKey: 'Не пропал там?' }
    ] },
    { type: 'if', check: { hasFlag: 'pushedTooFast' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Давай сегодня просто про учёбу, ладно?' }
    ] },
    { type: 'if', check: { hasFlag: 'respectsBoundary' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Кстати, спасибо, что вчера без споров.' }
    ] },
    { type: 'if', check: { hasFlag: 'studyFocused' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'О, ты всё-таки не забросил тему.' }
    ] },
    { type: 'if', check: { hasFlag: 'respectsTime' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'И спасибо, что ночью не писал. Я это заметила.' }
    ] },
    { type: 'if', check: { hasFlag: 'selfStudy' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'Ты сам разобрался? Вот это уже хорошо.' }
    ] },
    { type: 'if', check: { hasFlag: 'pushySchedule' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'После работы я обычно уже не отвечаю. Не обижайся.' }
    ] },
    { type: 'if', check: { hasFlag: 'honestWithAlisa' }, then: [
      { type: 'message', sender: 'alisa', textKey: 'И спасибо за честность. Так намного проще.' }
    ] },
    { type: 'miniTest', id: 'day2_test', intro: 'Давай быстрый блиц. Всего три вопроса — и свободен.', questions: [
      { id: 'q1', text: 'Вставь правильное слово: ___ I a student? (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 0 },
      { id: 'q2', text: 'Вставь правильное слово: She ___ at home. (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 1 },
      { id: 'q3', text: 'Вставь правильное слово: They ___ going to school. (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 2 }
    ], achievementId: 'day2_minitest_passed', successPoints: 3, successMessage: 'Неплохо, +3 к успеваемости', failMessage: 'Не страшно, тему ещё раз закрепим.' },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Ладно, на сегодня хватит.' },
      { sender: 'alisa', textKey: 'Я новое фото для страницы кафедры поставила.' },
      { sender: 'alisa', textKey: 'Сама не могу решить, нормальное оно или нет. Глянешь?' }
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
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо. Теперь хоть не буду переделывать его в десятый раз.' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { warmthShared: true } }
      ],
      d2_photo_honest: [
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо. Нормально ответил, и это уже хорошо.' },
        { type: 'stats', changes: { success: 0, romance: 2, humor: 0 } },
        { type: 'flags', set: { honestWithAlisa: true } }
      ],
      d2_photo_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Всё, после такого тебе фото больше не показываю.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Ладно, шучу. Смешно.' },
        { type: 'stats', changes: { success: 0, romance: 0, humor: 3 } }
      ],
      d2_photo_flirt: [
        { type: 'reaction', sender: 'alisa', textKey: 'Стоп. Комплимент услышала, но мне сейчас некомфортно.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Не надо превращать каждое сообщение в намёк.' },
        { type: 'stats', changes: { success: 0, romance: -4, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true } }
      ]
    } },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'В субботу я обычно в кофейне на Ленина.' },
      { sender: 'alisa', textKey: 'Сижу с работами, готовлюсь к следующей неделе.' },
      { sender: 'alisa', textKey: 'Если дома неудобно, можем там спокойно разобрать тему.' }
    ] },
    { type: 'choice', id: 'day2_cafe_response', options: [
      { id: 'd2_cafe_study', labelKey: 'd2_cafe_study' },
      { id: 'd2_cafe_home', labelKey: 'd2_cafe_home' },
      { id: 'd2_cafe_joke', labelKey: 'd2_cafe_joke' },
      { id: 'd2_cafe_date', labelKey: 'd2_cafe_date', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day2_cafe_response', branches: {
      d2_cafe_study: [
        { type: 'reaction', sender: 'alisa', textKey: 'Тогда можешь зайти на час. Именно позаниматься.' },
        { type: 'stats', changes: { success: 3, romance: 1, humor: 0 } },
        { type: 'flags', set: { cafePlan: true, respectsBoundary: true } }
      ],
      d2_cafe_home: [
        { type: 'reaction', sender: 'alisa', textKey: 'Тоже вариант. Вечером скину задания.' },
        { type: 'stats', changes: { success: 2, romance: 0, humor: 0 } },
        { type: 'flags', set: { prefersDistance: true } }
      ],
      d2_cafe_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Кофе с тебя. А остальное — по учёбе.' },
        { type: 'stats', changes: { success: 1, romance: 0, humor: 3 } }
      ],
      d2_cafe_date: [
        { type: 'reaction', sender: 'alisa', textKey: 'Я не звала тебя на свидание.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Не ставь меня, пожалуйста, в такое положение.' },
        { type: 'stats', changes: { success: 0, romance: -5, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true, prefersDistance: true } }
      ]
    } },
    { type: 'message', sender: 'alisa', textKey: 'Ладно. Тогда до субботы или до следующей пары.' },
    { type: 'achievement' },
    { type: 'goto', day: 'day3' }
  ]
};

// Kept for compatibility with old saves; new starts always use the common Day 2.
export const day2_flirt = day2;
export const day2_study = day2;

/**
 * Day 2 — default, flirt, and study branches.
 * Rewritten: shorter, more natural messenger flow.
 */

export const day2 = {
  start: { afterDay: 'day1' },
  steps: [
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Привет) тест так и висит' },
        { sender: 'alisa', textKey: 'Ты как, живой?' }
      ]
    },
    {
      type: 'if',
      check: { hasFlag: 'pushySchedule' },
      then: [
        { type: 'message', sender: 'alisa', textKey: 'Жду, когда снова начнёшь всех торопить 😄' }
      ]
    },
    {
      type: 'if',
      check: { hasFlag: 'respectsTime' },
      then: [
        { type: 'message', sender: 'alisa', textKey: 'Спасибо, что вчера не наседал со временем' },
        { type: 'message', sender: 'alisa', textKey: 'Редкость' }
      ]
    },
    {
      type: 'miniTest',
      id: 'day2_test',
      intro: 'Раз домашки нет — го блиц прямо тут? 3 вопроса',
      questions: [
        { id: 'q1', text: 'Вставь правильное слово: ___ I a student? (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 0 },
        { id: 'q2', text: 'Вставь правильное слово: She ___ at home. (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 1 },
        { id: 'q3', text: 'Вставь правильное слово: They ___ going to school. (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 2 }
      ],
      achievementId: 'day2_minitest_passed',
      successPoints: 3,
      successMessage: 'База на месте. +3',
      failMessage: 'Ну такое... едем дальше',
      onPerfect: [
        { type: 'message', sender: 'alisa', textKey: 'Кстати, обновляла сегодня фото в профиле' },
        { type: 'message', sender: 'alisa', textKey: 'На сайте школы' }
      ],
      onFail: [
        { type: 'message', sender: 'alisa', textKey: 'Кстати, обновляла сегодня фото в профиле' },
        { type: 'message', sender: 'alisa', textKey: 'На сайте школы' }
      ]
    },
    { type: 'message', sender: 'alisa', textKey: 'Глянь' },
    { type: 'message', sender: 'alisa', textKey: 'Не путай меня с грозной училкой из кошмаров 😄' },
    { type: 'photo', url: 'res/chat1.png', blurred: true },
    {
      type: 'choice',
      id: 'day2_choice',
      options: [
        { id: 'opt2_1', labelKey: 'Клёвое фото, тут совсем другая' },
        { id: 'opt2_2', labelKey: 'С такой улыбкой хочется учить чаще 😏' },
        { id: 'opt2_3', labelKey: 'А где строгий взгляд? удивлён' },
        { id: 'opt2_4', labelKey: 'Почему-то хочется пересматривать', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day2_choice',
      branches: {
        opt2_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Спасибо)' },
          { type: 'reaction', sender: 'alisa', textKey: 'Обычно говорят, что я слишком серьёзная' },
          { type: 'reaction', sender: 'alisa', textKey: 'За комплимент прощаю вчерашнюю домашку' },
          { type: 'reaction', sender: 'alisa', textKey: 'На сегодня' },
          { type: 'stats', changes: { success: 5, romance: 3, humor: 0 } }
        ],
        opt2_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Осторожно' },
          { type: 'reaction', sender: 'alisa', textKey: 'А то решу, что тебе правда нужны уроки 😏' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но приятно' },
          { type: 'stats', changes: { success: 2, romance: 8, humor: 0 } }
        ],
        opt2_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Строгий взгляд только для должников' },
          { type: 'reaction', sender: 'alisa', textKey: 'Пока ты не в их числе' },
          { type: 'stats', changes: { success: 0, romance: 0, humor: 8 } }
        ],
        opt2_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Пересматривать?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Польщена' },
          { type: 'reaction', sender: 'alisa', textKey: 'Только без отрыва от урока' },
          { type: 'stats', changes: { success: 2, romance: 8, humor: 0 } },
          { type: 'flags', set: { likesPhoto: true } }
        ]
      }
    },
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Кстати, в субботу я обычно сижу' },
        { sender: 'alisa', textKey: 'В кофейне на Ленина' },
        { sender: 'alisa', textKey: 'Разбираю свои дела' },
        { sender: 'alisa', textKey: 'Если что — знаешь где искать 🙂' }
      ]
    },
    {
      type: 'choice',
      id: 'day2_choice2',
      options: [
        { id: 'opt2c_1', labelKey: 'Может, зайду поздороваться в субботу?' },
        { id: 'opt2c_2', labelKey: 'Лучше домашку доделаю' },
        { id: 'opt2c_3', labelKey: 'Кофейня с вайфаем? тогда точно приду' },
        { id: 'opt2c_4', labelKey: 'Только предупредите, чтобы не застал за работой', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day2_choice2',
      branches: {
        opt2c_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Заходи, если реально хочешь' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я там обычно с ноутом и книгой' },
          { type: 'stats', changes: { success: 0, romance: 6, humor: 0 } },
          { type: 'flags', set: { interestedCafe: true } }
        ],
        opt2c_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Дисциплина. уважаю' },
          { type: 'reaction', sender: 'alisa', textKey: 'Хотя увидеть тебя не только в чате было бы неплохо' },
          { type: 'stats', changes: { success: 5, romance: 1, humor: 0 } },
          { type: 'flags', set: { focusedStudy: true } }
        ],
        opt2c_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Вайфай там так себе' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но кофе хороший. приходи' },
          { type: 'stats', changes: { success: 0, romance: 2, humor: 6 } },
          { type: 'flags', set: { joked2: true } }
        ],
        opt2c_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Хорошо, предупрежу' },
          { type: 'reaction', sender: 'alisa', textKey: 'Место всегда найдётся' },
          { type: 'stats', changes: { success: 0, romance: 5, humor: 3 } },
          { type: 'flags', set: { interestedCafe: true } }
        ]
      }
    },
    { type: 'message', sender: 'alisa', textKey: 'Ладно, до связи' },
    { type: 'message', sender: 'alisa', textKey: 'И не проболтайся никому' },
    { type: 'message', sender: 'alisa', textKey: 'Что я пишу ученикам по вечерам 😅' },
    { type: 'achievement' },
    { type: 'goto', day: 'day3' }
  ]
};

export const day2_flirt = {
  start: { afterDay: 'day1' },
  steps: [
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Привет) ты сегодня не даёшь покоя' },
        { sender: 'alisa', textKey: 'Ловлю себя на улыбке в телефон' },
        { sender: 'alisa', textKey: 'План урока отложила' },
        { sender: 'alisa', textKey: 'Есть час. просто поболтаем?' }
      ]
    },
    { type: 'message', sender: 'alisa', textKey: 'Вот, кстати' },
    { type: 'message', sender: 'alisa', textKey: 'Сегодня в своём виде, не в режиме «препод»' },
    { type: 'photo', url: 'res/chat1_flirt.png', blurred: true },
    {
      type: 'choice',
      id: 'day2f_choice',
      options: [
        { id: 'opt2f_1', labelKey: 'Я тоже думал о тебе' },
        { id: 'opt2f_2', labelKey: 'Думал, я один такой странный' },
        { id: 'opt2f_3', labelKey: 'Фото класс. но у меня вопрос' },
        { id: 'opt2f_4', labelKey: 'Я тоже ловлю себя на улыбке', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day2f_choice',
      branches: {
        opt2f_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Вот это поворот)' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я тоже устала от formalities' },
          { type: 'reaction', sender: 'alisa', textKey: 'Давай просто на «ты»' },
          { type: 'stats', changes: { success: 0, romance: 8, humor: 0 } }
        ],
        opt2f_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ты первый, кто говорит прямо' },
          { type: 'reaction', sender: 'alisa', textKey: 'Мне нравится' },
          { type: 'stats', changes: { success: 0, romance: 10, humor: 0 } }
        ],
        opt2f_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Валяй' },
          { type: 'reaction', sender: 'alisa', textKey: 'В разумных пределах 😄' },
          { type: 'stats', changes: { success: 0, romance: 3, humor: 6 } }
        ],
        opt2f_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ого' },
          { type: 'reaction', sender: 'alisa', textKey: 'Теперь я точно не усну' },
          { type: 'stats', changes: { success: 0, romance: 12, humor: 0 } },
          { type: 'flags', set: { mutualSmile: true } }
        ]
      }
    },
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Если честно, в субботу я обычно свободна' },
        { sender: 'alisa', textKey: 'Сижу в кофейне на Ленина' },
        { sender: 'alisa', textKey: 'Это не приглашение) ну... почти' }
      ]
    },
    {
      type: 'choice',
      id: 'day2f_choice2',
      options: [
        { id: 'opt2f_c1', labelKey: 'Почти приглашение я почти приму' },
        { id: 'opt2f_c2', labelKey: 'Не хочу давить. пока просто переписка' },
        { id: 'opt2f_c3', labelKey: 'Записываю в календарь. с пометкой «важно»' },
        { id: 'opt2f_c4', labelKey: 'Может, пришлёшь музыку, что слушаешь там?', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day2f_choice2',
      branches: {
        opt2f_c1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Договорились' },
          { type: 'reaction', sender: 'alisa', textKey: 'Только не превращай в допрос' },
          { type: 'stats', changes: { success: 0, romance: 7, humor: 0 } },
          { type: 'flags', set: { interestedCafe: true } }
        ],
        opt2f_c2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ценю, что не торопишь' },
          { type: 'reaction', sender: 'alisa', textKey: 'Редкое качество' },
          { type: 'stats', changes: { success: 2, romance: 3, humor: 0 } },
          { type: 'flags', set: { respectsPace: true } }
        ],
        opt2f_c3: [
          { type: 'reaction', sender: 'alisa', textKey: '«Важно» — сильно' },
          { type: 'reaction', sender: 'alisa', textKey: 'Ладно, интригуй' },
          { type: 'stats', changes: { success: 0, romance: 4, humor: 6 } },
          { type: 'flags', set: { joked2: true } }
        ],
        opt2f_c4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Музыку?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Скину плейлист, если пообещаешь не смеяться' },
          { type: 'stats', changes: { success: 0, romance: 6, humor: 4 } },
          { type: 'flags', set: { sharedMusic: true } }
        ]
      }
    },
    { type: 'message', sender: 'alisa', textKey: 'Ладно, мне пора' },
    { type: 'message', sender: 'alisa', textKey: 'И... давай это между нами' },
    { type: 'message', sender: 'alisa', textKey: 'На работе на такое смотрят косо' },
    { type: 'achievement' },
    { type: 'goto', day: 'day3' }
  ]
};

export const day2_study = {
  start: { afterDay: 'day1' },
  steps: [
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Привет) рада, что серьёзно настроен' },
        { sender: 'alisa', textKey: 'Есть окно прямо сейчас. разберём тему?' }
      ]
    },
    { type: 'message', sender: 'alisa', textKey: 'Вот фото для профиля на сайте' },
    { type: 'message', sender: 'alisa', textKey: 'Если интересно, как я выгляжу не только в чате' },
    { type: 'photo', url: 'res/chat1_study.png', blurred: true },
    {
      type: 'choice',
      id: 'day2s_choice',
      options: [
        { id: 'opt2s_1', labelKey: 'Давай! объясни Present Perfect' },
        { id: 'opt2s_2', labelKey: 'Спасибо, что не бросаешь. боюсь не осилить' },
        { id: 'opt2s_3', labelKey: 'А есть шпаргалка? без шуток' },
        { id: 'opt2s_4', labelKey: 'Расскажи, как ты сама учила английский', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day2s_choice',
      branches: {
        opt2s_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Отлично' },
          { type: 'reaction', sender: 'alisa', textKey: 'Present Perfect — действие в прошлом' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но результат важен сейчас' },
          { type: 'reaction', sender: 'alisa', textKey: 'I have seen this film. видел и помню' },
          { type: 'reaction', sender: 'alisa', textKey: 'Понятно?' },
          { type: 'stats', changes: { success: 10, romance: 0, humor: 0 } }
        ],
        opt2s_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Не бойся' },
          { type: 'reaction', sender: 'alisa', textKey: 'Получится, если стараться' },
          { type: 'reaction', sender: 'alisa', textKey: 'Я рядом' },
          { type: 'stats', changes: { success: 5, romance: 5, humor: 0 } }
        ],
        opt2s_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Шпаргалка?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Давай лучше реально разберёмся' },
          { type: 'stats', changes: { success: -3, romance: 0, humor: 5 } }
        ],
        opt2s_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Интересный вопрос' },
          { type: 'reaction', sender: 'alisa', textKey: 'Учила через сериалы и упрямство' },
          { type: 'stats', changes: { success: 4, romance: 4, humor: 2 } },
          { type: 'flags', set: { askStory: true } }
        ]
      }
    },
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Кстати, по субботам я в кофейне на Ленина' },
        { sender: 'alisa', textKey: 'Занимаюсь своими текстами' },
        { sender: 'alisa', textKey: 'Если захочешь позаниматься там' },
        { sender: 'alisa', textKey: 'Место свободно' }
      ]
    },
    {
      type: 'choice',
      id: 'day2s_choice2',
      options: [
        { id: 'opt2s_c1', labelKey: 'Звучит продуктивно. давай' },
        { id: 'opt2s_c2', labelKey: 'Мне дома спокойнее, но спасибо' },
        { id: 'opt2s_c3', labelKey: 'А кофе за счёт школы? шучу, приду' },
        { id: 'opt2s_c4', labelKey: 'С тобой даже домашка интереснее', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day2s_choice2',
      branches: {
        opt2s_c1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Супер' },
          { type: 'reaction', sender: 'alisa', textKey: 'Учти, я там реально работаю' },
          { type: 'stats', changes: { success: 6, romance: 3, humor: 0 } },
          { type: 'flags', set: { focusedStudy: true } }
        ],
        opt2s_c2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Без проблем' },
          { type: 'reaction', sender: 'alisa', textKey: 'Пришлю задание вечером' },
          { type: 'stats', changes: { success: 3, romance: 0, humor: 0 } },
          { type: 'flags', set: { respectsPace: true } }
        ],
        opt2s_c3: [
          { type: 'reaction', sender: 'alisa', textKey: 'За счёт школы только тесты' },
          { type: 'reaction', sender: 'alisa', textKey: 'Кофе — за твой 😄' },
          { type: 'stats', changes: { success: 2, romance: 3, humor: 5 } },
          { type: 'flags', set: { interestedCafe: true } }
        ],
        opt2s_c4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Комплимент' },
          { type: 'reaction', sender: 'alisa', textKey: 'Придётся стараться' },
          { type: 'stats', changes: { success: 4, romance: 6, humor: 0 } },
          { type: 'flags', set: { enjoyTime: true } }
        ]
      }
    },
    { type: 'message', sender: 'alisa', textKey: 'Ладно, до завтра' },
    { type: 'message', sender: 'alisa', textKey: 'И это... не рассказывай никому' },
    { type: 'message', sender: 'alisa', textKey: 'Что я зову учеников в свою кофейню 😅' },
    { type: 'achievement' },
    { type: 'goto', day: 'day3' }
  ]
};

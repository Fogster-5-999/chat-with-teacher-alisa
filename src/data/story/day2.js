/**
 * Day 2 — default, flirt, and study branches.
 */

export const day2 = {
  start: { afterDay: 'day1' },
  steps: [
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'привет) я так и не дождалась сданного теста, а домашка у тебя всё ещё пустая. ну и как, у тебя вообще есть что сказать?' }
      ]
    },
    // Conditional messages based on previous day's flags
    {
      type: 'if',
      check: { hasFlag: 'flirtWithTeacher' },
      then: [{ type: 'message', sender: 'alisa', textKey: 'кстати, ты вчера так мило написал, я думала об этом весь день 😊' }]
    },
    {
      type: 'if',
      check: { hasFlag: 'flirtWithTeacher', eq: false },
      then: [{ type: 'message', sender: 'alisa', textKey: 'интересно, почему ты такой серьёзный?' }]
    },
    // Mini test
    {
      type: 'miniTest',
      id: 'day2_test',
      intro: 'раз уж ты не сделал домашку, давай прямо сейчас проверим твой английский в чате. ответь на 3 вопроса и я сразу пойму, насколько ты готов',
      questions: [
        { id: 'q1', text: 'Вставь правильное слово: ___ I a student? (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 0 },
        { id: 'q2', text: 'Вставь правильное слово: She ___ at home. (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 1 },
        { id: 'q3', text: 'Вставь правильное слово: They ___ going to school. (Am / Is / Are)', choices: ['Am', 'Is', 'Are'], correct: 2 }
      ],
      achievementId: 'day2_minitest_passed',
      successPoints: 3,
      successMessage: 'Отлично! За 3 правильных ответа — уникальное достижение и +3 к Успеваемости.',
      failMessage: 'Хмм… есть ошибки. Алиса расстроилась, но сюжет продолжается.',
      onPerfect: [
        { type: 'message', sender: 'alisa', textKey: 'ладно, не буду пилить, у меня сегодня настроение норм. кстати, меня сегодня фоткали для стенда «учитель года». получилось так себе, но скину тебе, поржать' }
      ],
      onFail: [
        { type: 'message', sender: 'alisa', textKey: 'ладно, не буду пилить, у меня сегодня настроение норм. кстати, меня сегодня фоткали для стенда «учитель года». получилось так себе, но скину тебе, поржать' }
      ]
    },
    // Photo
    { type: 'photo', url: 'res/chat1.png', blurred: true },
    // Choice
    {
      type: 'choice',
      id: 'day2_choice',
      options: [
        { id: 'opt2_1', labelKey: 'ух ты, вы тут совсем не как училка. классное фото, честно.' },
        { id: 'opt2_2', labelKey: 'ого, а вы так улыбаетесь? теперь хочется на урок прийти пораньше 😏' },
        { id: 'opt2_3', labelKey: 'погодите, это вы? а где взгляд убийцы и указка? краш - 100% 😂', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day2_choice',
      branches: {
        opt2_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'спасибо) правда приятно. обычно ученики говорят, что я слишком серьёзная. а тут даже про свитер заметил. ладно, за такую похвалу я готова забыть, что ты мне ничего не скинул. но в следующий раз - задание обязательно, договорились?' },
          { type: 'stats', changes: { success: 5, romance: 3, humor: 0 } }
        ],
        opt2_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'осторожнее, а то я подумаю, что тебе действительно нужны мои уроки) (через минуту) но если серьёзно - приятно. приходи завтра после шестого, я как раз буду проверять тетради, помогу с темой. только без этих своих «😏», ладно?' },
          { type: 'stats', changes: { success: 2, romance: 8, humor: 0 } }
        ],
        opt2_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'боже, «краш»… я бы сказала «кринж», но у меня нет сил спорить. зато ты рассмешил. так и быть, если пришлёшь мне это задание до завтра - я даже не буду проверять ошибки, просто поставлю 4. договорились? а пока иди, не смущай меня своими мемами.' },
          { type: 'stats', changes: { success: 0, romance: 0, humor: 10 } }
        ]
      }
    },
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
        { sender: 'alisa', textKey: 'привет) ты всё ещё думаешь обо мне? я заметила 😏' },
        { sender: 'alisa', textKey: 'ладно, давай без этих школьных формальностей. у меня сегодня есть пара часов, можем просто поболтать. ты как?' },
        { sender: 'alisa', textKey: 'кстати, меня сегодня фоткали для стенда «учитель года». если хочешь, скину фото, но оно размытое — придётся посмотреть рекламу, чтобы разглядеть 😅' }
      ]
    },
    { type: 'photo', url: 'res/chat1_flirt.png', blurred: true },
    {
      type: 'choice',
      id: 'day2f_choice',
      options: [
        { id: 'opt2f_1', labelKey: 'я тоже думал о тебе) давай просто поговорим, без этой всей школьной тягомотины' },
        { id: 'opt2f_2', labelKey: 'ты серьёзно? я думал, я один такой странный, что запал на училку' },
        { id: 'opt2f_3', labelKey: 'фото? конечно, давай! но я без рекламы, у меня нет денег 😂' }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day2f_choice',
      branches: {
        opt2f_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'вот это поворот) я тоже устала от «Сергеевны». давай просто Алиса.' },
          { type: 'stats', changes: { success: 0, romance: 8, humor: 0 } }
        ],
        opt2f_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'хаха, ты первый ученик, который так прямо говорит. мне это нравится 😊' },
          { type: 'stats', changes: { success: 0, romance: 10, humor: 0 } }
        ],
        opt2f_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'ахах, бедный студент) ладно, я скину тебе фото, но смотреть будешь через рекламу — это единственный способ разблокировать чёткость' },
          { type: 'stats', changes: { success: 0, romance: 0, humor: 5 } }
        ]
      }
    },
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
        { sender: 'alisa', textKey: 'привет) я рада, что ты серьёзно настроен. давай прямо сейчас разберём тему, пока у меня есть окно.' },
        { sender: 'alisa', textKey: 'кстати, меня сегодня фоткали для стенда «учитель года». если хочешь — скину, но оно размытое. не парься, если не хочешь смотреть.' }
      ]
    },
    { type: 'photo', url: 'res/chat1_study.png', blurred: true },
    {
      type: 'choice',
      id: 'day2s_choice',
      options: [
        { id: 'opt2s_1', labelKey: 'давай, я готов учиться! объясни мне Present Perfect, я реально хочу понять' },
        { id: 'opt2s_2', labelKey: 'спасибо, что не бросаешь. я боюсь, что не сдам экзамены' },
        { id: 'opt2s_3', labelKey: 'а можно мне скинуть шпаргалку? ну, я серьёзно, без шуток 😅' }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day2s_choice',
      branches: {
        opt2s_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'отлично! тогда слушай: Present Perfect — это действие, которое произошло в прошлом, но результат важен сейчас.' },
          { type: 'reaction', sender: 'alisa', textKey: 'пример: I have seen this film. Я видел этот фильм (и помню его). запомнил?' },
          { type: 'stats', changes: { success: 10, romance: 0, humor: 0 } }
        ],
        opt2s_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'не бойся, я помогу. у тебя всё получится, если будешь стараться. а я буду рядом.' },
          { type: 'stats', changes: { success: 5, romance: 5, humor: 0 } }
        ],
        opt2s_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'шпаргалка? я тебя умоляю) давай лучше разберёмся, а то ты потом ничего не вспомнишь на экзамене' },
          { type: 'stats', changes: { success: -3, romance: 0, humor: 5 } }
        ]
      }
    },
    { type: 'achievement' },
    { type: 'goto', day: 'day3' }
  ]
};

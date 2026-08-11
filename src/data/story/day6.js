/**
 * Day 6 — park invitation and a more open, personal conversation.
 */

export default {
  start: { afterDay: 'day5_3' },
  steps: [
    {
      type: 'if',
      check: { hasFlag: 'chosePathRisk' },
      then: [
        { type: 'message', sender: 'alisa', textKey: 'Привет. я весь день сегодня улыбаюсь без причины.' },
        { type: 'message', sender: 'alisa', textKey: 'Это ты виноват' }
      ]
    },
    {
      type: 'if',
      check: { hasFlag: 'chosePathClean' },
      then: [
        { type: 'message', sender: 'alisa', textKey: 'Привет! заявку на перевод я подала, кстати.' },
        { type: 'message', sender: 'alisa', textKey: 'Чувствую себя свободнее' }
      ]
    },
    {
      type: 'if',
      check: { hasFlag: 'chosePathFriends' },
      then: [
        { type: 'message', sender: 'alisa', textKey: 'Привет) как настоящий друг' },
        { type: 'message', sender: 'alisa', textKey: 'Я весь день о тебе думала.' },
        { type: 'message', sender: 'alisa', textKey: 'Это нормально?' }
      ]
    },
    {
      type: 'if',
      check: { hasFlag: 'pulledBack' },
      then: [
        { type: 'message', sender: 'alisa', textKey: 'Привет. знаю, мы решили быть осторожнее.' },
        { type: 'message', sender: 'alisa', textKey: 'Но я не выдержала и написала' }
      ]
    },
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Может, встретимся завтра?' },
        { sender: 'alisa', textKey: 'Не в кафе, а просто в парке, погуляем' },
        { sender: 'alisa', textKey: 'Хочу поговорить с тобой без телефонов' },
        { sender: 'alisa', textKey: 'Без людей и всей этой суеты' },
        { sender: 'alisa', textKey: 'Я обычно сижу на скамейке у пруда' },
        { sender: 'alisa', textKey: 'Пишу что-то своё. приходи, если хочешь' }
      ]
    },
    { type: 'photo', url: 'res/chat2.png', blurred: true },
    {
      type: 'choice',
      id: 'day6_choice',
      options: [
        { id: 'opt6_1', labelKey: 'Приду. давай просто поговорим' },
        { id: 'opt6_2', labelKey: 'Честно? немного нервничаю. но приду', hidden: true },
        { id: 'opt6_3', labelKey: 'Скамейка у пруда - звучит как начало книги' },
        { id: 'opt6_4', labelKey: 'Мне нужно сказать тебе кое-что важное...', hidden: true, cost: 2 }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day6_choice',
      branches: {
        opt6_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Отлично. завтра в 17:00, у входа в парк' },
          { type: 'stats', changes: { success: 5, romance: 8, humor: 0 } }
        ],
        opt6_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Я тоже нервничаю, если честно.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но иногда стоит рискнуть' },
          { type: 'reaction', sender: 'alisa', textKey: 'Завтра в 17:00. буду ждать' },
          { type: 'stats', changes: { success: 0, romance: 12, humor: 0 } },
          { type: 'flags', set: { earlyVulnerability: true } }
        ],
        opt6_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ахах, я похожа на героиню книги? спасибо, наверное' },
          { type: 'reaction', sender: 'alisa', textKey: 'Жду завтра в 17:00' },
          { type: 'stats', changes: { success: 3, romance: 5, humor: 10 } }
        ],
        opt6_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Кое-что важное? теперь я весь вечер буду гадать' },
          { type: 'reaction', sender: 'alisa', textKey: 'Скажешь завтра лично. в 17:00, я на месте' },
          { type: 'stats', changes: { success: 0, romance: 10, humor: 0 }, note: 'Ты дал понять, что готовишь важный разговор. Открыт особый путь к финалу.' },
          { type: 'flags', set: { earlyConfession: true } }
        ]
      }
    },
    {
      type: 'message',
      sender: 'alisa',
      textKey: 'Если что, я весь этот год работаю над тем'
    },
    {
      type: 'message',
      sender: 'alisa',
      textKey: 'Чтобы никого не подпускать слишком близко'
    },
    {
      type: 'message',
      sender: 'alisa',
      textKey: 'А с тобой это как-то само получилось.'
    },
    {
      type: 'message',
      sender: 'alisa',
      textKey: 'Не знаю, что с этим делать'
    },
    {
      type: 'choice',
      id: 'day6_choice2',
      options: [
        { id: 'opt6b_1', labelKey: 'Может, и не надо ничего с этим делать' },
        { id: 'opt6b_2', labelKey: 'Я рад, что ты впустила меня. серьёзно' },
        { id: 'opt6b_3', labelKey: 'Звучит как диагноз. но я приму тебя такой 😄' }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day6_choice2',
      branches: {
        opt6b_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Может, и правда. посмотрим, что будет завтра' },
          { type: 'stats', changes: { success: 0, romance: 8, humor: 0 } }
        ],
        opt6b_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Спасибо. знаешь, я редко это говорю' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но - мне с тобой спокойно' },
          { type: 'stats', changes: { success: 0, romance: 12, humor: 0 } },
          { type: 'flags', set: { deepTrust: true } }
        ],
        opt6b_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Диагноз "влюбилась в своего ученика". ужасно, знаю' },
          { type: 'stats', changes: { success: 0, romance: 10, humor: 10 } }
        ]
      }
    },
    { type: 'achievement' },
    { type: 'goto', day: 'day7' }
  ]
};

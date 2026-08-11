/**
 * Day 1 — Monday evening. Alisa pings about a missed test and empty homework.
 * Rewritten: shorter messages, less literary, more messenger rhythm.
 */

export default {
  start: { hour: 20, minute: 0 },
  steps: [
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Привет) не спишь?' },
        { sender: 'alisa', textKey: 'Открыла твой тест' },
        { sender: 'alisa', textKey: 'Результат так себе' },
        { sender: 'alisa', textKey: 'И домашка пустая. что случилось?' }
      ]
    },
    {
      type: 'choice',
      id: 'day1_choice',
      options: [
        { id: 'opt1_1', labelKey: 'Простите, закрутился. можно пересдать?' },
        { id: 'opt1_2', labelKey: 'Если честно, просто всё забыл) объясните ещё раз?' },
        { id: 'opt1_3', labelKey: 'Да, был косяк. признаю. больше так не буду' },
        { id: 'opt1_4', labelKey: 'Стыдно, что подвёл. хочу исправиться', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day1_choice',
      branches: {
        opt1_1: [
          { type: 'messages', list: [
            { sender: 'alisa', textKey: 'Ладно, бывает' },
            { sender: 'alisa', textKey: 'Скину правило и пример' },
            { sender: 'alisa', textKey: 'Сделаешь 5 предложений' },
            { sender: 'alisa', textKey: 'Успеешь к завтрашнему вечеру?' }
          ] },
          { type: 'stats', changes: { success: 8, romance: 0, humor: 0 } },
          { type: 'flags', set: { studiedHard: true, allHonest: true } }
        ],
        opt1_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Память как решето' },
          { type: 'reaction', sender: 'alisa', textKey: 'А обаяние работает?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Ладно, объясню ещё раз' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но это последний бесплатный повтор 😏' },
          { type: 'stats', changes: { success: 2, romance: 4, humor: 0 } },
          { type: 'flags', set: { flirtWithTeacher: true } }
        ],
        opt1_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Хоть честно' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но таблицу прогресса это не исправит' },
          { type: 'reaction', sender: 'alisa', textKey: 'Прощаю. задание завтра жду' },
          { type: 'stats', changes: { success: -2, romance: 0, humor: 6 } },
          { type: 'flags', set: { joked: true } }
        ],
        opt1_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Лучший ответ за сегодня' },
          { type: 'reaction', sender: 'alisa', textKey: 'Пришлю задание вечером. жду результат' },
          { type: 'stats', changes: { success: 6, romance: 3, humor: 0 } },
          { type: 'flags', set: { honestEffort: true } }
        ]
      }
    },
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Кстати, завтра днём есть окно' },
        { sender: 'alisa', textKey: 'Можем созвониться' },
        { sender: 'alisa', textKey: 'Или как тебе удобнее?' }
      ]
    },
    {
      type: 'choice',
      id: 'day1_choice2',
      options: [
        { id: 'opt1b_1', labelKey: 'Давай как тебе удобно' },
        { id: 'opt1b_2', labelKey: 'А сейчас можешь? хочу быстрее закрыть' },
        { id: 'opt1b_3', labelKey: 'Распишу время сам в приложении' },
        { id: 'opt1b_4', labelKey: 'А можно по видео? хочу не только голос', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day1_choice2',
      branches: {
        opt1b_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Приятно слышать' },
          { type: 'reaction', sender: 'alisa', textKey: 'Обычно все тянут до последнего' },
          { type: 'stats', changes: { success: 3, romance: 0, humor: 0 } },
          { type: 'flags', set: { respectsTime: true } }
        ],
        opt1b_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Шустрый)' },
          { type: 'reaction', sender: 'alisa', textKey: 'Не сейчас. у меня тоже есть жизнь' },
          { type: 'reaction', sender: 'alisa', textKey: 'После работы' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но напор нравится' },
          { type: 'stats', changes: { success: -1, romance: 3, humor: 2 } },
          { type: 'flags', set: { pushySchedule: true } }
        ],
        opt1b_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Самостоятельный' },
          { type: 'reaction', sender: 'alisa', textKey: 'Уважаю' },
          { type: 'stats', changes: { success: 3, romance: 0, humor: 0 } },
          { type: 'flags', set: { selfStudy: true } }
        ],
        opt1b_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'По видео?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Ну смотри... я не против' },
          { type: 'reaction', sender: 'alisa', textKey: 'Только не вздумай смотреть на меня вместо урока' },
          { type: 'stats', changes: { success: 2, romance: 6, humor: 0 } },
          { type: 'flags', set: { wantsVideo: true } }
        ]
      }
    },
    {
      type: 'message',
      sender: 'alisa',
      textKey: 'Ладно, я спать. длинный день'
    },
    {
      type: 'message',
      sender: 'alisa',
      textKey: 'Кстати... у нас в школе не особо любят'
    },
    {
      type: 'message',
      sender: 'alisa',
      textKey: 'Когда препод с учеником слишком сближается)'
    },
    {
      type: 'message',
      sender: 'alisa',
      textKey: 'Но это я так, к слову 👀'
    },
    { type: 'flags', set: { day1Completed: true } },
    { type: 'achievement' },
    { type: 'if', check: { hasFlag: 'flirtWithTeacher' }, then: [{ type: 'goto', day: 'day2_flirt' }] },
    { type: 'if', check: { hasFlag: 'studiedHard' }, then: [{ type: 'goto', day: 'day2_study' }] },
    { type: 'goto', day: 'day2' }
  ]
};

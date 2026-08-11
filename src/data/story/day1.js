/**
 * Day 1 — Monday evening. Alisa (English tutor) pings about a missed test and empty homework.
 */

export default {
  start: { hour: 20, minute: 0 },
  steps: [
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Привет) не спишь?' },
        { sender: 'alisa', textKey: 'Я тут открыла твой тест...' },
        { sender: 'alisa', textKey: 'Результат так себе, если мягко' },
        { sender: 'alisa', textKey: 'И домашка пустая. что случилось?' }
      ]
    },
    {
      type: 'choice',
      id: 'day1_choice',
      options: [
        { id: 'opt1_1', labelKey: 'Простите, реально закрутился. можно пересдать?' },
        { id: 'opt1_2', labelKey: 'Если честно, просто забыл всё на свете) объясните ещё раз?' },
        { id: 'opt1_3', labelKey: 'Да, был косяк. Признаю, расслабился. Больше так не буду.' },
        { id: 'opt1_4', labelKey: 'Честно, мне стыдно, что подвёл вас. Хочу исправиться', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day1_choice',
      branches: {
        opt1_1: [
          { type: 'messages', list: [
            { sender: 'alisa', textKey: 'Ладно, бывает, не начало конца света' },
            { sender: 'alisa', textKey: 'Скину тебе правило и пример' },
            { sender: 'alisa', textKey: 'Сделаешь 5 предложений' },
            { sender: 'alisa', textKey: 'Успеешь к завтрашнему вечеру?' }
          ] },
          { type: 'stats', changes: { success: 8, romance: 0, humor: 0 } },
          { type: 'flags', set: { studiedHard: true, allHonest: true } }
        ],
        opt1_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'То есть память как решето' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но обаяние работает без сбоев?' },
          { type: 'reaction', sender: 'alisa', textKey: 'Ладно, объясню ещё раз.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но это последний бесплатный повтор 😏' },
          { type: 'stats', changes: { success: 2, romance: 4, humor: 0 } },
          { type: 'flags', set: { flirtWithTeacher: true } }
        ],
        opt1_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ну хоть честно сказал.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но таблицу прогресса это всё равно не исправит.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Ладно, прощаю. Задание завтра жду.' },
          { type: 'stats', changes: { success: -2, romance: 0, humor: 6 } },
          { type: 'flags', set: { joked: true } }
        ],
        opt1_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'Это, кстати, лучший ответ за сегодня' },
          { type: 'reaction', sender: 'alisa', textKey: 'Пришлю задание вечером. Жду результат' },
          { type: 'stats', changes: { success: 6, romance: 3, humor: 0 } },
          { type: 'flags', set: { honestEffort: true } }
        ]
      }
    },
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'Кстати, у меня завтра днём есть окно' },
        { sender: 'alisa', textKey: 'Можем созвониться' },
        { sender: 'alisa', textKey: 'Или как тебе удобнее?' }
      ]
    },
    {
      type: 'choice',
      id: 'day1_choice2',
      options: [
        { id: 'opt1b_1', labelKey: 'Давай как тебе удобно' },
        { id: 'opt1b_2', labelKey: 'А сейчас можешь? хочу побыстрее закрыть вопрос' },
        { id: 'opt1b_3', labelKey: 'Распишу время сам в приложении, не парьтесь' },
        { id: 'opt1b_4', labelKey: 'А можно по видео? Хочу не только голос слышать', hidden: true }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day1_choice2',
      branches: {
        opt1b_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'Приятно слышать.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Обычно все тянут расписание до последнего' },
          { type: 'stats', changes: { success: 3, romance: 0, humor: 0 } },
          { type: 'flags', set: { respectsTime: true } }
        ],
        opt1b_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'Ого, шустрый)' },
          { type: 'reaction', sender: 'alisa', textKey: 'Не сейчас, у меня, между прочим, тоже есть жизнь' },
          { type: 'reaction', sender: 'alisa', textKey: 'После работы' },
          { type: 'reaction', sender: 'alisa', textKey: 'Но мне нравится напор, ладно' },
          { type: 'stats', changes: { success: -1, romance: 3, humor: 2 } },
          { type: 'flags', set: { pushySchedule: true } }
        ],
        opt1b_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'О, самостоятельный.' },
          { type: 'reaction', sender: 'alisa', textKey: 'Уважаю таких' },
          { type: 'stats', changes: { success: 3, romance: 0, humor: 0 } },
          { type: 'flags', set: { selfStudy: true } }
        ],
        opt1b_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'По видео? Ну смотри... я не против' },
          { type: 'reaction', sender: 'alisa', textKey: 'Только не вздумай смотреть на меня вместо урока' },
          { type: 'stats', changes: { success: 2, romance: 6, humor: 0 } },
          { type: 'flags', set: { wantsVideo: true } }
        ]
      }
    },
    {
      type: 'message',
      sender: 'alisa',
      textKey: 'Ладно, я спать. длинный был день'
    },
    {
      type: 'message',
      sender: 'alisa',
      textKey: 'Кстати... у нас в школе не особо приветствуют'
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
    // Conditional next day
    { type: 'if', check: { hasFlag: 'flirtWithTeacher' }, then: [{ type: 'goto', day: 'day2_flirt' }] },
    { type: 'if', check: { hasFlag: 'studiedHard' }, then: [{ type: 'goto', day: 'day2_study' }] },
    { type: 'goto', day: 'day2' }
  ]
};

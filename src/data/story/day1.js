/** Day 1 — first contact: study first, boundaries stated plainly. */
export default {
  start: { hour: 20, minute: 0 },
  steps: [
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Добрый вечер' },
      { sender: 'alisa', textKey: 'Это Алиса Сергеевна'},
      { sender: 'alisa', textKey: 'Проверила ваш сегодняшний тест' },
      { sender: 'alisa', textKey: 'Иии это слабовато' },
      { sender: 'alisa', textKey: 'И домашка пустая. Что случилось?'}
    ] },
    { type: 'choice', id: 'day1_response', options: [
      { id: 'd1_apologize', labelKey: 'd1_apologize' },
      { id: 'd1_ask_help', labelKey: 'd1_ask_help' },
      { id: 'd1_joke', labelKey: 'd1_joke' },
      { id: 'd1_flirt_early', labelKey: 'd1_flirt_early', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day1_response', branches: {
      d1_apologize: [
        { type: 'reaction', sender: 'alisa', textKey: 'Ок, спасибо, что сказали прямо' },
        { type: 'reaction', sender: 'alisa', textKey: 'Хорошо. Жду переделанную работу' },
        { type: 'stats', changes: { success: 5, romance: 0, humor: 0 } },
        { type: 'flags', set: { studyFocused: true, honestWithAlisa: true } }
      ],
      d1_ask_help: [
        { type: 'reaction', sender: 'alisa', textKey: 'Хорошо, скину памятку с примерами' },
        { type: 'reaction', sender: 'alisa', textKey: 'Изучите, потом напишите, если останутся вопросы. Но только в рабочие часы' },
        { type: 'stats', changes: { success: 4, romance: 0, humor: 0 } },
        { type: 'flags', set: { studyFocused: true } }
      ],
      d1_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Ладно, засчитано' },
        { type: 'reaction', sender: 'alisa', textKey: 'А теперь серьёзно. Когда сможете сдать?' },
        { type: 'stats', changes: { success: 1, romance: 0, humor: 3 } },
      ],
      d1_flirt_early: [
        { type: 'reaction', sender: 'alisa', textKey: 'Мы только начали общаться' },
        { type: 'reaction', sender: 'alisa', textKey: 'Давайте пока не будем смешивать это с домашкой' },
        { type: 'stats', changes: { success: -1, romance: -4, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true } }
      ]
    } },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'И ещё момент' },
      { sender: 'alisa', textKey: 'Вы взрослый, я понимаю' },
      { sender: 'alisa', textKey: 'Поэтому заранее хотела бы обговорить' },
      { sender: 'alisa', textKey: 'В личку только по учебе' }
    ] },
    { type: 'choice', id: 'day1_schedule', options: [
      { id: 'd1_schedule_calm', labelKey: 'd1_schedule_calm' },
      { id: 'd1_schedule_self', labelKey: 'd1_schedule_self' },
      { id: 'd1_schedule_now', labelKey: 'd1_schedule_now' },
      { id: 'd1_schedule_video', labelKey: 'd1_schedule_video', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day1_schedule', branches: {
      d1_schedule_calm: [
        { type: 'reaction', sender: 'alisa', textKey: 'Ну и отлично, думаю к шести тогда' },
        { type: 'stats', changes: { success: 2, romance: 1, humor: 0 } },
        { type: 'flags', set: { respectsTime: true, respectsBoundary: true } }
      ],
      d1_schedule_self: [
        { type: 'reaction', sender: 'alisa', textKey: 'Договорились, пришлите, когда будет готово' },
        { type: 'stats', changes: { success: 3, romance: 0, humor: 0 } },
        { type: 'flags', set: { selfStudy: true, respectsBoundary: true } }
      ],
      d1_schedule_now: [
        { type: 'reaction', sender: 'alisa', textKey: 'Сегодня уже поздно' },
        { type: 'reaction', sender: 'alisa', textKey: 'Напишите завтра, в рабочее время' },
        { type: 'stats', changes: { success: 0, romance: -2, humor: 0 } },
        { type: 'flags', set: { pushySchedule: true } }
      ],
      d1_schedule_video: [
        { type: 'reaction', sender: 'alisa', textKey: 'Нет, это лишние' },
        { type: 'reaction', sender: 'alisa', textKey: 'Это просто разбор. Давайте без этого' },
        { type: 'stats', changes: { success: 0, romance: -4, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true, pushySchedule: true } }
      ]
    } },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Повторите тему' },
      { sender: 'alisa', textKey: 'До завтра' }
    ] },
    { type: 'flags', set: { day1Completed: true } },
    { type: 'achievement' },
    { type: 'goto', day: 'day2' }
  ]
};

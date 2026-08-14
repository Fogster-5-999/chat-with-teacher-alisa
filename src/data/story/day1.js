/** Day 1 — first contact: study first, boundaries stated plainly. */
export default {
  start: { hour: 19, minute: 50 },
  steps: [
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Добрый вечер', time: '19:51' },
      { sender: 'alisa', textKey: 'Это Алиса Сергеевна', time: '19:52' },
      { sender: 'alisa', textKey: 'Проверила ваш сегодняшний тест', time: '19:53' },
      { sender: 'alisa', textKey: 'Иии это слабовато', time: '19:54' },
      { sender: 'alisa', textKey: 'И домашка пустая. Что случилось?', time: '19:56' }
    ] },
    { type: 'choice', id: 'day1_response', time: '19:59', options: [
      { id: 'd1_apologize', labelKey: 'd1_apologize' },
      { id: 'd1_ask_help', labelKey: 'd1_ask_help' },
      { id: 'd1_joke', labelKey: 'd1_joke' },
      { id: 'd1_flirt_early', labelKey: 'd1_flirt_early', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day1_response', branches: {
      d1_apologize: [
        { type: 'reaction', sender: 'alisa', textKey: 'Ок, спасибо, что сказали прямо', time: '20:01' },
        { type: 'reaction', sender: 'alisa', textKey: 'Хорошо. Жду переделанную работу', time: '20:02' },
        { type: 'stats', changes: { success: 5, romance: 0, humor: 0 } },
        { type: 'flags', set: { studyFocused: true, honestWithAlisa: true } }
      ],
      d1_ask_help: [
        { type: 'reaction', sender: 'alisa', textKey: 'Хорошо, скину памятку с примерами', time: '20:01' },
        { type: 'reaction', sender: 'alisa', textKey: 'Изучите, потом напишите, если останутся вопросы. Но только в рабочие часы', time: '20:03' },
        { type: 'stats', changes: { success: 4, romance: 0, humor: 0 } },
        { type: 'flags', set: { studyFocused: true } }
      ],
      d1_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Ладно, засчитано', time: '20:01' },
        { type: 'reaction', sender: 'alisa', textKey: 'А теперь серьёзно. Когда сможете сдать?', time: '20:02' },
        { type: 'stats', changes: { success: 1, romance: 0, humor: 3 } },
      ],
      d1_flirt_early: [
        { type: 'reaction', sender: 'alisa', textKey: 'Мы только начали общаться', time: '20:01' },
        { type: 'reaction', sender: 'alisa', textKey: 'Давайте пока не будем смешивать это с домашкой', time: '20:02' },
        { type: 'stats', changes: { success: -1, romance: -4, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true } }
      ]
    } },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'И ещё момент', time: '20:05' },
      { sender: 'alisa', textKey: 'Вы взрослый, я понимаю', time: '20:06' },
      { sender: 'alisa', textKey: 'Поэтому заранее хотела бы обговорить', time: '20:07' },
      { sender: 'alisa', textKey: 'В личку только по учебе', time: '20:08' }
    ] },
    { type: 'choice', id: 'day1_schedule', time: '20:11', options: [
      { id: 'd1_schedule_calm', labelKey: 'd1_schedule_calm' },
      { id: 'd1_schedule_self', labelKey: 'd1_schedule_self' },
      { id: 'd1_schedule_now', labelKey: 'd1_schedule_now' },
      { id: 'd1_schedule_video', labelKey: 'd1_schedule_video', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day1_schedule', branches: {
      d1_schedule_calm: [
        { type: 'reaction', sender: 'alisa', textKey: 'Ну и отлично, думаю к шести тогда', time: '20:13' },
        { type: 'stats', changes: { success: 2, romance: 1, humor: 0 } },
        { type: 'flags', set: { respectsTime: true, respectsBoundary: true } }
      ],
      d1_schedule_self: [
        { type: 'reaction', sender: 'alisa', textKey: 'Договорились, пришлите, когда будет готово', time: '20:13' },
        { type: 'stats', changes: { success: 3, romance: 0, humor: 0 } },
        { type: 'flags', set: { selfStudy: true, respectsBoundary: true } }
      ],
      d1_schedule_now: [
        { type: 'reaction', sender: 'alisa', textKey: 'Сегодня уже поздно', time: '20:13' },
        { type: 'reaction', sender: 'alisa', textKey: 'Напишите завтра, в рабочее время', time: '20:14' },
        { type: 'stats', changes: { success: 0, romance: -2, humor: 0 } },
        { type: 'flags', set: { pushySchedule: true } }
      ],
      d1_schedule_video: [
        { type: 'reaction', sender: 'alisa', textKey: 'Нет, это лишние', time: '20:13' },
        { type: 'reaction', sender: 'alisa', textKey: 'Это просто разбор. Давайте без этого', time: '20:14' },
        { type: 'stats', changes: { success: 0, romance: -4, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true, pushySchedule: true } }
      ]
    } },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Повторите тему', time: '20:16' },
      { sender: 'alisa', textKey: 'До завтра', time: '20:17' }
    ] },
    { type: 'flags', set: { day1Completed: true } },
    { type: 'achievement' },
    { type: 'goto', day: 'day2' }
  ]
};

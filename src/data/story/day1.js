/** Day 1 — first contact: study first, boundaries stated plainly. */
export default {
  start: { hour: 20, minute: 0 },
  steps: [
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Привет, есть минутка?' },
      { sender: 'alisa', textKey: 'Проверила тест у вашей группы.' },
      { sender: 'alisa', textKey: 'У тебя слабовато вышло.' },
      { sender: 'alisa', textKey: 'И домашка пустая, что случилось?' }
    ] },
    { type: 'choice', id: 'day1_response', options: [
      { id: 'd1_apologize', labelKey: 'd1_apologize' },
      { id: 'd1_ask_help', labelKey: 'd1_ask_help' },
      { id: 'd1_joke', labelKey: 'd1_joke' },
      { id: 'd1_flirt_early', labelKey: 'd1_flirt_early', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day1_response', branches: {
      d1_apologize: [
        { type: 'reaction', sender: 'alisa', textKey: 'Ок, спасибо, что сказал прямо.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Давай без подвигов. Пересдача и пять коротких предложений.' },
        { type: 'stats', changes: { success: 5, romance: 0, humor: 0 } },
        { type: 'flags', set: { studyFocused: true, honestWithAlisa: true } }
      ],
      d1_ask_help: [
        { type: 'reaction', sender: 'alisa', textKey: 'Объясню. А дальше уже сам.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Скину правило и пару примеров.' },
        { type: 'stats', changes: { success: 4, romance: 0, humor: 0 } },
        { type: 'flags', set: { studyFocused: true } }
      ],
      d1_joke: [
        { type: 'reaction', sender: 'alisa', textKey: 'Ладно, засчитано.' },
        { type: 'reaction', sender: 'alisa', textKey: 'А теперь серьёзно. Когда сможешь сдать?' },
        { type: 'stats', changes: { success: 1, romance: 0, humor: 3 } },
      ],
      d1_flirt_early: [
        { type: 'reaction', sender: 'alisa', textKey: 'Мы только начали общаться.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Давай пока не будем смешивать это с домашкой.' },
        { type: 'stats', changes: { success: -1, romance: -4, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true } }
      ]
    } },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'И ещё момент.' },
      { sender: 'alisa', textKey: 'Ты взрослый, я понимаю.' },
      { sender: 'alisa', textKey: 'Но пока ты учишься у меня, давай без путаницы.' }
    ] },
    { type: 'choice', id: 'day1_schedule', options: [
      { id: 'd1_schedule_calm', labelKey: 'd1_schedule_calm' },
      { id: 'd1_schedule_self', labelKey: 'd1_schedule_self' },
      { id: 'd1_schedule_now', labelKey: 'd1_schedule_now' },
      { id: 'd1_schedule_video', labelKey: 'd1_schedule_video', hidden: true }
    ] },
    { type: 'branch', onChoice: 'day1_schedule', branches: {
      d1_schedule_calm: [
        { type: 'reaction', sender: 'alisa', textKey: 'Спасибо, завтра после шести смогу.' },
        { type: 'stats', changes: { success: 2, romance: 1, humor: 0 } },
        { type: 'flags', set: { respectsTime: true, respectsBoundary: true } }
      ],
      d1_schedule_self: [
        { type: 'reaction', sender: 'alisa', textKey: 'Договорились, пришли, когда будет готово.' },
        { type: 'stats', changes: { success: 3, romance: 0, humor: 0 } },
        { type: 'flags', set: { selfStudy: true, respectsBoundary: true } }
      ],
      d1_schedule_now: [
        { type: 'reaction', sender: 'alisa', textKey: 'Сегодня уже не получится.' },
        { type: 'reaction', sender: 'alisa', textKey: 'У меня уже рабочий день закончился.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Напиши завтра, в рабочее время.' },
        { type: 'stats', changes: { success: 0, romance: -2, humor: 0 } },
        { type: 'flags', set: { pushySchedule: true } }
      ],
      d1_schedule_video: [
        { type: 'reaction', sender: 'alisa', textKey: 'Нет, видео точно не нужно.' },
        { type: 'reaction', sender: 'alisa', textKey: 'Это просто разбор. Давай без лишнего.' },
        { type: 'stats', changes: { success: 0, romance: -4, humor: 0 } },
        { type: 'flags', set: { pushedTooFast: true, pushySchedule: true } }
      ]
    } },
    { type: 'messages', list: [
      { sender: 'alisa', textKey: 'Скину тему и до завтра пропаду.' },
      { sender: 'alisa', textKey: 'Удачи. И не откладывай снова.' }
    ] },
    { type: 'flags', set: { day1Completed: true } },
    { type: 'achievement' },
    { type: 'goto', day: 'day2' }
  ]
};

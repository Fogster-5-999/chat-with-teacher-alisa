/**
 * Day 6 — park invitation and personal confession.
 */

export default {
  start: { afterDay: 'day5_3' },
  steps: [
    {
      type: 'messages',
      list: [
        { sender: 'alisa', textKey: 'привет. я долго думала о нашем разговоре... знаешь, мне кажется, мы оба чего-то боимся. но я хочу, чтобы ты знал: ты для меня больше, чем просто ученик.' },
        { sender: 'alisa', textKey: 'может, встретимся завтра после школы? не в кафе, а просто погуляем в парке. там никого из наших не будет. я бы хотела поговорить с тобой без оглядки на всех.' },
        { sender: 'alisa', textKey: 'я сейчас сижу в парке, на той самой скамейке. приходи завтра в это же время, если хочешь.' }
      ]
    },
    { type: 'photo', url: 'res/chat2.png', blurred: true },
    {
      type: 'choice',
      id: 'day6_choice',
      options: [
        { id: 'opt6_1', labelKey: 'привет) я тоже думал о тебе. давай встретимся, просто поговорим. во сколько?' },
        { id: 'opt6_2', labelKey: 'честно? немного боюсь. но приду, если ты хочешь', hidden: true },
        { id: 'opt6_3', labelKey: 'парк, скамейка, книга - прям сцена из фильма) приду, конечно' },
        { id: 'opt6_4', labelKey: 'я хочу сказать тебе что-то важное, но мне нужно набраться смелости...', hidden: true, cost: 2 }
      ]
    },
    {
      type: 'branch',
      onChoice: 'day6_choice',
      branches: {
        opt6_1: [
          { type: 'reaction', sender: 'alisa', textKey: 'отлично. завтра в 17:00, у входа в парк. я буду ждать. и спасибо, что согласился. это для меня много значит.' },
          { type: 'stats', changes: { success: 5, romance: 8, humor: 0 } }
        ],
        opt6_2: [
          { type: 'reaction', sender: 'alisa', textKey: 'я тоже боюсь. но иногда стоит рискнуть, правда? завтра в 17:00. я буду в парке, у скамейки с книгой. ты не пожалеешь, обещаю.' },
          { type: 'stats', changes: { success: 0, romance: 12, humor: 0 } }
        ],
        opt6_3: [
          { type: 'reaction', sender: 'alisa', textKey: 'ахах, нет, проверять не буду. но если захочешь - могу устроить тебе мини-экзамен прямо на скамейке) шучу. жду завтра в 17:00. приходи, будет интересно.' },
          { type: 'stats', changes: { success: 3, romance: 5, humor: 10 } }
        ],
        opt6_4: [
          { type: 'reaction', sender: 'alisa', textKey: 'я... я тоже чувствую что-то к тебе. это странно, но я не могу это отрицать. давай попробуем?' },
          { type: 'stats', changes: { success: 0, romance: 10, humor: 0 }, note: '❤️ Признание принято! +10 к Романтике. Ты открыл особую концовку.' },
          { type: 'flags', set: { earlyConfession: true } }
        ]
      }
    },
    { type: 'achievement' },
    { type: 'goto', day: 'day7' }
  ]
};

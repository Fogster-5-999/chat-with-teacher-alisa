/**
 * Story metadata — achievement definitions and paid content.
 */

export const achievementsMeta = [
  {
    id: 'first_step',
    name: { ru: 'Первый шаг', en: 'First Step' },
    icon: '👣',
    conditionData: { hasFlag: 'day1Completed' }
  },
  {
    id: 'day2_minitest_passed',
    name: { ru: 'Знаток грамматики', en: 'Grammar Guru' },
    icon: '📝',
    conditionData: { hasFlag: 'miniTest:day2_test:passed' }
  },
  {
    id: 'excellent',
    name: { ru: 'Отличник', en: 'Excellent Student' },
    icon: '📚',
    conditionData: { stat: 'success', gte: 50 }
  },
  {
    id: 'heartbreaker',
    name: { ru: 'Сердцеед', en: 'Heartbreaker' },
    icon: '❤️',
    conditionData: { stat: 'romance', gte: 50 }
  },
  {
    id: 'joker',
    name: { ru: 'Шутник', en: 'Joker' },
    icon: '😂',
    conditionData: { stat: 'humor', gte: 50 }
  },
  {
    id: 'collector',
    name: { ru: 'Коллекционер', en: 'Collector' },
    icon: '🖼️',
    conditionData: { hasFlag: 'photoUnlocked' }
  },
  {
    id: 'truth_seeker',
    name: { ru: 'Правдолюб', en: 'Truth Seeker' },
    icon: '🔍',
    conditionData: { hasFlag: 'allHonest' }
  },
  {
    id: 'graduate',
    name: { ru: 'Выпускник', en: 'Graduate' },
    icon: '🎓',
    conditionData: { hasFlag: 'gameEnded' }
  }
];

export const paidContent = [
  { id: 'story2', label: { ru: 'Сюжет #2 (скоро)', en: 'Story #2 (coming soon)' }, cost: 3, locked: true },
  { id: 'story3', label: { ru: 'Сюжет #3 (скоро)', en: 'Story #3 (coming soon)' }, cost: 5, locked: true }
];

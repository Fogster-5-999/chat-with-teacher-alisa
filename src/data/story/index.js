/**
 * Story index — combines all day modules into the GAME_SCRIPT export.
 */
import { achievementsMeta, paidContent } from './meta.js';
import day1 from './day1.js';
import { day2, day2_flirt, day2_study } from './day2.js';
import day3 from './day3.js';
import day4 from './day4.js';
import { day5_1, day5_2, day5_3 } from './day5.js';
import day6 from './day6.js';
import day7 from './day7.js';

export const GAME_SCRIPT = {
  achievementsMeta,
  paidContent,
  day1,
  day2,
  day2_flirt,
  day2_study,
  day3,
  day4,
  day5_1,
  day5_2,
  day5_3,
  day6,
  day7
};

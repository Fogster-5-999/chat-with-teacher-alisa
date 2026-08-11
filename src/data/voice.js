/**
 * Voice message registry.
 *
 * Each entry maps a voiceId (referenced from story steps as `{ type: 'voice', voiceId }`)
 * to an audio file. All voice messages are locked by default (ad required to listen),
 * mirroring the photo unlock behaviour.
 *
 * To remove a voice message from the game — delete its step from the day script.
 * To add a new one — add a file to res/voice/, register it here and insert
 * `{ type: 'voice', voiceId: '...' }` into the desired day.
 */
export const voiceClips = {
  day_3: { file: 'res/voice/day_3.mp3' },
  day_5_1: { file: 'res/voice/day_5.1.mp3' },
  day_5_3: { file: 'res/voice/day_5.3.mp3' },
  day_6: { file: 'res/voice/day_6.mp3' },
  day_7: { file: 'res/voice/day_7.mp3' }
};

/** Lookup helper — returns entry or null if not registered. */
export function getVoiceClip(voiceId) {
  return voiceClips[voiceId] || null;
}

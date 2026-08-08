/**
 * Avatar management — sets up the header and profile avatars.
 */
import { openLightbox } from '../ui/lightbox.js';

/**
 * Initialize the avatar elements in the header and profile modal.
 */
export function initAvatar() {
  const headerAvatarImg = document.getElementById('avatar-img');
  if (headerAvatarImg) {
    headerAvatarImg.src = 'res/ava.png';
    headerAvatarImg.classList.add('has-photo');
    headerAvatarImg.style.display = 'block';
  }
  const profileAvatarImg = document.getElementById('profile-avatar-img');
  if (profileAvatarImg) {
    profileAvatarImg.src = 'res/ava.png';
    profileAvatarImg.classList.add('has-photo');
    profileAvatarImg.style.display = 'block';
  }
  const avatarEmoji = document.getElementById('avatar-emoji');
  if (avatarEmoji) avatarEmoji.classList.add('hidden');
  const profileAvatarEmoji = document.getElementById('profile-avatar-emoji');
  if (profileAvatarEmoji) profileAvatarEmoji.classList.add('hidden');

  // Avatar click — open profile modal
  const avatar = document.getElementById('avatar');
  if (avatar) {
    avatar.addEventListener('click', () => {
      const profileModal = document.getElementById('profile-modal');
      if (profileModal) profileModal.classList.add('active');
    });
  }

  // Profile avatar large — open lightbox
  const profileAvatarLarge = document.getElementById('profile-avatar-large');
  if (profileAvatarLarge) {
    profileAvatarLarge.addEventListener('click', () => {
      const img = document.getElementById('profile-avatar-img');
      if (img && img.src) openLightbox(img.src);
    });
  }

  // Close profile button
  const closeProfileBtn = document.getElementById('close-profile');
  if (closeProfileBtn) {
    closeProfileBtn.addEventListener('click', () => {
      const profileModal = document.getElementById('profile-modal');
      if (profileModal) profileModal.classList.remove('active');
    });
  }
}

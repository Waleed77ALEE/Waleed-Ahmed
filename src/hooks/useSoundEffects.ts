import { useState, useEffect, useCallback } from 'react';
import {
  soundEngine,
  playHoverSound,
  playClickSound,
  playSuccessSound,
  playTabSound,
  playModalOpenSound,
  toggleSoundEffects,
  isSoundEffectsEnabled,
  setSoundEffectsEnabled,
} from '../utils/soundEffects';

export function useSoundEffects() {
  const [isEnabled, setIsEnabled] = useState<boolean>(() => isSoundEffectsEnabled());

  useEffect(() => {
    const handleSoundChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.enabled === 'boolean') {
        setIsEnabled(customEvent.detail.enabled);
      } else {
        setIsEnabled(isSoundEffectsEnabled());
      }
    };

    window.addEventListener('wka_sound_state_change', handleSoundChange);
    return () => {
      window.removeEventListener('wka_sound_state_change', handleSoundChange);
    };
  }, []);

  const toggle = useCallback(() => {
    const newState = toggleSoundEffects();
    setIsEnabled(newState);
    return newState;
  }, []);

  const setEnabled = useCallback((val: boolean) => {
    setSoundEffectsEnabled(val);
    setIsEnabled(val);
  }, []);

  return {
    isEnabled,
    toggleSound: toggle,
    setEnabled,
    playHover: playHoverSound,
    playClick: playClickSound,
    playSuccess: playSuccessSound,
    playTab: playTabSound,
    playModalOpen: playModalOpenSound,
  };
}

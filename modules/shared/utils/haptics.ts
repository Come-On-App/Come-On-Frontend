import * as Haptics from 'expo-haptics';

export const hapticSelection = Haptics.selectionAsync;

/**
 * A library that provides access to the system's vibration effects
 */
export function withSelectionHaptic(...fns: (() => void)[]) {
  return fns.map((fn) => {
    return () => {
      hapticSelection();
      fn();
    };
  });
}

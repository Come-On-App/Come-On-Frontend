import * as Haptics from 'expo-haptics';

export const hapticSelection = Haptics.selectionAsync;

export const hapticImpactLight = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

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

import * as Haptics from 'expo-haptics';

export const hapticSelection = Haptics.selectionAsync;

export const hapticImpactLight = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const hapticError = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
};

export const hapticSuccess = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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

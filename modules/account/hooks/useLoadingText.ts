import { useEffect, useState } from 'react';

/**
 * 전달된 문자열을 로딩에 적합한 문자열로 반환한다.
 */
export default function useLoadingText(title: string, isLoading: boolean) {
  const [loadingIndex, setLoadingIndex] = useState(0);
  const loadingPatterns = [`${title} 중.`, `${title} 중..`, `${title} 중...`];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoading) {
      interval = setInterval(() => {
        setLoadingIndex(
          (prevIndex) => (prevIndex + 1) % loadingPatterns.length,
        );
      }, 500); // 0.5초마다 인덱스 변경
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLoading, loadingPatterns.length]);

  return isLoading ? loadingPatterns[loadingIndex] : title;
}

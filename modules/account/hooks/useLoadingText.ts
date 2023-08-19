import { useEffect, useState } from 'react';

const MS_500 = 500;

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
          // 마지막 길이에 도달하면 0번째 인덱스 반환
          (prevIndex) => (prevIndex + 1) % loadingPatterns.length,
        );
      }, MS_500); // 0.5초마다 인덱스 변경
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLoading, loadingPatterns.length]);

  return isLoading ? loadingPatterns[loadingIndex] : title;
}

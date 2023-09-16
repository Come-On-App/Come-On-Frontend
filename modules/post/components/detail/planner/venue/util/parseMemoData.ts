import { MetaData } from '../../customField/type';

export default function parseMemoData(target?: string): {
  content: string;
  fields: MetaData[];
} {
  const defaultResult = {
    content: '',
    fields: [] as MetaData[],
  };

  if (!target) return defaultResult;

  let parsedData;

  try {
    parsedData = JSON.parse(target);
  } catch (error) {
    return {
      content: target,
      fields: [],
    };
  }

  if (typeof parsedData !== 'object' || parsedData === null) {
    return defaultResult;
  }

  return {
    content: parsedData?.content || '',
    fields: parsedData?.fields || [],
  };
}

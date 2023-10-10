/* eslint-disable no-unsafe-finally */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import perf from '@react-native-firebase/perf';

export const requestPerfInterceptor = async (request) => {
  try {
    const httpMetric = perf().newHttpMetric(request.url, request.method);

    request.metadata = { httpMetric };

    await httpMetric.start();
  } finally {
    return request;
  }
};

export const responsePerfInterceptor = async (response) => {
  try {
    const { httpMetric } = response.config.metadata;

    httpMetric.setHttpResponseCode(response.status);
    httpMetric.setResponseContentType(response.headers['content-type']);

    await httpMetric.stop();
  } finally {
    return response;
  }
};

export const responseErrorPerfInterceptor = async (error) => {
  try {
    const { httpMetric } = error.config.metadata;

    httpMetric.setHttpResponseCode(error.response.status);
    httpMetric.setResponseContentType(error.response.headers['content-type']);

    await httpMetric.stop();
  } finally {
    return Promise.reject(error);
  }
};

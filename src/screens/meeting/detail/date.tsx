import React from 'react';
import { BoldFont } from '@components/Font';
import Layout from '@components/Layout';

// 모임 기간
export default function Date() {
  return (
    <Layout
      containerStyle={{
        borderWidth: 1,
        borderRadius: 4,
        height: 100,
      }}
    >
      <BoldFont>모임 기간</BoldFont>
    </Layout>
  );
}

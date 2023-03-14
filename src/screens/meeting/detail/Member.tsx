import React from 'react';
import { BoldFont } from '@components/Font';
import Layout from '@components/Layout';

// 모임 멤버
export default function Member() {
  return (
    <Layout
      containerStyle={{
        borderWidth: 1,
        borderRadius: 4,
        height: 100,
      }}
    >
      <BoldFont>모임 멤버</BoldFont>
    </Layout>
  );
}

/* eslint-disable import/prefer-default-export */
import React from 'react';
import { ScrollView, View } from 'react-native';

import Font from '../components/Font';

// 기능 실험장소 입니다.

// 주변 지역 검색 API -> 검색후 괜찮은곳이 있으면 사진 제공
// fetch(
//   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${encodeURI(
//     detail.name,
//   )}&location=${detail.geometry.location.lat},${
//     detail.geometry.location.lng
//   }&radius=1500&type=restaurant&key=${GOOGLE_PLACES_API_KEY}`,
// ).then(console.log);

/**
 * **테스트 컴포넌트 입니다.**
 *
 * 장소 검색 화면에서 사용자들에게 추천 장소 및 핫플장소를 추전해보면 어떨까
 *
 * 실험 기능: 장소검색후 나온 위치를 기반하여 추천 장소를 제공
 */
export function TestBox() {
  console.log('테스트 컴포넌트 렌더링');

  return (
    <View
      style={{
        width: '100%',
        height: 400,
        flex: 1,
        backgroundColor: 'pink',
        position: 'absolute',
        top: 100,
        zIndex: 0,
      }}
    >
      <View>
        <Font>우리 지역 핫플</Font>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Box />
        <Box />
        <Box />
        <Box />
      </ScrollView>
    </View>
  );
}

function Box() {
  return (
    <View
      style={{
        height: 300,
        width: 300,
        backgroundColor: 'red',
        marginHorizontal: 10,
        borderRadius: 10,
      }}
    />
  );
}

import React from 'react';
import _ from 'lodash';

import DividerWrapper from '@shared/components/layout/DividerWrapper';
import ScreenLayout from '@shared/components/layout/ScreenLayout';
import ContentHeader from '@shared/components/layout/ContentHeader';
import useStyles from './style';
import Title from './Title';
import DeleteButton from './DeleteButton';
import Content from './Content';
import { ICustomFieldEditor } from './type';

function CustomField({ metaData, onLayout, onFocus }: ICustomFieldEditor) {
  const style = useStyles();

  return (
    <DividerWrapper onLayout={onLayout}>
      <ScreenLayout>
        <ContentHeader customStyle={style.contentHeader}>
          <Title metaData={metaData} onFocus={onFocus} />
          <DeleteButton itemKey={metaData.itemKey} />
        </ContentHeader>
        <Content metaData={metaData} onFocus={onFocus} />
      </ScreenLayout>
    </DividerWrapper>
  );
}

export default React.memo(CustomField, (prevProps, nextProps) => {
  return _.isEqual(prevProps.metaData, nextProps.metaData);
});

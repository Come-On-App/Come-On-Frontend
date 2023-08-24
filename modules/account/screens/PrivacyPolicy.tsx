import { ScrollView } from 'react-native';
import React from 'react';

import {
  Content,
  Paragraph,
  SubTitle,
  Title,
} from '@account/components/policyInfo/textBlocks/TextBlocks';
import ScreenLayout from '@shared/components/layout/ScreenLayout';

/**
 * 개인정보처리방침
 */
export default function PrivacyPolicy() {
  return (
    <ScrollView>
      <ScreenLayout>
        <Title>[Come On! 개인정보 처리방침]</Title>
        <Paragraph>
          <SubTitle>제1조 (개인정보의 처리 목적)</SubTitle>
          <Content>
            {`Come On!('https://github.com/Come-On-App/Come-On-Frontend', 이하 'Come On!')은 다음과 같은 목적으로 개인정보를 처리합니다. 개인정보 처리는 다음의 목적 이외의 용도로는 사용되지 않으며, 목적이 변경되는 경우에는 "개인정보 보호법" 제18조에 따라 별도의 동의를 받도록 조치할 것입니다.홈페이지 회원가입 및 관리 회원 가입의사 확인, 회원제 서비스 제공을 위한 본인 식별 및 인증, 회원 자격 유지 및 관리를 목적으로 개인정보를 처리합니다. 재화 또는 서비스 제공 앱 사용 서비스 제공을 목적으로 개인정보를 처리합니다.`}
          </Content>
        </Paragraph>
        <Paragraph>
          <SubTitle>제2조 (개인정보의 처리 및 보유 기간)</SubTitle>
          <Content>
            {`① Come On!은(는) 개인정보 보유·이용 기간에 관한 법령과 정보주체로부터 개인정보를 수집할 때 동의를 받은 개인정보 보유·이용 기간 내에서 개인정보를 처리하고 보유합니다. ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다. <재화 또는 서비스 제공> 개인정보의 수집 및 이용에 관한 동의로부터 서비스 종료 시까지 보유합니다. 보유근거: 원활한 서비스 제공을 위해 서비스 종료 시까지 준영구 보유합니다.`}
          </Content>
        </Paragraph>
        <Paragraph>
          <SubTitle>제3조 (처리하는 개인정보의 항목)</SubTitle>
          <Content>
            {`① Come On!은 다음의 개인정보 항목을 처리하고 있습니다. <회원가입 및 관리> 필수항목: 이름, 이메일, 사용자 이미지`}
          </Content>
        </Paragraph>
        <Paragraph>
          <SubTitle>제4조 (개인정보의 파기절차 및 파기방법)</SubTitle>
          <Content>
            ① Come On!은 개인정보 보유기간 경과, 처리 목적 달성 등 개인정보가
            불필요하게 된 경우에는 지체없이 해당 개인정보를 파기합니다. ②
            정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리 목적
            달성에도 불구하고 다른 법률에 따라 개인정보를 계속 보존해야 할 경우,
            해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관 장소를
            달리하여 보존합니다.
          </Content>
        </Paragraph>
        <Paragraph>
          <SubTitle>
            제5조 (정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)
          </SubTitle>
          <Content>
            {`① 정보주체는 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다. ② 제1항에 따른 권리 행사는 "개인정보 보호법" 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통해 할 수 있으며, Come On!은 이에 대해 신속하게 조치할 것입니다. ③ 개인정보 열람 및 처리정지 요구는 "개인정보 보호법" 제35조 제4항, 제37조 제2항에 따라 정보주체의 권리가 제한될 수 있습니다.`}
          </Content>
        </Paragraph>
        <Paragraph>
          <SubTitle>제6조 (개인정보의 안전성 확보조치에 관한 사항)</SubTitle>
          <Content>
            Come On!은 개인정보의 안전성 확보를 위해 내부관리계획 수립, 개인정보
            취급 직원의 최소화와 교육 등 다음과 같은 조치를 취하고 있습니다.
            내부관리계획의 수립 및 시행 개인정보의 안전한 처리를 위해
            내부관리계획을 수립하고 시행합니다. 개인정보 취급 직원의 최소화 및
            교육 개인정보를 취급하는 직원을 최소화하고 해당 직원에 한정하여
            개인정보를 관리하는 대책을 시행합니다.
          </Content>
        </Paragraph>
        <Paragraph>
          <SubTitle>
            제7조 (개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에
            관한 사항)
          </SubTitle>
          <Content>
            {`Come On!은 정보주체의 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용하지 않습니다.`}
          </Content>
        </Paragraph>
        <Paragraph>
          <SubTitle>제8조 (개인정보 보호책임자에 관한 사항)</SubTitle>
          <Content>
            Come On!은 개인정보 처리에 관한 업무를 총괄하고, 개인정보 처리와
            관련한 정보주체의 불만처리 및 피해구제 등을 위해 개인정보
            보호책임자를 지정하고 있습니다.
          </Content>
        </Paragraph>
        <Paragraph>
          <SubTitle>제9조 (개인정보의 열람청구를 접수·처리하는 부서)</SubTitle>
          <Content>
            {`정보주체는 개인정보의 열람청구를 아래의 부서에 할 수 있습니다. < Come On! >은 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다. ▶ 개인정보 열람청구 접수·처리 부서 부서명: 서버개발운영팀 담당자: 유하영 연락처: 010-4181-3839, yoo971202@naver.com`}
          </Content>
        </Paragraph>
        <Paragraph>
          <SubTitle>제10조 (정보주체의 권익침해에 대한 구제방법)</SubTitle>
          <Content>
            정보주체는 개인정보 침해로 인한 구제를 받기 위해 다음과 같은 방법을
            사용할 수 있습니다. 개인정보분쟁조정위원회, 개인정보침해신고센터,
            대검찰청, 경찰청
          </Content>
        </Paragraph>
        <Paragraph>
          <SubTitle>제11조 (개인정보 처리방침 변경)</SubTitle>
          <Content>
            ① 이 개인정보 처리방침은 2023년 4월 5일부터 적용됩니다.
          </Content>
        </Paragraph>
      </ScreenLayout>
    </ScrollView>
  );
}

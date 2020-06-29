## 다국어 (i18n)

Quotabook App의 다국어를 지원하기 위한 파일 형식 정리

quotabook-frontend 프로젝트의 feature/i18n 브랜치에서 관리.

- [여기서 아래 포멧처럼 수정해주시면 됩니다](https://github.com/quotabook/quotabook-frontend/blob/feature/i18n/src/translations/messages.ts)

#### 사용 프레임워크

- [react-intl](https://github.com/formatjs/react-intl/tree/master/docs)

#### 작성 포멧

1) 국가 구분은 최상위 object로 구분한다. (ko_KR, en_US, ja_JP.. 등)

```
ko_KR: {
    lang: 'ko',
    ...
},
en_US: {
    lang: 'en',
    ...
}
```

2) 다국어 문자열 추가시 구분자는 아래와 같다.

category.{menu | property}?.{component | property}?.property?

```
예) 기업_카테고리.제목: '기업'
'institution.title': '기업',
'stakeholder.title': '주주',
```

```
예) 기업_카테고리.기본정보_메뉴.총주주수_컴포넌트: '총 주주 수'
'institution.info.total_stakeholders': '총 주주 수',
```

```
예) 기업_카테고리.기본정보_메뉴.설명_컴포넌트.이름: '기업명'
'institution.info.description.title': '기업 정보',
'institution.info.description.name': '기업명',
'institution.info.description.website': '웹사이트',
'institution.info.description.date': '설립일',
```

3) 포멧에 매개변수 넘길 수도 있음

```
예) 총 투자금액 뒤에 USD, KRW 등 통화 정보가 들어가는 경우
'institution.info.total_cash_raised': '총 투자금액 ({currency})',
``` 


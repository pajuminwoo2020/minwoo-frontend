## 다국어 (i18n)

다국어를 지원하기 위한 파일 형식 정리

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

2) 다국어 문자열 추가시 messages.ts 파일은 아래와 같다.

```vim
'institution.title': '기업',
'stakeholder.title': '주주',
```

3) 포멧에 매개변수 넘길 수도 있다

```
예) 총 투자금액 뒤에 USD, KRW 등 통화 정보가 들어가는 경우
'institution.info.total_cash_raised': '총 투자금액 ({currency})',
``` 

4) 번역용 key, value를 정리해놓은 엑셀파일부터 messages.ts를 생성하려면 
```bash
$ python makemessages.py -cs 'Translations.xlsx' # 확인
$ python makemessages.py 'Translations.xlsx'     # 실제 messages.ts 생성
``` 

import React, {useState} from 'react';
import Configs from 'config';

export function useThumbnail (use: boolean): [string, (value: string) => void] {
  const [thumbnailSource, setThumbnailSource] = useState('');

  function setThumbnail(innerHTML: string) {
    /* innerHTML에서 첫번째 img 태그를 찾아 그 src값을 thumbnailSource에 셋팅해준다 */
    let element = document.createElement('div');
    element.innerHTML = innerHTML;
    const imgSrcUrls = element.getElementsByTagName("img");
    for (let i = 0; i < imgSrcUrls.length; i++) {
      const urlValue = imgSrcUrls[i].getAttribute("src");
      if (urlValue) {
        setThumbnailSource(urlValue.replace(Configs.API_HOST, ''));
        break;
      }
    }
  }

  if (use === true)
    return [thumbnailSource, setThumbnail];

  return ['', (val: string) => {}];
}

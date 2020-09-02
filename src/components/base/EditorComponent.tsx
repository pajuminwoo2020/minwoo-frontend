import debounce from 'lodash.debounce';
import {Editor} from '@tinymce/tinymce-react';
import React, {useCallback, useEffect, useState} from 'react';
import {Spin} from 'antd';
import {CDefaultEditorHeight, CDefaultEditorPlugins, CDefaultEditorToolbars} from 'constants/base.const';
import Configs from 'config';
import {cookies, CCSRFToken} from 'libs/api/apiClient';

type TEditorComponentProps = {
  content?: string,
  onChange?: (value: string) => void,
  setThumbnail?: (value: string) => void,
};

const EditorComponent: React.FC<TEditorComponentProps> = ({
  content,
  onChange,
  setThumbnail,
}) => {
  const [loading, setLoading] = useState(true);
  const onEditorChange = (editorContent: string) => {
    onChange && onChange(editorContent);
    setThumbnail && setThumbnail(editorContent);
  };

  return (
    <Spin tip="로딩중.." spinning={loading}>
      <input
        type="file"
        id="image-upload-tinymce"
        style={{display:'none'}}
        accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
      />
      <Editor
        apiKey={Configs.EDITOR_API_KEY}
        inline={false}
        value={content}
        init={{
          setup: function (ed: any) {
            ed.on('init', function() {
              setLoading(false);
            });
          },
          content_style: 'img {max-width: 100%; height: auto;}',
          language: 'ko_KR',
          language_url: "/langs/ko_KR.js",
          height: CDefaultEditorHeight,
          statusbar: false,
          plugins: CDefaultEditorPlugins,
          toolbar: CDefaultEditorToolbars,
          branding: false,
          image_advtab: true,
          images_upload_handler: function (blobInfo:any, success:any, failure:any, progress:any) {
            let xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.open('POST', `${Configs.API_HOST}/board/image`);
            xhr.setRequestHeader('X-CSRFToken', cookies.get(CCSRFToken));
            xhr.timeout = 30000;

            xhr.upload.onprogress = function (e) {
              progress(e.loaded / e.total * 100);
            };

            xhr.onload = function() {
              if (xhr.status < 200 || xhr.status >= 300) {
                failure('HTTP Error: ' + xhr.status);
                return;
              }
              const json = JSON.parse(xhr.responseText);

              if (!json || typeof json.location != 'string') {
                failure('Invalid JSON: ' + xhr.responseText);
                return;
              }
              success(`${Configs.API_HOST}${json.location}`);
            };

            xhr.onerror = function () {
              failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
            };
            let formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());

            xhr.send(formData);
          },
          paste_data_images: true,
          file_browser_callback_types: 'image',
          file_picker_callback: (callback: any, value: any, meta: any) => {
            function resize(image: any) {
              // image크기 줄이기
              const maxSize = 1000;
              const canvas = document.createElement('canvas');
              let width = image.width;
              let height = image.height;

              if (width > height && width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
              } else if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
              }
              canvas.width = width;
              canvas.height = height;
              canvas.getContext('2d')?.drawImage(image, 0, 0, width, height);

              return canvas.toDataURL('image/jpeg');
            }

            if (meta.filetype == 'image') {
              const input = document.getElementById('image-upload-tinymce') as HTMLInputElement;
              input.click();
              input.onchange = () => {
                const file = (input.files as FileList)[0];
                const reader = new FileReader();

                reader.onload = (e: any) => {
                  let img = new Image();
                  img.onload = () => {
                    callback(resize(img), {
                      alt: file.name
                    });
                  }
                  img.src = reader.result as string;

                  debounce(onEditorChange, 10000);
                };
                reader.readAsDataURL(file);
              };
            }
          },
        }}
        onEditorChange={onEditorChange}
        disabled={false}
      />
    </Spin>
  );
};


EditorComponent.defaultProps = {};

export default EditorComponent;

import {Editor} from '@tinymce/tinymce-react';
import React, {useCallback, useEffect} from 'react';
import {CDefaultEditorHeight, CDefaultEditorPlugins, CDefaultEditorToolbars} from 'constants/base.const';
import Configs from 'config';

type TEditorComponentProps = {
  content?: string,
  onChange?: (value: string) => void,
  disabled?: boolean;
};

const EditorComponent: React.FC<TEditorComponentProps> = ({
  content,
  onChange,
  disabled = false,
}) => {
  const setDisplayHeader = useCallback(() => {
    const editorHeader = document.getElementsByClassName('tox-editor-header')[0] as HTMLElement;

    if (editorHeader) {
      editorHeader.style.display = disabled === true ? 'none' : 'block';
    }
  }, [disabled]);

  useEffect(() => {
    setDisplayHeader();
  }, [disabled]);

  const onEditorChange = (editorContent: string) => {
    onChange && onChange(editorContent);
  };

  return (
    <Editor
      apiKey={Configs.EDITOR_API_KEY}
      value={content}
      init={{
        height: CDefaultEditorHeight,
        statusbar: false,
        plugins: CDefaultEditorPlugins,
        toolbar: CDefaultEditorToolbars,
        branding: false,
        image_advtab: true,
        paste_data_images: true,
      }}
      onEditorChange={onEditorChange}
      disabled={disabled}
      onInit={() => {
        setDisplayHeader();
      }}
    />
  );
};


EditorComponent.defaultProps = {};

export default EditorComponent;

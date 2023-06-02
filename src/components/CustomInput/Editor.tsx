import React, { useEffect } from 'react';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Jodit } from 'jodit';
interface EditorComponentProps {
    name: string
    onChange: any
}

const Editor: React.FC<EditorComponentProps> = ({name, onChange}) => {
    return (
        <FroalaEditorComponent
        tag="textarea"
        config={{
            name: name,
            onChange: onChange, 
            placeholderText: 'Type here...',
            toolbarButtons: ['bold', 'italic', 'underline', 'alignLeft', 'alignCenter', 'alignRight', 'alignJustify',],
            quickInsertButtons: ['image', 'table'],
            customColorButton: '#F98D3E',
            height: 300,
        }}
        model={name}
        onModelChange={onChange}
        />
    );
};

export default Editor;

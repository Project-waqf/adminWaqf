import React, { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style'
// import { Bold, Italic, Underline } from 'tiptap-extensions';
// import { TextAlign } from 'tiptap-extensions';

interface MenuBarProps  {
    editor: any
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
    if (!editor) {
        return null
    }
        return (
        <>
            <div
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
            >
            bold
            </div>
            <div
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            >
            italic
            </div>
        </>
    )
}
interface TipTapProps {
    editor: any
}
const TiptapEditor: React.FC<TipTapProps> = ({editor}) => {
    const [value, setValue] = useState()
    // const editor = useEditor({
    //     extensions: [
    //     StarterKit,
    //     // Bold,
    //     // Italic,
    //     // Underline,
    //     // TextAlign.configure({
    //     //     types: ['paragraph'], // Apply text alignment to paragraphs
    //     // }),
    //     ],
    //     content: '<p>Initial content</p>', // Set initial content
    //     onUpdate({ editor }) {
    //     const content = editor.getHTML(); // Get the updated HTML content
    //     console.log('Content:', content); // Log the updated content
    //     },
    // });
    console.log(value);
    
    return (
        <div className="container mx-auto my-8">
        <MenuBar editor={editor} />
        <EditorContent editor={editor}/>
        </div>
    );
};

export default TiptapEditor;

import React, { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style'
import { BsTypeBold, BsTypeItalic, BsTypeUnderline } from "react-icons/bs";
import { RiAlignCenter, RiAlignJustify, RiAlignLeft, RiAlignRight } from "react-icons/ri";
// import { Bold, Italic, Underline } from 'tiptap-extensions';
// import { TextAlign } from 'tiptap-extensions';
import { Extension } from '@tiptap/core';
import TextAlign from '@tiptap/extension-text-align';
interface MenuBarProps  {
    editor: any
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
    if (!editor) {
        return null
    }
        return (
        <div className='flex text-[24px] space-x-3'>
            <div
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${editor.isActive('bold') ? 'text-btnColor' : 'text-neutral-80'} transition-all cursor-pointer`}
            >
            <BsTypeBold/>
            </div>
            <div
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${editor.isActive('italic') ? 'text-btnColor' : 'text-neutral-80'} transition-all cursor-pointer`}
            >
            <BsTypeItalic/>
            </div>
            <div
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${editor.isActive('underline') ? 'text-btnColor' : 'text-neutral-80'} transition-all cursor-pointer`}
            >
            <BsTypeUnderline/>
            </div>
            <div onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`${editor.isActive({ textAlign: 'left' }) ? 'text-btnColor' : 'text-neutral-80'} transition-all cursor-pointer`}
            >
                <RiAlignLeft/>
            </div>
            <div onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`${editor.isActive({ textAlign: 'center' }) ? 'text-btnColor' : 'text-neutral-80'} transition-all cursor-pointer`}
            >
                <RiAlignCenter/>
            </div>
            <div onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`${editor.isActive({ textAlign: 'right' }) ? 'text-btnColor' : 'text-neutral-80'} transition-all cursor-pointer`}
            >
                <RiAlignRight/>
            </div>
            <div onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`${editor.isActive({ textAlign: 'justify' }) ? 'text-btnColor' : 'text-neutral-80'} transition-all cursor-pointer`}
            >
                <RiAlignJustify/>
            </div>
        </div>
    )
}
interface TipTapProps {
    editor: any
    value: string
}
const TiptapEditor: React.FC<TipTapProps> = ({editor, value}) => {   
    return (
        <div className=" h-[350px] border border-black mt-2">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} value={value}/>
        </div>
    );
};

export default TiptapEditor;

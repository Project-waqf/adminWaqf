import React, { useEffect, useState } from 'react'
import Typography from '../Typography';
import {FaBold, FaUnderline, FaItalic, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify} from 'react-icons/fa'
// import '../../styles/main.sass'
interface TextAreaProps {
    name: string
    value: string
    selectionStart?: any
    selectionEnd?: any
    onSelect?: any
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
    label: string
}

const TextArea:React.FC<TextAreaProps> = ({name, value, onChange, label, selectionEnd, selectionStart, onSelect}) => {
    const [text, setText] = useState<string>('');
    // const [selectionStart, setSelectionStart] = useState(0);
    // const [selectionEnd, setSelectionEnd] = useState(0);

    const alignButton = document.querySelectorAll('.align')
    const optionsButton = document.querySelectorAll('.option-button')
    
    const highlighter = (className: any, needRemoval: any) => {
        className.forEach((button: any) => {
            button.addEventListener("click", () => {
                if (needRemoval) {
                    let alreadyActive = false
                    if (button.classList.contains('text-primary-80')){
                        alreadyActive = true
                    }
                    highlighterRemover(className)
                    if (!alreadyActive){
                        button.classList.add("text-primary-80")
                    }
                } else {
                    button.classList.toggle("text-primary-80")
                }
            })
        });
    }
    
    useEffect(()=>{
        initialer()
    },[])
    const highlighterRemover = (className: any) => {
        className.forEach((button:any) => {
            button.classList.remove('text-primary-80')
        });
    }

    const initialer = () => {
        highlighter(alignButton, true)
        highlighter(optionsButton, false)
    }
    return (
        <>
            <Typography variant='h5' color='text01' type='medium' className=''>
                {label}
            </Typography>
            <div className="relative flex flex-col w-full h-[300px] border bg-white justify-center border-solid border-neutral-80 rounded-lg overflow-none  focus:border-primary-80 focus:ring-1 focus:ring-primary-80">
                <div className="w-full h-14 mx-auto mt-1 bg-white border flex flex-row mt-0 px-2 border-none dark:bg-gray-800">
                    <div className="flex space-x-3 border border-solid border-r-neutral-60 rounded-bl-xl border-l-white border-y-white my-auto pr-2">
                        <button onClick={()=> highlighter('option-button', true)} id='bold' className='border-solid border-neutral-60 rounded px-2 py-2 transition-all option-button bg-white text-btnColor text-[18px] cursor-pointer'>
                            <FaBold/>
                        </button>
                        <button id='underline' className='border-solid border-neutral-60 rounded px-2 py-2 transition-all option-button  bg-white text-btnColor text-[20px] cursor-pointer'>
                            <FaUnderline/>
                        </button>
                        <button id='italic' className='border-solid border-neutral-60 rounded px-2 py-2 transition-all option-button bg-white text-btnColor text-[18px] cursor-pointer'>
                            <FaItalic/>
                        </button>
                    </div>
                    <div className="flex space-x-3 ml-2 my-auto">
                        <button id='align-left' className='border-solid border-neutral-60 rounded px-2 py-2 bg-white text-btnColor text-[18px] align cursor-pointer'>
                            <FaAlignLeft/>
                        </button>
                        <button id='align-center' className='border-solid border-neutral-60 rounded px-2 py-2 bg-white text-btnColor text-[18px] align cursor-pointer'>
                            <FaAlignCenter/>
                        </button>
                        <button id='align-rigth' className='border-solid border-neutral-60 rounded px-2 py-2 bg-white text-btnColor text-[18px] align cursor-pointer'>
                            <FaAlignRight/>
                        </button>
                        <button id='align-Justify' className='border-solid border-neutral-60 rounded px-2 py-2 bg-white text-btnColor text-[18px] align cursor-pointer'>
                            <FaAlignJustify/>
                        </button>
                    </div>
                </div>
                <div className="w-full h-full mx-auto">
                    <textarea 
                    value={value} name={name} onChange={onChange} id="message" className=" w-full h-full text-text01 bg-white text-base leading-6 rounded-lg border-none focus:outline-none"></textarea>
                </div>
            </div>
        </>
    )
}

export default TextArea
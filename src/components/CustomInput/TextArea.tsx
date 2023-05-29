import React, { useState } from 'react'
import Typography from '../Typography';

interface TextAreaProps {
    name: string
    value: string
    selectionStart?: any
    selectionEnd?: any
    onSelect?: any
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>
    label: string
}

const TextArea:React.FC<TextAreaProps> = ({name, value, onChange, label, selectionEnd, selectionStart, onSelect}) => {
    const [text, setText] = useState<string>('');
    // const [selectionStart, setSelectionStart] = useState(0);
    // const [selectionEnd, setSelectionEnd] = useState(0);
    
    
    return (
        <>
            <Typography variant='h5' color='text01' type='medium' className=''>
                {label}
            </Typography>
            <div className="relative flex flex-col w-full h-[300px] border bg-white justify-center border-solid border-neutral-80 rounded-lg overflow-auto  focus:border-primary-80 focus:ring-1 focus:ring-primary-80">
                <div className="w-fit h-14 mx-auto bg-white border flex flex-row mt-0 px-2 border-solid border-x-neutral-80 border-b-neutral-80 border-t-whiteBg rounded-b-xl dark:bg-gray-800">
                    <div className="flex space-x-1 border border-solid border-r-neutral-60 rounded-bl-xl border-l-white border-y-white my-auto pr-2">
                        <svg
                        onClick={() => setText((prevText) => prevText.slice(0, selectionStart) + '<b>' + prevText.slice(selectionStart, selectionEnd) + '</b>' + prevText.slice(selectionEnd))}
                        className='cursor-pointer' width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="32" rx="5" fill="white"/>
                            <path d="M8.91761 25V7.54545H15.3097C16.5483 7.54545 17.5739 7.75 18.3864 8.15909C19.1989 8.5625 19.8068 9.1108 20.2102 9.80398C20.6136 10.4915 20.8153 11.267 20.8153 12.1307C20.8153 12.858 20.6818 13.4716 20.4148 13.9716C20.1477 14.4659 19.7898 14.8636 19.3409 15.1648C18.8977 15.4602 18.4091 15.6761 17.875 15.8125V15.983C18.4545 16.0114 19.0199 16.1989 19.571 16.5455C20.1278 16.8864 20.5881 17.3722 20.9517 18.0028C21.3153 18.6335 21.4972 19.4006 21.4972 20.304C21.4972 21.196 21.2869 21.9972 20.8665 22.7074C20.4517 23.4119 19.8097 23.9716 18.9403 24.3864C18.071 24.7955 16.9602 25 15.608 25H8.91761ZM11.5511 22.7415H15.3523C16.6136 22.7415 17.517 22.4972 18.0625 22.0085C18.608 21.5199 18.8807 20.9091 18.8807 20.1761C18.8807 19.625 18.7415 19.1193 18.4631 18.6591C18.1847 18.1989 17.7869 17.8324 17.2699 17.5597C16.7585 17.2869 16.1506 17.1506 15.446 17.1506H11.5511V22.7415ZM11.5511 15.0966H15.0795C15.6705 15.0966 16.2017 14.983 16.6733 14.7557C17.1506 14.5284 17.5284 14.2102 17.8068 13.8011C18.0909 13.3864 18.233 12.8977 18.233 12.3352C18.233 11.6136 17.9801 11.0085 17.4744 10.5199C16.9688 10.0312 16.1932 9.78693 15.1477 9.78693H11.5511V15.0966Z" fill="#27303E"/>
                        </svg>
                        <svg 
                        onClick={() => setText((prevText) => prevText.slice(0, selectionStart) + '<u>' + prevText.slice(selectionStart, selectionEnd) + '</u>' + prevText.slice(selectionEnd))}
                        className='cursor-pointer'  width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="32" rx="5" fill="white"/>
                            <path d="M19.142 7.54545H21.7841V19.0256C21.7841 20.2472 21.4972 21.3295 20.9233 22.2727C20.3494 23.2102 19.5426 23.9489 18.5028 24.4886C17.4631 25.0227 16.2443 25.2898 14.8466 25.2898C13.4545 25.2898 12.2386 25.0227 11.1989 24.4886C10.1591 23.9489 9.35227 23.2102 8.77841 22.2727C8.20455 21.3295 7.91761 20.2472 7.91761 19.0256V7.54545H10.5511V18.8125C10.5511 19.6023 10.7244 20.304 11.071 20.9176C11.4233 21.5312 11.9205 22.0142 12.5625 22.3665C13.2045 22.7131 13.9659 22.8864 14.8466 22.8864C15.733 22.8864 16.4972 22.7131 17.1392 22.3665C17.7869 22.0142 18.2813 21.5312 18.6222 20.9176C18.9688 20.304 19.142 19.6023 19.142 18.8125V7.54545Z" fill="#27303E"/>
                            <line x1="5" y1="28.5" x2="19" y2="28.5" stroke="#27303E"/>
                        </svg>
                        <svg
                        onClick={() => setText((prevText) => prevText.slice(0, selectionStart) + '<i>' + prevText.slice(selectionStart, selectionEnd) + '</i>' + prevText.slice(selectionEnd))}
                        className='cursor-pointer' width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="32" rx="5" fill="white"/>
                            <path d="M18.358 7.54545L15.4602 25H12.8267L15.7244 7.54545H18.358Z" fill="#27303E"/>
                        </svg>
                    </div>
                    <div className="flex space-x-1 ml-2 my-auto">
                        <svg className='cursor-pointer' width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="32" rx="5" fill="white"/>
                            <line x1="5" y1="10.25" x2="25" y2="10.25" stroke="black" stroke-width="1.5"/>
                            <line x1="5" y1="15.25" x2="18" y2="15.25" stroke="black" stroke-width="1.5"/>
                            <line x1="5" y1="20.25" x2="21" y2="20.25" stroke="black" stroke-width="1.5"/>
                        </svg>
                        <svg className='cursor-pointer' width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="32" rx="5" fill="white"/>
                            <line x1="5" y1="10.25" x2="25" y2="10.25" stroke="black" stroke-width="1.5"/>
                            <line x1="8" y1="15.25" x2="22" y2="15.25" stroke="black" stroke-width="1.5"/>
                            <line x1="6" y1="20.25" x2="24" y2="20.25" stroke="black" stroke-width="1.5"/>
                        </svg>
                        <svg className='cursor-pointer' width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="32" rx="5" fill="white"/>
                            <line x1="5" y1="10.25" x2="25" y2="10.25" stroke="black" stroke-width="1.5"/>
                            <line x1="12" y1="15.25" x2="25" y2="15.25" stroke="black" stroke-width="1.5"/>
                            <line x1="9" y1="20.25" x2="25" y2="20.25" stroke="black" stroke-width="1.5"/>
                        </svg>
                        <svg className='cursor-pointer' width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="30" height="32" rx="5" fill="#FBFBFB"/>
                            <line x1="5" y1="10.25" x2="25" y2="10.25" stroke="black" stroke-width="1.5"/>
                            <line x1="5" y1="15.25" x2="25" y2="15.25" stroke="black" stroke-width="1.5"/>
                            <line x1="5" y1="20.25" x2="25" y2="20.25" stroke="black" stroke-width="1.5"/>
                        </svg>
                    </div>
                </div>
                <div className="w-11/12 h-full mx-auto">
                    <textarea 
                    style={{ fontWeight: text.slice(selectionStart, selectionEnd).includes('<b>') ? 'bold' : 'normal',
                    fontStyle: text.slice(selectionStart, selectionEnd).includes('<i>') ? 'italic' : 'normal', 
                    textDecoration: text.slice(selectionStart, selectionEnd).includes('<u>') ? 'underline' : 'none',
                    resize: "none" }} 
                    onSelect={onSelect}
                    value={value} name={name} onChange={onChange} id="message" className=" w-full h-full text-text01 bg-white text-base leading-6 rounded-lg border-none focus:outline-none" placeholder="Write your thoughts here..."></textarea>
                </div>
            </div>
        </>
    )
}

export default TextArea
import React, { MouseEventHandler, useState } from 'react';
import { RiSendPlane2Line } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi";
interface TableProps {
    tanggal: string;
    judul: string;
    handleDraft?: MouseEventHandler
    handleDelete?: MouseEventHandler
    handleEdit?: MouseEventHandler
}





const CustomTable: React.FC<TableProps> = ({ tanggal, judul, handleDelete, handleDraft, handleEdit}) => {
    
    return (
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs bg-white">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                            Tanggal
                            <a href="#">
                              <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.00098 6.83329L0.000976562 1.83329L1.16764 0.666626L5.00098 4.49996L8.83431 0.666626L10.001 1.83329L5.00098 6.83329Z" fill="#A5A6AC"/>
                              </svg>
                            </a>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Judul
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Alat
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4">
                        {tanggal}
                    </th>
                    <td className="px-6 py-4">
                        {judul}
                    </td>
                    <td className="flex space-x-5">
                      <div className="cursor-pointer" onClick={handleDraft}>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3043 0.75 14.863 0.75C15.421 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.571 18.275 4.113C18.2917 4.65433 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#6485B9"/>
                        </svg>
                      </div>
                      <div className="cursor-pointer" onClick={handleEdit}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 18C1.45 18 0.979 17.8043 0.587 17.413C0.195667 17.021 0 16.55 0 16V3.5C0 3.25 0.0416667 3.025 0.125 2.825C0.208333 2.625 0.316667 2.43333 0.45 2.25L1.85 0.55C1.98333 0.366667 2.15 0.229 2.35 0.137C2.55 0.0456668 2.76667 0 3 0H15C15.2333 0 15.45 0.0456668 15.65 0.137C15.85 0.229 16.0167 0.366667 16.15 0.55L17.55 2.25C17.6833 2.43333 17.7917 2.625 17.875 2.825C17.9583 3.025 18 3.25 18 3.5V16C18 16.55 17.8043 17.021 17.413 17.413C17.021 17.8043 16.55 18 16 18H2ZM2.4 3H15.6L14.75 2H3.25L2.4 3ZM2 5V16H16V5H2ZM9 15L13 11L11.6 9.6L10 11.2V7H8V11.2L6.4 9.6L5 11L9 15Z" fill="#6485B9"/>
                        </svg>
                      </div>
                      <div className="cursor-pointer" onClick={handleDelete}>
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.196 17.021 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.021 17.8043 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" fill="#6485B9"/>
                        </svg>
                      </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    )
};

export default CustomTable;
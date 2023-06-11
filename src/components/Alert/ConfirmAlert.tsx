import Swal, { SweetAlertOptions, } from 'sweetalert2';
import '../../styles/main.scss'

export const sweetAlert = (options: SweetAlertOptions) => {
    return Swal.fire(options);
};



const ConfirmAlert = ( title?: 'upload' | 'edit' | 'draft' | 'archive' | 'delete' | 'cancel' | 'cancelEdit' | 'logout'): Promise<any> => {

    return sweetAlert({
        title: title === 'upload' ? '<p class="text-text01 text-[16px]">apakah anda ingin <b>upload</b> data ini?</p>' : 
        title === "edit" ? '<p class="text-text01 text-[16px]">Apakah anda ingin <b>simpan & perbarui</b> editan?</p>' :
        title === "draft" ? '<p class="text-text01 text-[16px]">Apakah anda ingin menyimpan ke <b>Draft</b>?</p>' : 
        title === "archive" ? '<p class="text-text01 text-[16px]">Apakah anda ingin memindahkan ke <b>Archive</b>?</p>' :
        title === "delete" ? '<p class="text-text01 text-[16px]">Apakah anda ingin <b>menghapus</b> data ini?</p><p class="text-red-500 text-[12px] mt-2">Jika “YA”, data akan dihapus secara permanen!</p>' : 
        title === 'cancel' ? '<p class="text-text01 text-[16px]">Apakah anda ingin <b>tutup</b> form ini?</p><p class="text-red-500 text-[12px] mt-2">Jika YA, data yang telah anda edit akan hilang!</p>' : 
        title === 'cancelEdit' ? '<p class="text-text01 text-[16px]">Apakah anda ingin <b>tutup</b> pengeditan?</p><p class="text-red-500 text-[12px] mt-2">Jika YA, data yang telah anda edit akan hilang!</p>' : 
        title === 'logout' ? '<p class="text-text01 text-[16px]">Apakah anda yakin ingin keluar dari aplikasi ini?</p>': '',
        width: 520,
        padding: 40,
        background: '#FBFBFB',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
        reverseButtons: true,
        buttonsStyling: false,
        customClass: {
            title: 'text-[2px]',
            confirmButton: `mx-2 mt-[28px] rounded-[8px] font-normal text-sm cursor-pointer w-[118px] py-3 ${title === 'delete' ? 'border border-btnColor outline-none bg-white text-btnColor' : title === 'cancel' || title === 'cancelEdit' ? 'border border-btnColor outline-none bg-white text-btnColor' : title === 'archive' ? 'border border-btnColor outline-none bg-white text-btnColor' : title === 'logout' ? 'border border-btnColor outline-none bg-white text-btnColor' : 'bg-btnColor border-none text-white'}`,
            cancelButton: `mx-2 mt-[28px] rounded-[8px] font-normal text-sm cursor-pointer w-[118px] py-3 ${title === 'delete' ? 'bg-btnColor border-none text-white' : title === 'cancel' || title === 'cancelEdit' ? 'bg-btnColor border-none text-white' : title === 'archive' ? 'bg-btnColor border-none text-white' : title === 'logout' ? 'bg-btnColor border-none text-white' :'border border-btnColor outline-none bg-white text-btnColor' }`
        }
    });
};

export default ConfirmAlert
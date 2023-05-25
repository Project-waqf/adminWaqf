import Swal, { SweetAlertOptions, } from 'sweetalert2';
import '../../styles/main.scss'

export const sweetAlert = (options: SweetAlertOptions) => {
    return Swal.fire(options);
};



const ConfirmAlert = ( title?: 'upload' | 'edit' | 'draft' | 'archive' | 'delete' | 'cancel' ): Promise<any> => {

    return sweetAlert({
        title: title === 'upload' ? 'apakah anda ingin <b>upload</b> data ini?' : 
        title === "edit" ? 'Yakin ingin edit?' :
        title === "draft" ? 'Simpan ke draft?' : 
        title === "archive" ? 'Simpan ke archive?' :
        title === "delete" ? 'Yakin ingin menghapus' : title === 'cancel' ? 'Yakin cancel?' : '',
        width: 500,
        padding: 60,
        background: '#FBFBFB',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
        reverseButtons: true,
        buttonsStyling: false,
        customClass: {
            title: 'text-[2px]',
            confirmButton: `mx-5 mt-[28px] rounded-[8px] font-normal text-sm cursor-pointer w-[118px] py-3 ${title === 'delete' ? 'border border-btnColor outline-none bg-white text-btnColor' : title === 'cancel'? 'border border-btnColor outline-none bg-white text-btnColor' : title === 'archive' ? 'border border-btnColor outline-none bg-white text-btnColor' : 'bg-btnColor border-none text-white'}`,
            cancelButton: `mx-5 mt-[28px] rounded-[8px] font-normal text-sm cursor-pointer w-[118px] py-3 ${title === 'delete' ? 'bg-btnColor border-none text-white' : title === 'cancel' ? 'bg-btnColor border-none text-white' : title === 'archive' ? 'bg-btnColor border-none text-white' : 'border border-btnColor outline-none bg-white text-btnColor' }`
        }
    });
};

export default ConfirmAlert
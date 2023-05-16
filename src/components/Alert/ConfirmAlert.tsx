import Swal, { SweetAlertOptions, } from 'sweetalert2';
import '../../styles/main.scss'

export const sweetAlert = (options: SweetAlertOptions) => {
    return Swal.fire(options);
};



const ConfirmAlert = ( title?: 'upload' | 'edit' | 'draft' | 'archive' | 'delete' | 'cancel' ): Promise<any> => {

    return sweetAlert({
        title: title === 'upload' ? 'Yakin ingin upload?' : 
        title === "edit" ? 'Yakin ingin edit?' :
        title === "draft" ? 'Simpan ke draft?' : 
        title === "archive" ? 'Simpan ke archive?' :
        title === "delete" ? 'Yakin ingin menghapus' : title === 'cancel' ? 'Yakin cancel?' : '',
        width: 700,
        padding: 80,
        background: '#FBFBFB',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
        reverseButtons: true,
        buttonsStyling: false,
        customClass: {
            confirmButton: `mx-2 mt-10 rounded-[8px] font-normal text-sm cursor-pointer w-[230px] py-3 ${title === 'delete' ? 'border border-btnColor outline-none bg-white text-btnColor' : title === 'cancel'? 'border border-btnColor outline-none bg-white text-btnColor' : title === 'archive' ? 'border border-btnColor outline-none bg-white text-btnColor' : 'bg-btnColor border-none text-white'}`,
            cancelButton: `mx-2 mt-10 rounded-[8px] font-normal text-sm cursor-pointer w-[230px] py-3 ${title === 'delete' ? 'bg-btnColor border-none text-white' : title === 'cancel' ? 'bg-btnColor border-none text-white' : title === 'archive' ? 'bg-btnColor border-none text-white' : 'border border-btnColor outline-none bg-white text-btnColor' }`
        }
    });
};

export default ConfirmAlert
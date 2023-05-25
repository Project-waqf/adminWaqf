import Swal, { SweetAlertOptions } from 'sweetalert2';
import { DraftSuccess, UploadSuccess, DeleteSuccess, EditSuccess, ArchiveSuccess } from '../../assets/svg/AlertIcon';
import '../../styles/main.scss'
export const sweetAlert = (options: SweetAlertOptions) => {
    return Swal.fire(options);
};



const Alert = ( icon?: 'upload' | 'edit' | 'draft' | 'archive' | 'delete' ): Promise<any> => {
    return sweetAlert({
        title: icon === 'upload' ? 'Upload Sukses' : 
        icon === "edit" ? 'Berhasil Mengedit' :
        icon === "draft" ? 'Berhasil Simpan Ke Draft' : 
        icon === "archive" ? 'Berhasil Simpan Ke Archive' :
        icon === "delete" ? 'Berhasil Menghapus' : 'Upload Sukses',
        imageUrl: `data:image/svg+xml,${encodeURIComponent(icon === 'upload' ? UploadSuccess : 
        icon === "edit" ? EditSuccess :
        icon === "draft" ? DraftSuccess : 
        icon === "archive" ? ArchiveSuccess :
        icon === "delete" ? DeleteSuccess : UploadSuccess)}`,
        imageWidth: 210,
        imageHeight: 210,
        showConfirmButton: false,
        width: 700,
        padding: 80,
        timer: 3000,
        background: '#FBFBFB'
    });
};

export default Alert
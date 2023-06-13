import Swal, { SweetAlertOptions } from 'sweetalert2';
import { DraftSuccess, UploadSuccess, DeleteSuccess, EditSuccess, ArchiveSuccess, Failed } from '../../assets/svg/AlertIcon';
import '../../styles/main.scss'
export const sweetAlert = (options: SweetAlertOptions) => {
    return Swal.fire(options);
};



const Alert = ( icon?: 'upload' | 'edit' | 'draft' | 'archive' | 'delete' | 'fail' ): Promise<any> => {
    return sweetAlert({
        title: icon === 'upload' ? '<p class="text-text01 text-[20px] mb-10">Upload Sukses</p>' : 
        icon === "edit" ? '<p class="text-text01 text-[20px] mb-10">Berhasil Mengedit</p>' :
        icon === "draft" ? '<p class="text-text01 text-[20px] mb-10">Berhasil Simpan Ke Draft</p>' : 
        icon === "archive" ? '<p class="text-text01 text-[20px] mb-10">Berhasil Simpan Ke Archive</p>' :
        icon === "delete" ? '<p class="text-text01 text-[20px] mb-10">Berhasil Menghapus</p>' : 
        icon === 'fail' ? '<p class="text-red-500 text-[20px] mb-10">Terjadi kesalahan, coba ulangi kembali</p>' : '<p class="text-text01 text-[20px] mb-10">Login Sukses</p>',
        imageUrl: `data:image/svg+xml,${encodeURIComponent(icon === 'upload' ? UploadSuccess : 
        icon === "edit" ? EditSuccess :
        icon === "draft" ? DraftSuccess : 
        icon === "archive" ? ArchiveSuccess :
        icon === "delete" ? DeleteSuccess : 
        icon === "fail" ? Failed : UploadSuccess)}`,
        customClass: {
            title: 'text-red-500 mb-80'
            },
        imageWidth: 210,
        imageHeight: 210,
        showConfirmButton: false,
        width: 480,
        padding: 20,
        timer: 3000,
        background: '#FBFBFB'
    });
};

export default Alert
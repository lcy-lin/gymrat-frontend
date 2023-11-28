import Swal from 'sweetalert2/dist/sweetalert2.js'

class AlertMessages {
    static success(message) {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            showConfirmButton: true,
            timer: 1500
        })
    }
    
    static error(message) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            showConfirmButton: false,
            timer: 1500
        })
    }
    static confirm(message, router, clearCookies) {
        Swal.fire({
            title: message,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                await clearCookies();
                Swal.fire('Logged Out Successfully', '', 'success');
                router.push('/signin');
            } else if (result.isDenied) {
                Swal.fire('Log Out Failed', '', 'info');
            }
        });
    };
    
}
export default AlertMessages;
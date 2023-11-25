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
}
export default AlertMessages;
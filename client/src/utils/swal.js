import Swal from 'sweetalert2';

const showAlert = (icon, title, text, callback = () => {}) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    }).then(callback);
  };
  
  export const showSuccessAlert = (title, text, callback = () => {}) => {
    showAlert('success', title, text, callback);
  };
  
  export const showFailureAlert = (title, text, callback = () => {}) => {
    showAlert('error', title, text, callback);
  };
  
  export const showVerificationAlert = (title, text, callback = () => {}) => {
    showAlert('info', title, text, callback);
  };
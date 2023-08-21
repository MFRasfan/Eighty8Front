import {toast} from 'react-toastify'

const toastConfig ={ 
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type:'error',
    theme: "light",
}

export const toastComponent ={
    error:(message)=> toast(message,{
          ...toastConfig, type:'error'
    }),

    info:(message)=> toast(message,{
        ...toastConfig, type:'info'
  }),

    warning:(message)=> toast(message,{
        ...toastConfig, type:'warning'
    }),

    success:(message)=> toast(message,{
        ...toastConfig, type:'success'
  }),
}

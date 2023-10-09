import React,{useState} from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Button from '../../component/button';
import ModalComponent from '../../component/ModalComponent';
import { addModuleInRole, getAllRoles } from '../../store/actions/rolesAndPermissions';
import { formStyle } from '../../style/adminStyle';
import { toastComponent } from '../../utils/toast';

const  MODULE_LIST=[
    'customers',
    'vehicles',
    'staff',
    'web content',
    'inquiries',
    'sales',
    'role and permissions',
    'manager dashboard',
    'sales dashboard',
    'user dashboard',
    'profile',
    'account settings'
]
const RoleAndPermissionForm = ({showModal, toggleModal, selectedRole}) => {
    const [input, setinput] = useState({})
    const dispatch = useDispatch()


    const handleSubmit= ()=>{
        if(!selectedRole.name){
            toastComponent.error('Please refresh page and select role again')
        }else{
            let obj={
                "moduleName":input.moduleName.value,
                "role":selectedRole.name,
            }
            dispatch(addModuleInRole(obj,(data)=>{
                if(data.message){
                    toastComponent.success('Module added successfully')
                    dispatch(getAllRoles())
                    setTimeout(() => {
                        toggleModal()
                    }, 2000);
                }else{

                    setTimeout(() => {
                        toggleModal()
                    }, 2000);
                }
            }))
        }
    }


  return (
    <div>
      
    <ModalComponent showModal={showModal} toggleModal={toggleModal}>
     <div className=' h-[60vh]'>
     <div className='bg-white p-5 shadow-md lg:w-[50vw] h-visible  '>

<h2 className={`${formStyle.h1Dashboard} capitalize`}> {selectedRole.name} | Add New Module Access</h2>

<label className={`${formStyle.label} font-bold`}>Module Name</label>

<div className="mt-1 mb-1">

    <Dropdown 
        options={MODULE_LIST} 

        name={'moduleName'}
        style={{border:0}}
        onChange={val=>setinput({...input,moduleName:val})} 
        value={input.moduleName} 
        placeholder="Select an option" />
        </div>

        <Button 
        className={'mt-4'}
        title={'Submit'}
        onClick={()=>handleSubmit()}
        />
</div>
     </div>

    </ModalComponent>
    <ToastContainer/>

    </div>
  )
}

export default RoleAndPermissionForm
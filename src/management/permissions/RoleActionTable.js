import React, {useState, useEffect} from 'react'
import  {useDispatch, useSelector} from 'react-redux' 
import { FaCheck } from 'react-icons/fa'
import RoleAndPermissionForm from './role&PermissionForm'
import { formStyle } from '../../style/adminStyle'
import TableSimpleUI from '../../component/tables/TableSimpleUI'
import CheckList from '../../component/checklist'


const RoleActionTable = ({selectedRole}) => {
    const [addNewModal, setaddNewModal] = useState(false)

    const renderRoleActionTableBody=(item,index)=>{
        return(
          <>
          <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
          {index+1}
          </td>
          <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
          {item.moduleName}
          </td>
          <td className="px-6 py-4 text-sm  flex space-x-5 capitalize text-gray-800 whitespace-nowrap">
        
          <CheckList
          optionList={['read','write','update','delete']}
          seletedItemList={item.access}
          />
          </td>
          </>
        )
      }

    
  return (
    <>
    <div className='flex mt-4 items-center justify-between'>
      <p 
      className={`${formStyle.h1Dashboard} capitalize text-lg px-2 pt-4`}
      > {selectedRole.name} Module Access List </p>
      <div>

      <div className='flex space-x-4 text-xs text-white'>
        <div
        onClick={()=>setaddNewModal(true)}
        className='bg-secondary p-2 rounded-md
         cursor-pointer hover:bg-primary duration-300 ease-in-out'>Add New Module</div>
        <div className='bg-secondary  p-2 rounded-md
         hover:bg-primary cursor-pointer duration-300 ease-in-out'>Save Changes</div>
      
      </div>
      </div>
    </div>

      <RoleAndPermissionForm 
       selectedRole={selectedRole}
       showModal={addNewModal}
       toggleModal={()=>setaddNewModal(!addNewModal)}/>
     <TableSimpleUI 
     thead={['SR.No','Module Name','access']}
     data={selectedRole.actions}
     tdcells={renderRoleActionTableBody}
    />
    </>
  )
}

export default RoleActionTable
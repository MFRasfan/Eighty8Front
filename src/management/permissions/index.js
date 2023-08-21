// import React, {useState, useEffect} from 'react'
import DashboardLayout from '../../component/dashboardLayout'
// import  {useDispatch, useSelector} from 'react-redux' 
// import { getAllRoles } from '../../store/actions/rolesAndPermissions'
// import TableSimpleUI from '../../component/tables/TableSimpleUI'
// import { formStyle } from '../../style/adminStyle'
// import CheckList from '../../component/checklist'
// import RoleActionTable from './RoleActionTable'

// const RolesAndPermisions = () => {
//   const dispatch = useDispatch()
//   const [activePage, setactivePage] = useState("role-list")
//   const [selectedRole, setselectedRole] = useState({})
 
// const [roleState, setroleState] = useState('')
//   const { roles } = useSelector(({ roles }) => ({
//     roles:roles.roles
//    }));

 

// console.log("roles.roles==========",roles)
//   useEffect(() => {
//     if(!roles.length){
//       dispatch(getAllRoles())
//     }
//   }, [roles.roles&& roles.roles.length])

//   const viewPermissionHandler=(item,index)=>{
//    setactivePage("role-details")
//    setselectedRole(item)
//   }
 
// const updatePermissionHandler=(item,index)=>{
//   console.log("update permission",item,index)
// }
// const renderRoleTableBody=(item,index)=>{
//   return(
//     <>
//     <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
//     {index+1}
//     </td>
//     <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
//     {item.name}
//     </td>

//     </>
//   )
// }



//   return (
//    <DashboardLayout>
//     <p className={`${formStyle.h1Dashboard} px-2`}>Roles And Access Management</p>
    
//     <p className={`${formStyle.h1Dashboard} text-lg px-2 pt-4`}>All Roles</p>
    
//     <TableSimpleUI 
//     thead={['SR.No','Role','view details']}
//     data={roles.data}
//     tdcells={renderRoleTableBody}
//     actions={[
//       {label:'view', onclick: viewPermissionHandler}
//     ]}
//     />

//     {activePage==="role-details" &&(
//       <RoleActionTable selectedRole={selectedRole}/>
//     )}
//    </DashboardLayout>
//   )


// }

// export default RolesAndPermisions

import React from 'react'

const Permission = () => {
  return (
    <DashboardLayout>permission</DashboardLayout>
  )
}

export default Permission
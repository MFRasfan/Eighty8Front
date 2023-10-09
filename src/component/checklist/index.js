import React,{useState} from 'react'
import { FaCheck } from 'react-icons/fa'


const CheckList = ({optionList, seletedItemList, setselectedListItems,  itemTextClassName}) => {
    const [selectedItems, setselectedItems] = useState([...seletedItemList])
    const handleSelectItems=(item,index)=>{
        let temp = selectedItems.slice(0)
        let findItem = selectedItems.indexOf(item)
        if(findItem<0){
            temp.push(item)
            setselectedItems(temp)
        }else{
            temp.splice(findItem,1)
            setselectedItems(temp)
        }

        setselectedListItems(temp)
    }
  return (
    <>
        {optionList.map((opItem, opIndex)=>(

        <div 
        onClick={()=>handleSelectItems(opItem, opIndex)}
        className='flex space-x-1 cursor-pointer'>
        <div 
        className={
            `
            ${selectedItems.find(iaitem=>iaitem === opItem)? 'bg-primary text-white ':' border-primary border-2'} 
            flex items-center justify-center w-6 h-6 rounded-md `}>
            <FaCheck size={15} className= {` ${selectedItems.find(iaitem=>iaitem === opItem)? 'text-white':'text-transparent'}`}    />
        </div>
        <p className={`${itemTextClassName}`}>{opItem}</p>
        </div>
        ))}
    </>
  )
}

export default CheckList
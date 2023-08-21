import React from "react";

export default function TableSimpleUI({thead, data, actions, tdcells}) {
    console.log(thead,data, actions)
    return (
        <div className=" flex flex-col">
            <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full  w-[70vw] divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {thead.map((item,index)=>(
                                        <th 
                                        key={Math.random()+index}
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                    >
                                       {item}
                                    </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                               
                                {data && data.map((item,index)=>(
                                    <tr 
                                    className="hover:bg-gray-50 duration-300 ease-in-out"
                                    key={Math.random()+index} >
                                    {/* <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {index+1}
                                    </td>
                                    <td className="px-6 py-4 text-sm  capitalize text-gray-800 whitespace-nowrap">
                                        {item.name}
                                    </td> */}
                                    
                                    {tdcells(item,index)}
                                   {(actions &&actions.length>0) &&actions.map((aItem, aIndex)=>(
                                        <td
                                        key={Math.random()+aIndex}
                                        className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                        <div
                                            className="text-green-500 cursor-pointer  capitalize hover:text-green-700"
                                            onClick={()=>aItem.onclick(item, aIndex)}
                                        >
                                            {aItem.label}
                                        </div>
                                    </td>
                                    ))}
                                     
                                    
                                </tr>
                                ))}
                               
                               
                               
                               
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
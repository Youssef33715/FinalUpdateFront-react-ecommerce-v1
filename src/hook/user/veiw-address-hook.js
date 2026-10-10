import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserAddress } from '../../redux/actions/userAddressAction'

const VeiwAddressHook = () => {
    const dispatch =useDispatch()
    const [loading,setLoading] =useState(true)

    useEffect(()=>{
        const get=async()=>{
            setLoading(true)
            await dispatch(getAllUserAddress());
            setLoading(false) 
        }
        get()
    },[dispatch])
    const res = useSelector((state) => state.userAddressReducer.allAddresses);

    return[res, loading]
}

export default VeiwAddressHook

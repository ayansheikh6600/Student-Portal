"use client"
import React, { useState } from 'react'
import {AdminCom, SerniorStdComp, StudentComp,} from "@/components/index"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const router = useRouter();

    const [user, setUser] = useState(Object)
    
    useEffect(() => {

      const storedUser = localStorage.getItem("user");
        
         const data = storedUser ? JSON.parse(storedUser) : null;
        //  console.log(data?.user);

       setUser(data?.user)
        // console.log(user?.userType);

        if(!data){
            router.push('/login');
        }
        
        
        
      }, []);

      // console.log(user);
      

      const Slect = ()=>{

        if(user?.userType == "student"){
          return (<StudentComp/>)
        }else if (user?.userType == "admin"){
          return <AdminCom user={user} />
        }else{
          <SerniorStdComp/>
        }
      }
 
    
  return (
    <>
    <Slect/>
    
   
    
    </>
  )
}

export default Dashboard
"use client"
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import {fileUploader} from '@/libs/fileUpload'


const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPasswd] = useState("")
    const [rollNo, setRollNo] = useState("")
    const [userName, setUserName] = useState("")
    const [file, setFile] = useState("")
    const [userType, setUserType] = useState("admin")
    const router = useRouter()

  

    const signupFun = async (e:any)=>{
        e.preventDefault();

        

       

        if (!email && !password && !rollNo && !userName) {
            alert("Please Fill input Fields");
            return;
          }

          const imageURL = await fileUploader(file) 

          const objtosend :object ={

            rollNo,
            userName,
            userType,
            password,
            email,
            imageURL

          } 
          const res = await axios.post("/api/signup", {objtosend})



          console.log(res);

          localStorage.setItem("user", JSON.stringify(res.data.data))

          router.push("/dashboard")

          
          
    }








  return (
    <div className="h-dvh">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={signupFun}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e)=>setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Name
              </label>
              <div className="mt-1">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  autoComplete="userName"
                  required
                  onChange={(e)=>setUserName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="RollNo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Roll Number
              </label>
              <div className="mt-1">
                <input
                  id="RollNo"
                  name="RollNo"
                  type="number"
                  autoComplete="RollNo"
                  required
                  onChange={(e)=>setRollNo(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e)=>setPasswd(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Profile Image
                </label>
                
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="file"
                  autoComplete="current-password"
                  required
                  onChange={(e)=>setFile(e.target.files[0])}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <p className="text-[13px]  flex justify-between px-1">Already Have An Account <Link href={"/login"} className="text-indigo-600 font-bold">LOGIN?</Link> </p>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
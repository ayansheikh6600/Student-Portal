"use client";
import React, { useEffect, useState } from "react";

import ModalContent from "../ModalContent";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const StudentComp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiData, setApiData] = useState();
  const [content, setContent] = useState()

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "api/add-assignment"
      );
      console.log(res.data);
      setApiData(res.data.data);
    })();


    // console.log(isModalOpen, "isModalOpen");
  }, []);

 function BasicModal({isOpen, isClose, content}) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false), isClose(false)};
  
    React.useEffect(()=>{
      setOpen(isOpen)
    }, [isOpen])
  
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <TextField disabled id="outlined-basic" defaultValue={content?.title} sx={{
            width:"100%"
          }}  label="Title" variant="outlined" />
          <TextField disabled id="outlined-basic" defaultValue={content?.desc} sx={{
            width:"100%",
            marginTop:2
          }}  label="Description" variant="outlined" />

          <div className="border-2 p-2 mt-4">
            <a href={content?.otherLink} className="" target="_blank">{content?.otherLink}</a>
          </div>
          
          
  
          <div className='w-full mt-3 bg-black'>
            <img width={100}  src={content?.image} alt="" />
          </div>
  
          <div className='w-full flex justify-between p-1 mt-3'>
            
            <button className='bg-blue-700 p-2 text-white rounded-md' onClick={()=>handleClose()}>Close</button>
          </div>
          
          </Box>
        </Modal>
      </div>
    );
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-[90%] mx-auto bg-blue-500">
      <div>
        <h1 className="text-2xl text-center font-bold">Student Dashboard</h1>
      </div>
      <div className="flex flex-col gap-2">
        {
            apiData?.map((item, index)=>{
                return(
                <div key={index} className="w-[90%] rounded-md mx-auto bg-red-400 flex justify-between px-3 items-center">
          <div className="p-2 ">
            <h1 className="text-xl">{item.title}</h1>
            <p className="text-sm">Assign by {item.user.userName}</p>
          </div>
          <div className="flex gap-3">
            <button
              className="bg-green-500 px-3 py-1 rounded-md"
              onClick={() => {setIsModalOpen(true), setContent(item)}}
            >
              Visit
            </button>
            <button className="bg-green-500 px-3 py-1 rounded-md">
              Turn In
            </button>
            <BasicModal isOpen={isModalOpen} isClose={setIsModalOpen} content={content}/>
          </div>
        </div>)
            })
        }
      </div>
    </div>
  );
};

export default StudentComp;

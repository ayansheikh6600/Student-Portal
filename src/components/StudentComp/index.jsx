"use client";
import React, { useEffect, useState } from "react";

import ModalContent from "../ModalContent";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import YouTube from "../TopicSkeleton";

const StudentComp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiData, setApiData] = useState();
  const [content, setContent] = useState()

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "api/add-assignment"
      );
      // console.log(res.data);
      setApiData(res.data.data);
    })();


    // console.log(isModalOpen, "isModalOpen");
  }, []);

 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="w-[90%] mx-auto ">
      <div>
        <h1 className="text-2xl text-center font-bold">Student Dashboard</h1>
      </div>
      <div className="flex flex-col gap-2">
        <YouTube data={apiData}/>
      </div>
    </div>
  );
};

export default StudentComp;

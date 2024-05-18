"use client"
import { fileUploader } from "@/libs/fileUpload";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BasicModal from "../Modal";
import { Switch, TextField } from "@mui/material";
import YouTube from "../TopicSkeleton";

const AdminCom = ({ user }) => {
  // console.log(user, "userhhh");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [otherLink, setOtherLink] = useState("");
  const [image, setImage] = useState();
  const [assignmentData, setAssignmentdata] = useState();
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState("")
  const [isShow, setIsShow] = useState(false)
  const [topicTilte, setTopicTitle] = useState("")
  const [topicDesc, setTopicDes] = useState("")
  const [topicVideo, setTopicVideo] = useState("")
  const [topicApiData, setTopicApiData] = useState()

  // console.log(isShow);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/add-assignment");
      const data = await axios.get("/api/topic")

      // console.log(data.data.data);

      setAssignmentdata(res.data.data);
      setTopicApiData(data.data.data);

    })();
  }, []);

  const AddAssign = async () => {
    if (!otherLink && !title && !desc && !image) {
      alert("enter req fields");
    }

    const imageUrl = await fileUploader(image);

    const obj = {
      title,
      desc,
      otherLink,
      image: imageUrl,
      user: user,
    };

    const res = await axios.post("/api/add-assignment", obj);

    // console.log(res);
  };

  const AddTopic = async()=>{

    if(!topicDesc && !topicTilte && !topicVideo){
      return alert("please fill req feilds")
    }

    const obj = {
      title : topicTilte,
      desc : topicDesc,
      videoUrl : topicVideo,
      user: user,
    };

    const res = await axios.post("/api/topic", obj);

    if(res.data){
      alert("Successfully Add")
      setTopicDes("")
      setTopicTitle("")
      setTopicVideo("")
    }

  }

  return (
    <div className="w-full ">
      <div className="w-[90%] mx-auto">
        <div>
          <h1 className="text-2xl text-center font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center justify-end">
          <h1>Assign Topic</h1>
          <Switch onChange={() => setIsShow(!isShow)} />
          <h1>Assign Assignment</h1>
        </div>

        {isShow ? <><div className="flex flex-col  gap-2 p-5">
          <TextField id="outlined-basic" sx={{
            width: "100%",
            marginTop: 2
          }} label="Title" variant="outlined" onChange={(e) => setTitle(e.target.value)} />
          <TextField id="outlined-basic" sx={{
            width: "100%",
            marginTop: 2
          }} label="Description" variant="outlined" onChange={(e) => setDesc(e.target.value)} />
          <TextField id="outlined-basic" sx={{
            width: "100%",
            marginTop: 2
          }} label="Other Link" variant="outlined" onChange={(e) => setOtherLink(e.target.value)} />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="rounded-lg p-2"
          />
          <button
            className="bg-green-500 w-fit px-5 rounded-md py-1"
            onClick={AddAssign}
          >
            Submit
          </button>
        </div>
          <div>
            <div className="w-full pt-3">
              <h1 className="text-3xl text-center">Assigments</h1>
              {assignmentData?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-[90%] mt-4 rounded-md mx-auto bg-red-400 flex justify-between px-3 items-center"
                  >
                    <div className="p-2 ">
                      <h1 className="text-xl">{item.title}</h1>
                      <p className="text-sm">Assign by {item.user.userName}</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => { setContent(item), setIsOpen(true) }} className="bg-green-500 px-3 py-1 rounded-md">
                        Edit
                      </button>
                      <BasicModal isOpen={isOpen} isClose={setIsOpen} content={content} />
                      <button className="bg-green-500 px-3 py-1 rounded-md">
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div></> :<>
          <div className="flex flex-col  gap-2 p-5">
            <TextField id="outlined-basic" sx={{
              width: "100%",
              marginTop: 2
            }} label="Topic Title" variant="outlined" onChange={(e) => setTopicTitle(e.target.value)} />
            <TextField id="outlined-basic" sx={{
              width: "100%",
              marginTop: 2
            }} label="Topic Description" variant="outlined" onChange={(e) => setTopicDes(e.target.value)} />
            <TextField id="outlined-basic" sx={{
              width: "100%",
              marginTop: 2
            }} label="Video Link" variant="outlined" onChange={(e) => setTopicVideo(e.target.value)} />

            <button
              className="bg-green-500 w-fit px-5 rounded-md py-1"
              onClick={AddTopic}
            >
              Submit
            </button>
          </div>
          <div className="">
            <h1 className="text-2xl font-bold text-center">{"Topic's"}</h1>
            <YouTube data={topicApiData}/>
          </div>
          </>
          }

      </div>
    </div>




  );
};

export default AdminCom;

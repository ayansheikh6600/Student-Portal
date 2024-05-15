import { fileUploader } from "@/libs/fileUpload";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BasicModal from "../Modal";

const AdminCom = ({ user}) => {
  // console.log(user, "userhhh");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [otherLink, setOtherLink] = useState("");
  const [image, setImage] = useState();
  const [assignmentData, setAssignmentdata] = useState();
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState("")

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/add-assignment");

      // console.log(res.data.data);

      setAssignmentdata(res.data.data);
      
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

    console.log(res);
  };

  return (
    <div className="w-full bg-blue-500">
      <div className="w-[90%] mx-auto">
        <div>
          <h1 className="text-2xl text-center font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex flex-col  gap-2 p-5">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Title"
            className="rounded-lg p-2"
          />
          <textarea
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            placeholder="description"
            className="rounded-lg p-2"
          />
          <input
            type="text"
            onChange={(e) => setOtherLink(e.target.value)}
            placeholder="Enter Other Link"
            className="rounded-lg p-2"
          />
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
                    <button onClick={()=>{setContent(item),setIsOpen(true)}} className="bg-green-500 px-3 py-1 rounded-md">
                      Edit
                    </button>
                    <BasicModal isOpen={isOpen} isClose={setIsOpen} content={content}/>
                    <button className="bg-green-500 px-3 py-1 rounded-md">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
 



  );
};

export default AdminCom;

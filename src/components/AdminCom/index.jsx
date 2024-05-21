"use client"
import { fileUploader } from "@/libs/fileUpload";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BasicModal from "../Modal";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Switch, TextField, Typography } from "@mui/material";
import YouTube from "../TopicSkeleton";
import { useRouter } from "next/navigation";

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
  const router = useRouter()

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

    router.refresh()
    // console.log(res);
  };

  const AddTopic = async () => {

    if (!topicDesc && !topicTilte && !topicVideo) {
      return alert("please fill req feilds")
    }

    const obj = {
      title: topicTilte,
      desc: topicDesc,
      videoUrl: topicVideo,
      user: user,
    };

    const res = await axios.post("/api/topic", obj);

    if (res.data) {
      alert("Successfully Add")
      setTopicDes("")
      setTopicTitle("")
      setTopicVideo("")
    }

    router.refresh()

  }

  return (
    <div className="w-full ">
      <div className="w-[90%] mx-auto">
        <div>
          <h1 className="text-2xl text-center font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex justify-between items-center">
          <div className="hover:text-blue-600 cursor-pointer" onClick={()=>router.push("/dashboard/student-signup")}>
            Create Senior Student Account
          </div>
          <div className="flex items-center justify-end">
          <h1>Assign Topic</h1>
          <Switch onChange={() => setIsShow(!isShow)} />
          <h1>Assign Assignment</h1>
          </div>
          
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
              {
                assignmentData? <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 1, sm: 4, md: 6, lg: 8 }}
                sx={{
                  display: { xs: "flex" },
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: { xs: "center", sm: "flex-start", md: "center" },
                  alignItems: "center",
                  padding: 2,
                }}
              >
                {assignmentData?.map((item, index) => {
                  return (
                    <Grid item xs={1} sm={2} md={2} key={index}>

                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          sx={{ height: 140 }}
                          image={item?.image}
                          title="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {item?.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item?.desc}
                          </Typography>
                          <span className='font-bold text-[12px]'>
                            Resource Link:
                            <Typography variant="body2" color="text.secondary" component="a" href={item?.otherLink} target='_blank'>
                              {item?.otherLink}
                            </Typography>

                          </span>
                        </CardContent>
                        <CardActions>
                          <Button variant='contained' onClick={() => { setContent(item), setIsOpen(true) }} size="small">Edit</Button>
                        </CardActions>
                      </Card>
                      <BasicModal isOpen={isOpen} isClose={setIsOpen} content={content} />
                    </Grid>
                    
                  );
                })}
              </Grid> :<YouTube/>
              }
              
            </div>
          </div></> : <>
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
            <YouTube data={topicApiData} />
          </div>
        </>
        }

      </div>
    </div>




  );
};

export default AdminCom;

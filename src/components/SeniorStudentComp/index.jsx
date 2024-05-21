"use client";
import React, { useEffect, useState } from "react";
import { MediaCard } from "..";
import YouTube from "../TopicSkeleton";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

const SeniorStdComp = () => {
  const [apiData, setApiData] = useState();
  const [isShow, setIsShow] = useState(false);
  const [candidateData, setcandidateData] = useState();
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/add-assignment");
      setApiData(res?.data?.data);
    })();
  }, []);

  const checking = async(id, turnInUserId) => {

    const remark = prompt("Enter Remarks")
    const storedUser = localStorage.getItem("user");
    const data = storedUser ? JSON.parse(storedUser) : null;

    console.log(id, turnInUserId);
    console.log(data?.user);
    console.log(remark);

    if(!remark && !id && turnInUserId){
      return alert("Invalids")
    }

    const turnInApi = await axios.put("/api/assignment-check", {
      checkerUser :data?.user,
      Remarks : remark,
      userId :turnInUserId
      
    }, {
      params: { id: id }
    })

    if(turnInApi.status == 200){
      router.refresh()
    }


  }

  return (
    <>
      <div className="w-full">
        <div className="text-center text-xl">Dashboard</div>

        {apiData ? (
          <Grid
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
            {apiData?.map((item, key) => (
              <Grid item xs={1} sm={2} md={2} key={key}>
                <MediaCard item={item} candidateShow={setIsShow} isShow={isShow} setcandidateData={setcandidateData} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <YouTube />
        )}

        {isShow ? <div className="w-full  text-center p-2 flex flex-col gap-2">
          <h1 className="text-xl">Candidate</h1>
          {candidateData?.turnIn?.map((item, index) => {
            return (
              <div key={index} className="flex justify-between px-3 items-center border-2 rounded-md">

                <div className="flex gap-3 items-center ">
                  <Avatar sx={{ width: 56, height: 56 }} src={item?.user?.imageURL} />
                  <div className="text-start">

                    <h1>UserName:{item?.user?.userName}</h1>
                    <h1>RollNo:{item?.user?.rollNo}</h1>
                    <h1>Time:{item?.user?.rollNo}</h1>
                    <Typography component="a" target="_blank" href={item?.repoLink}>{item?.repoLink}</Typography>
                  </div>
                </div>
                <div>

                  {!item?.isCheck ? <Button onClick={()=>checking(candidateData?._id, item?.user?._id)} size="small" variant="contained">Remarks</Button> :
                    <Button size="small"  disabled variant="contained">Checked</Button>}
                </div>
              </div>
            )
          })}

        </div> : ""}
      </div>
    </>
  );
};

export default SeniorStdComp;

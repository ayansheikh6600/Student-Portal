import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { Button, Modal, Skeleton, TextField, Typography } from "@mui/material";
import ViewModal from '../ViewModal/index';
import axios from "axios";
import { useRouter } from "next/navigation";

interface MediaProps {
  loading?: boolean;
  data?: any;
}

function Media(props: MediaProps) {
  const { loading = false, data } = props;

  const router = useRouter()
  const [content, setContent] = React.useState()
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [turnId, setTurnId] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user, setUser] = React.useState(Object)
  // const [test, setTest] = React.useState(false)
  let test = false


  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");

    const data = storedUser ? JSON.parse(storedUser) : null;
    // console.log(data?.user);

    setUser(data?.user)
  }, [])

  function BasicModal() {

    React.useEffect(() => {

    }, [])

    const [repoLink, setRepoLink] = React.useState("")
    const turnApiFun = async () => {

      if (!repoLink) {
        return alert("Please Repo Link")
      }

      const turnInApi = await axios.put("/api/add-assignment", {
        repoLink,
        user
      }, {
        params: { id: turnId }
      })

      // console.log(turnInApi);
      if (turnInApi.status == 200) {
        setRepoLink(" ")
        handleClose()
        router.refresh()
      }



    }

    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    return (
      <div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField id="outlined-basic" sx={{
              width: "100%"
            }} label="Enter your Repo Link" defaultValue={repoLink} variant="outlined" onChange={(e:any) => setRepoLink(e.target.value)} />
            <Button variant="contained" onClick={() => {
              turnApiFun()
            }}>Turn In</Button>
          </Box>
        </Modal>
      </div>
    );
  }

  return (
    <Grid
      container
      sx={{
        gap: 2,
        justifyContent: "center",
      }}
    >
      {(loading ? Array.from(new Array(5)) : data).map(
        (item: any, index: any) => (
          <Box
            key={index}
            sx={{
              marginRight: 0.5,
              width: 310,
              my: 5,
              boxShadow: 3,
              padding: 1,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {item ? (
              item?.videoUrl ? (
                <iframe
                  style={{ width: 310, height: 158 }}
                  src={item.videoUrl}
                />
              ) : (
                <a href={item?.image} target="_blank">
                  <img
                    src={item?.image}
                    style={{ width: 310, height: 158 }}
                    alt=""
                  />
                </a>
              )
            ) : (
              <Skeleton variant="rectangular" width={310} height={158} />
            )}
            {item ? (
              <Box sx={{ pr: 2 }}>
                <Typography
                  sx={{
                    fontSize: "h6.fontSize",
                    fontWeight: "bold",
                  }}
                  gutterBottom
                  variant="body2"
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "regular",
                  }}
                  display="block"
                  variant="caption"
                  color="text.secondary"
                >
                  {item.desc}
                </Typography>
                {item?.otherLink ? (
                  <>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "regular",
                      }}
                      display="block"
                      variant="caption"
                      color="text.secondary"
                      component="a"
                      href={item?.otherLink}
                    >
                      <a
                        href={item?.otherLink}
                        className="hover:text-blue-600"
                        target="_blank"
                      >
                        {item.otherLink}
                      </a>
                    </Typography>
                  </>
                ) : (
                  ""
                )}

                <div className="flex justify-between">
                  <Button variant="contained" onClick={() => { setContent(item), setIsModalOpen(!isModalOpen) }}>Visit</Button>
                  {item?.turnIn?.map((item:any)=>{
                    return(
                    item?.user?._id == user?._id ? test=true: test=false )
                    
                    
                  })}
                  {test?<Button variant="contained" disabled >Turn In</Button>: <Button variant="contained" onClick={()=>{setTurnId(item?._id), handleOpen()}} >Turn In</Button>}

                </div>
                <ViewModal isOpen={isModalOpen} isClose={setIsModalOpen} content={content} />
                <BasicModal />
              </Box>
            ) : (
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            )}
          </Box>
        )
      )}
    </Grid>
  );
}

export default function YouTube({ data }: any) {
  return (
    <Box sx={{ width: "100%" }}>
      {!data ? <Media loading /> : <Media data={data} />}
    </Box>
  );
}

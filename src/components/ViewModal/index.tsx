import { Box, Modal, TextField } from "@mui/material";
import React from "react";

export default function ViewModal({isOpen, isClose, content}:any) {

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
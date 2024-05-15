import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

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

export default function BasicModal({isOpen, isClose, content}) {
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
        <TextField id="outlined-basic" defaultValue={content?.title} sx={{
          width:"100%"
        }}  label="Title" variant="outlined" />
        <TextField id="outlined-basic" defaultValue={content?.desc} sx={{
          width:"100%",
          marginTop:2
        }}  label="Description" variant="outlined" />
        <TextField id="outlined-basic" defaultValue={content?.otherLink} sx={{
          width:"100%",
          marginTop:2
        }}  label="Other Link" variant="outlined" />

        <div className='w-full mt-3 bg-black'>
          <img width={100}  src={content?.image} alt="" />
        </div>

        <div className='w-full flex justify-between p-1 mt-3'>
          <button className='bg-blue-700 p-2 text-white rounded-md'>Update</button>
          <button className='bg-blue-700 p-2 text-white rounded-md' onClick={()=>handleClose()}>Cancel</button>
        </div>
        
        </Box>
      </Modal>
    </div>
  );
}

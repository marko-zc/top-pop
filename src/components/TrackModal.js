import React from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";


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

class TrackModal extends React.Component
{
    constructor(props)
    {
        super(props)
    }
    
    render()
    {

        const { isModalOpen, track, handleClose } = this.props;
        if(track){
            return (
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isModalOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
                <Fade in={isModalOpen}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            {track.title}
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary={"Chart position: " + track.position}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={"Song title: " + track.title}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={"Artist: " + track.artist.name}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={"Duration: " + Math.floor(track.duration / 60) + ":" + (track.duration % 60).toString().padStart(2, "0")}/>
                            </ListItem>
                        </List>
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Fade>
            </Modal>
            );
        }
    }
}

export default TrackModal;
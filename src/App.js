import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TrackModal from "./components/TrackModal";

const sortOptions = [
  {
    label: "Chart",
    value: "chart"
  },
  {
    label: "Longest",
    value: "longest"
  },
  {
    label: "Shortest",
    value: "shortest"
  }
]


class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: null,
      selectedSortOption: "chart",
      isModalOpen: false,
      selectedTrack: null
    };
    this.changeSort = this.changeSort.bind(this);
  }
  async componentDidMount()
    {
      await fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart")
      .then(response => response.json())
      .then(
        (data) => {
          this.setState({
              isLoaded: true,
              tracks: data.tracks.data,
              error: data.error
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )


    }

    changeSort = (e) => {
      this.setState({ selectedSortOption: e.target.value });
      if (e.target.value === "chart"){
        this.setState({ tracks: this.state.tracks.sort((a, b) => {return a.position - b.position})})
      } else if (e.target.value === "longest") {
        this.setState({ tracks: this.state.tracks.sort((a, b) => {return b.duration - a.duration})})
      } else if (e.target.value === "shortest") {
        this.setState({ tracks: this.state.tracks.sort((a, b) => {return a.duration - b.duration})})
      }
    }
    
    handleOpen = (track) => {
      this.setState({
        selectedTrack: track,
        isModalOpen: true
      });
    };
  
    handleClose = () => {
      this.setState({
        isModalOpen: false
      });
  };
  
  render()
  {
    const { error, isLoaded, tracks, selectedTrack, isModalOpen } = this.state;

    if(error) {
      return <div>Error: {error.message}</div>
    } else if (!isLoaded){
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <h1>Top tracks:</h1>
          <label htmlFor="sort">Sort by: </label>
          <select defaultValue={this.state.selectedSortOption} onChange={this.changeSort}>
            {sortOptions.map((sortOption) => (
              <option value={sortOption.value}>{sortOption.label}</option>
            ))}
          </select>

        <Box>
          <List>
            {tracks.map((track) => 
              <ListItem>
                <ListItemButton>
                  <ListItemText primary={track.title} onClick={() => this.handleOpen(track)} />
                </ListItemButton>
              </ListItem>)}
          </List>
        </Box>
        <TrackModal isModalOpen={isModalOpen} track={selectedTrack} handleClose={this.handleClose} />
          {/* <Modal
           track={selectedTrack}
           open={isModalOpen}
           onClose={this.handleClose}
           aria-labelledby="modal-modal-title"
           aria-describedby="modal-modal-description"
           /> */}
        </div>
      )
    }
  }
}

export default App;

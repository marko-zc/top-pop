import React from "react";

import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { Box } from "@mui/system";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
      await fetch("https://api.deezer.com/chart")
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
        <Container maxWidth="sm">
          <Typography color="TextPrimary" variant="h2" align="center">Top tracks:</Typography>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Sort by:</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={this.state.selectedSortOption}
              onChange={this.changeSort}
              label="Sort"
            >
              {sortOptions.map((sortOption) => (
                <MenuItem key={sortOption.value} value={sortOption.value}>{sortOption.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <List>
              {tracks.map((track) => 
                <ListItem key={track.id}>
                  <ListItemButton>
                    <ListItemText primary={track.title} onClick={() => this.handleOpen(track)} />
                  </ListItemButton>
                </ListItem>
                )}
            </List>
          </Box>
          <TrackModal isModalOpen={isModalOpen} track={selectedTrack} handleClose={this.handleClose} />
        </Container>
      )
    }
  }
}

export default App;
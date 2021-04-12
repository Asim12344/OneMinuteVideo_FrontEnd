import React, { Component } from 'react';
import './Home.css';
import { connect } from 'react-redux';
// import * as actionCreators from '../../store/actions/index';
import Loader from "react-loader-spinner";
import axios from '../../axios';
import { Tooltip, OverlayTrigger } from "react-bootstrap";
// import Alert from '../../components/Alert'
import ReactPlayer from "react-player";
import { ReactVideo } from "reactjs-media";
import ReactVideoTrimmer from "react-video-trimmer";
import "react-video-trimmer/dist/style.css";


class Home extends Component {

    state = {
        valueSelect: 0,
        hideVideo: true,
        name: "",
        selectedFile: null,
        audioList:[],
        file_path: ""
    }

    componentDidMount(){
        axios.get('api/audio/list', null)
        .then(res => {
          this.setState({audioList:res['data'].audios_file_list})
        })
        .catch(err => {
            console.log("error = " , err)
        })           
    }

    loadfile = (e) => {
        const realFileBtn = document.getElementById("real-file");
        realFileBtn.click();
        
    }

    handleChangeFile  = (e) => {
        const realFileBtn = document.getElementById("real-file");
        const customTxt = document.getElementById("custom-text");
        // const video = document.querySelector("video");
        if (realFileBtn.value){
            customTxt.innerHTML = realFileBtn.value.match(
                    /[/\\]([\w\d\s.\-()]+)$/
                    )[1];
            this.setState({
                selectedFile: e.target.files[0],
                name: e.target.files[0].name
            })
        }
        else{
            customTxt.innerHTML = "No file chosen, yet.";
        }
    }
    
    handleSubmit = (e) => {
        const video = document.querySelector("video");
        e.preventDefault();
        const customTxt = document.getElementById("custom-text")
        const realFileBtn = document.getElementById("real-file");

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        let name = this.state.name
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        data.append('name', name)
        data.append('audio', this.state.valueSelect)
        console.log(data)

        axios.post('api/video/create',data, config)
        .then(res => {
            console.log(res)
            // video.src = res['data'].path
            customTxt.innerHTML = "No file chosen, yet.";
            realFileBtn.value = ""
            this.setState({selectedFile: null,name: "" , file_path:res['data'].path , hideVideo:false});
        })
        .catch(err => {
            console.log("error = " , err)
        })
    }

    handleChangeSelect = event => {
        this.setState({ valueSelect: event.target.value });
    };

    render(){
        console.log("path = " , this.state.file_path)
        return(
            <div>
                <div className="container m-t-50">
                    <div className="row">
                        <div className="col-md-5">
                            <input type="file"  accept="video/mp4,video/x-m4v,video/*" hidden="hidden" id="real-file" onChange={(e) => this.handleChangeFile(e)}/>     
                            <button onClick={this.loadfile} className={"btn btn-primary height-45 margin-right-7"} > Load media File(s)</button>    
                            <span id="custom-text">No file chosen, yet.</span> 
                        </div>
                        <div className="col-md-4">
                            <select className="form-control border height-45" value={this.state.valueSelect} onChange={this.handleChangeSelect}>
                                <option value={0}>Select a audio</option>
                                {this.state.audioList.map((el,index) => {
                                    return( <option key={index} value={el}>{el}</option>)
                                })}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <button onClick={this.handleSubmit} className="btn btn-primary pull-right">Submit</button>
                        </div>
                    </div>
                    
                    <div id="video" className="m-t-50">
                        
                       
                        <video src={this.state.file_path} width="800" controls hidden={this.state.hideVideo}/>
                        {/* <ReactPlayer
                            url={this.state.file_path}
                            className='react-player'
                            width='100%'
                            height='100%'
                            controls
                            loop
                        /> */}
                        {/* <div>
                        <ReactVideoTrimmer
                            loadingFFMPEGText="Loading required libs..."
                            timeLimit={30}
                            timeRange={5}
                            showEncodeBtn
                        />
                        </div>; */}
                        {/* <ReactVideoTrimmer loadingFFMPEGText="Loading required libs..."
                                            timeLimit={60}
                                            timeRange={0}
                                            showEncodeBtn
                        /> */}
                    </div>
                    

                </div>
            </div>
        )
    }
}

export default Home
import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';
import video from './video.mp4';
import classnames from 'classnames';
import "video-react/dist/video-react.css";
import './App.css';



class App extends Component {

    constructor() {
        super();
        this.state = {
            showPrescreen: true,
        }

        this.handlePrescreenClick = this.handlePrescreenClick.bind(this);
    }

    handlePrescreenClick() {
        this.setState({
            showPrescreen: false,
        }, () => {
            this.refs.player.play();
        });
    }

    renderVideo() {
        return (
            <Player
                ref="player"
                preload="auto"
                playsInline
                src={video}
            >
                <ControlBar autoHide/>
            </Player>
        );
    }

    renderPrescreen() {
        const componentClasses = classnames({
            prescreen: true, 
            hidden: !this.state.showPrescreen,
        });

        return (
            <div className={componentClasses}
                onClick={this.handlePrescreenClick}
            />
        );
    }

  render() {
    return (
        <div className="app-container">
            {this.renderVideo()}
            {this.renderPrescreen()}
        </div>
    );
  }
}

export default App;

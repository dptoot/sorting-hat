import React, { Component } from 'react';
import classnames from 'classnames';
import './App.css';

import * as gryffindor from './audio/houses/gryffindor';
import * as stalling from './audio/stalling';
import * as traits from './audio/traits';

const script = [
    stalling.stalling1,
    traits.trait0a,
    gryffindor.trait0,
    traits.trait0b,
    gryffindor.house,
];

class App extends Component {

    constructor() {
        super();
        this.state = {
            showPrescreen: true,
            scriptPlaying: false,
            script: script,
            scriptIndex: 0,
            // audioClip: paths.houses.gryffindor,
        }

        this.handlePrescreenClick = this.handlePrescreenClick.bind(this);
    }

    handlePrescreenClick() {
        this.setState({
            showPrescreen: false,
            scriptPlaying: true,
        }, () => {
            this.handleAudioClipStart(this.state.script[0]);
        });
    }

    handleAudioClipStart(src) {
        this.sound = new Audio(src);
        this.sound.onended = () => {
            this.handleAudioClipEnd();
        }
        this.sound.play();
    }

    handleAudioClipEnd() {
        if (this.state.script.length - 1 === this.state.scriptIndex) {
            this.setState({
                showPrescreen: true,
            })
        } else {
            this.handleNextScene(this.state.scriptIndex + 1);
        }
    }

    handleNextScene(scriptIndex) {
        this.setState({
            scriptIndex: scriptIndex,
        }, () => {
            this.handleAudioClipStart(this.state.script[scriptIndex]);
        });
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
            {this.renderPrescreen()}
        </div>
    );
  }
}

export default App;

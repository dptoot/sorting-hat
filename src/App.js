import React, { Component } from 'react';
import classnames from 'classnames';
import './App.css';

import houses from './audio/houses';
import * as stalling from './audio/stalling';
import * as traits from './audio/traits';
import * as intros from './audio/intros';
import * as success from './audio/success';
import theme from './audio/theme.mp3';

const selectionLimit = 4;

const clipCounts = {
    intros: 6,
    stalling: 5,
    success: 5,
    traits: 4,
    houses: {
        gryffindor: 4,
        slytherin: 6,
        ravenclaw: 6,
        hufflepuff: 6,
    }
}

const houseCounts = {
    gryffindor: 0,
    slytherin: 0,
    ravenclaw: 0,
    hufflepuff: 0,
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends Component {

    constructor() { 
        super();
        this.state = {
            showPrescreen: true,
            scriptPlaying: false,
            script: null,
            scriptIndex: 0,
        };

        this.sound = new Audio(null);
        this.theme = new Audio(theme);

        this.sound.onended = () => {
            this.handleAudioClipEnd();
        }

        this.handleSceneStart = this.handleSceneStart.bind(this);
    }

    getSelectedHouseName() {
        const houseNames = Object.keys(houses);
        const selectedHouse = houseNames[getRandomInt(0, houseNames.length)];

        if (houseCounts[selectedHouse] < selectionLimit) {
            return selectedHouse;
        } else {
            return this.getSelectedHouseName();
        }
    }

    getRandomHouseTrait(houseName) {
        return houses[houseName][`trait${getRandomInt(0, clipCounts.houses[houseName])}`]
    }

    getTraits(houseName) {
        let wizardTraits;
        const randomInt = getRandomInt(0, clipCounts.traits);
        switch (randomInt) {
            case 0:
                wizardTraits = [
                    traits.trait0a,
                    this.getRandomHouseTrait(houseName),
                    traits.trait0b,
                    traits.trait0c,
                    this.getRandomHouseTrait(houseName),
                    traits.trait0d,
                ]
                break;
            case 1:
                const houseTrait = this.getRandomHouseTrait(houseName)
                wizardTraits = [
                    traits.trait1a,
                    houseTrait,
                    traits.trait1b,
                    houseTrait,
                    traits.trait1c,
                ]
                break;
            default: 
                wizardTraits = [
                    traits[`trait${randomInt}`],
                    this.getRandomHouseTrait(houseName),
                ]
        }

        return wizardTraits;
    }

    getRandomClip(type) {
        return `${type}${getRandomInt(0, clipCounts[type])}`;
    }

    getScript(houseName) {
        return [
            intros[this.getRandomClip('intros')],
            stalling[this.getRandomClip('stalling')],
            ...this.getTraits(houseName),
            success[this.getRandomClip('success')],
            houses[houseName].name,
        ];
    }

    handleSceneStart() {
        if (!this.state.scriptPlaying) {
            // Select a house
            const selectedHouse = this.getSelectedHouseName();

            // Increase house count
            houseCounts[selectedHouse] += 1

            this.setState({
                ...this.state,
                showPrescreen: false,
                scriptPlaying: true,
                script: this.getScript(selectedHouse),
        }, () => {
                this.theme.play();
                this.handleAudioClipStart(this.state.script[0]);
            });
        }
    }

    handleSceneEnd() {
        this.handleThemeFadeOut();
        this.setState({
            showPrescreen: true,
            scriptPlaying: false,
            scriptIndex: 0,
        });
    }

    handleAudioClipStart(src) {
        this.sound.src = src;
        this.sound.play();
    }

    handleAudioClipEnd() {
        if (this.state.script.length - 1 === this.state.scriptIndex) {
            this.handleSceneEnd();
        } else {
            this.handleNextScene(this.state.scriptIndex + 1);
        }
    }

    handleThemeFadeOut() {
        let vol = 1;
        let interval = 200; // 200ms interval
        if (this.theme.volume == 1) {
            var intervalID = setInterval(() => {
            // Reduce volume by 0.05 as long as it is above 0
            // This works as long as you start with a multiple of 0.05!
            if (vol > 0) {
                vol -= 0.05;
                // limit to 2 decimal places
                    // also converts to string, works ok
                    this.theme.volume = vol.toFixed(2);
            } else {
                // Stop the setInterval when 0 is reached
                clearInterval(intervalID);
                this.theme.pause();
                this.theme.currentTime = 0;
                this.theme.volume = 1;
            }
            }, interval);
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
                onClick={this.handleSceneStart}
            />
        );
    }

  render() {
    console.log('state: ', this.state);
    console.log('house counts: ', houseCounts);
    return (
        <div className="app-container">
            <div className="hat" />
            {this.renderPrescreen()}
        </div>
    );
  }
}

export default App;

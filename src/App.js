import React, { Component } from 'react';
import classnames from 'classnames';
import './App.css';

import houses from './audio/houses';
import * as stalling from './audio/stalling';
import * as traits from './audio/traits';
import * as intros from './audio/intros';
import * as success from './audio/success';
console.log("houses", houses);

const houseLimit = 4;
const introCount = 6;
const stallingCount = 5;
const successCount = 5;
const traitCounts = {
    gryffindor: 4,
    slytherin: 6,
    ravenclaw: 6,
    hufflepuff: 6,
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
            houses: {
                gryffindor: 0,
                slytherin: 0,
                ravenclaw: 0,
                hufflepuff: 0,
            }
        }

        this.handlePrescreenClick = this.handlePrescreenClick.bind(this);
    }

    getHouse() {
        const houses = Object.keys(this.state.houses);
        const house = houses[getRandomInt(1, houses.length)];

        if (this.state.houses[house] < houseLimit) {
            return house;
        } else {
            return this.getHouse();
        }
    }

    getScript(house) {
        return [
            intros[`intro${getRandomInt(0, introCount)}`],
            stalling[`stalling${getRandomInt(0, stallingCount)}`],
            // traits.trait0a,
            // houses.trait3,
            // traits.trait0b,
            success[`success${getRandomInt(0, successCount)}`],
            houses[house].name,
        ];
    }

    handlePrescreenClick() {
        if (!this.state.scriptPlaying) {
            // Select a house
            const house = this.getHouse();


            this.setState({
                ...this.state,
                showPrescreen: false,
                scriptPlaying: true,
                script: this.getScript(house),
                houses: {
                    ...this.state.houses,
                    [house]: this.state.houses[house] + 1,
                }
        }, () => {
                this.handleAudioClipStart(this.state.script[0]);
            });
        }
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
            this.handleEndScript();
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

    handleEndScript() {
        this.setState({
            showPrescreen: true,
            scriptPlaying: false,
            scriptIndex: 0,
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
    console.log(this.state);
    return (
        <div className="app-container">
            <div className="hat" />
            {this.renderPrescreen()}
        </div>
    );
  }
}

export default App;

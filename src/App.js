import React, { Component } from 'react';
import classnames from 'classnames';
import Sound from 'react-sound';
import './App.css';

const paths = {
    houses: {
        gryffindor: 'audio/houses/gryffindor/gryffindor.mp3'
    }
}



class App extends Component {

    constructor() {
        super();
        this.state = {
            showPrescreen: true,
            script: [],
            scriptIndex: 0,
            audioClip: paths.houses.gryffindor,
        }

        this.handlePrescreenClick = this.handlePrescreenClick.bind(this);
    }


    componentDidMount() {
        
    }

    handlePrescreenClick() {
        this.handleScriptChange(0, true)
    }

    handleScriptChange(scriptIndex, shouldPlay) {
        this.setState({
            showPrescreen: false,
            scriptIndex: scriptIndex,
        }, () => {
            
        });
    }

    renderSound() {
        const props = {
            url: this.state.audioClip,
            autoLoad: true,
        }

        return this.state.audioClip && (
            <Sound {...props} />
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
            {this.renderPrescreen()}
            {this.renderSound()}
        </div>
    );
  }
}

export default App;

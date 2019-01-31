import React, {Component} from 'react';
import GooglyEyes from './components/googlyEyes';
import './App.css';
import mds from './MDS.png'


class App extends Component {
    takePicture() {
        this.refs.googlyEye.picture();
    }

    showInfo() {
        let info = document.querySelector(".info");
        info.classList.add("open");
    }

    deleteInfo() {
        let info = document.querySelector(".info");
        info.classList.remove("open");

    }

    render() {
        return (
            <div className="App">
                <div onClick={this.showInfo} className="txt-info">En savoir plus</div>
                <div className="info">
                    <div className="mds"><img src={mds}/></div>
                    <p> - Réalisation dans un cadre scolaire - </p>
                    <p> -- By Florian Thubé -- </p>
                    <div onClick={this.deleteInfo} className="croix">X</div>
                </div>
                <button onClick={() => this.takePicture()}>PICTURE</button>

                <GooglyEyes ref={"googlyEye"}/>
            </div>
        );
    }
}

export default App;

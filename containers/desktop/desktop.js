import React from 'react';
import autoBind from 'auto-bind';
// import cx from 'classnames';
import { compose } from 'redux';
import styles from './styles.scss';

class Desktop extends React.PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.ref = {
      canvas: React.createRef(),
      audio: React.createRef(),
    };
    this.state = {
      audioContextCreated: false,
    };
  }

  componentDidMount() {

  }

  dance() {
    const audioObj = this.ref.audio.current;
    const canvasObj = this.ref.canvas.current;
    const vudio = new Vudio(audioObj, canvasObj, {
      effect: 'circlebar', // waveform, circlewave, circlebar, lighting (4 visual effect)
      accuracy: 128, // number of freqBar, must be pow of 2.
      width: 416, // canvas width
      height: 416, // canvas height
      circlebar: {
        maxHeight: 80,
        minHeight: -50,
        spacing: 1,
        color: '#51b13f',
        shadowBlur: 5,
        shadowColor: '#afff34',
        fadeSide: true,
        prettify: true,
        particle: false,
        maxParticle: 1000,
        circleRadius: 128,
        showProgress: false,
      },
    });
    vudio.dance();
    this.setState({ audioContextCreated: true });
  }

  playAudio() {
    const { audioContextCreated } = this.state;
    const audioObj = this.ref.audio.current;
    audioObj.load();
    const audioPromise = audioObj.play();
    if (audioPromise !== undefined) {
      audioPromise
        .then(_ => {
          // autoplay started
        })
        .catch(err => {
          // catch dom exception
          console.info(err);
        });
    }
    if (!audioContextCreated) {
      this.dance();
    }
  }

  pauseAudio() {
    const audioObj = this.ref.audio.current;
    audioObj.pause();
  }

  render() {
    return (
      <div className={styles.container} >
        Desktop Version
        <canvas id="canvas" ref={this.ref.canvas} className={styles.canvas} ></canvas >
        <audio src="/audio/sample.mp3" ref={this.ref.audio} />
        <button onClick={this.playAudio} >PLAY</button >
        <button onClick={this.pauseAudio} >PAUSE</button >
      </div >
    );
  }
}

export default compose()(Desktop);

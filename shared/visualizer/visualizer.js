import React, { Fragment, PureComponent } from 'react';
// import cx from 'classnames';
import autoBind from 'auto-bind';
// import PropTypes from 'prop-types';
import Vudio from 'vudio/vudio';
import styles from './styles.scss';

class AudioVisualizer extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.ref = {
      canvas: React.createRef(),
      audio: React.createRef(),
    };
  }

  componentDidMount() {
    this.dance();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { play } = this.props;
    if (play !== prevProps.play) {
      this.togglePlayState();
    }
  }

  dance() {
    const audioObj = this.ref.audio.current;
    const canvasObj = this.ref.canvas.current;
    this.vudio = new Vudio(audioObj, canvasObj, {
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
    this.vudio.dance();
    audioObj.play();
  }

  togglePlayState() {
    const { play } = this.props;
    if (play) {
      this.play();
    } else {
      this.pause();
    }
  }

  pause() {
    const audioObj = this.ref.audio.current;
    audioObj.pause();
    this.vudio.pause();
    this.setState({ playing: '' });
  }

  play() {
    const audioObj = this.ref.audio.current;
    this.vudio.dance();
    audioObj.play();
  }

  render() {
    const { src } = this.props;
    return (
      <Fragment>
        <canvas ref={this.ref.canvas} className={styles.canvas} ></canvas >
        <audio src={src} ref={this.ref.audio} className={styles.audio} />
      </Fragment>
    );
  }
}

AudioVisualizer.propTypes = {};

export default AudioVisualizer;

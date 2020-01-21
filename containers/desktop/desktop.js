import React from 'react';
import autoBind from 'auto-bind';
// import cx from 'classnames';
import { compose } from 'redux';
import { AudioVisualizer } from '../../shared';
import styles from './styles.scss';

class Desktop extends React.PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      play: false
    };
  }

  togglePlayState(chptr) {
    const { play, src } = this.state;
    if (play && src === chptr.src) {
      this.pause();
    } else {
      this.play(chptr);
    }
  }

  pause() {
    this.setState({
      play: false,
    });
  }

  play(chptr) {
    const { src } = this.state;
    if (src !== chptr.src) {
      this.setState({
        src: undefined,
        play: false,
      });
    }
    setTimeout(() => {
      this.setState({
        src: chptr.src,
        play: true
      });
    });
  }

  render() {
    const { viewer, chapters } = this.props;
    const { play, src } = this.state;
    return (
      <div className={styles.container} >
        <div >Desktop Version</div >
        <h1 >Welcome Mr. {viewer}<br />
             What would you like to know</h1 >
        <ul >
          {chapters.map(chptr => (
            <li key={chptr.id} onClick={() => this.togglePlayState(chptr)} >{chptr.text}</li >
          ))}
        </ul >
        <div className={styles.visualizer} >
          {src && <AudioVisualizer src={src} play={play} />}
        </div >
      </div >
    );
  }
}

export default compose()(Desktop);

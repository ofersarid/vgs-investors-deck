import React from 'react';
import autoBind from 'auto-bind';
import cx from 'classnames';
import { compose } from 'redux';
import { AudioVisualizer } from '../../shared';
import { GA } from '../../services';
import styles from './styles.scss';
import { Play } from 'styled-icons/boxicons-regular/Play';
import { Pause } from 'styled-icons/boxicons-regular/Pause';

class Desktop extends React.PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      play: false
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    if (!window.GA_INITIALIZED) {
      GA.init();
      window.GA_INITIALIZED = true;
    }
    // GA.setViewer(userId);
    GA.viewedPage(userId);
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
    const { userId } = this.props;
    this.setState({
      play: false
    });
    GA.pauseEpisode(userId);
  }

  play(chptr) {
    const { src } = this.state;
    const { userId } = this.props;
    if (src !== chptr.src) {
      this.setState({
        src: undefined,
        play: false
      });
    }
    setTimeout(() => {
      this.setState({
        src: chptr.src,
        play: true
      });
      GA.playEpisode(userId);
    });
  }

  render() {
    const { viewer, chapters } = this.props;
    const { play, src } = this.state;
    return (
      <div className={styles.container} >
        <div className={styles.center} >
          <h1 >Welcome Mr. {viewer}<br />
               What would you like to know</h1 >
          <div className={styles.grid2Col} >
            <ul className={styles.chapters} >
              {chapters.map(chptr => (
                <li
                  key={chptr.id}
                  onClick={() => this.togglePlayState(chptr)}
                  className={cx({ [styles.active]: src === chptr.src })}
                >
                  <span>{chptr.text}</span>
                  {src === chptr.src ? play ? <Play /> : <Pause /> : null}
                </li >
              ))}
            </ul >
            <div className={styles.visualizer} >
              {src && <AudioVisualizer src={src} play={play} />}
            </div >
          </div >
        </div >
      </div >
    );
  }
}

export default compose()(Desktop);

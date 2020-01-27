import React from 'react';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'next/router';
import styles from './styles.scss';
import { device } from '../services';
import { Desktop, Mobile } from '../containers';

let prevFrame = 1;

const Index = ({ router, isServer }) => {
  // const data = useSelector(state => reactor.selectors.pageData(state, 'test page'));
  const isMobile = useSelector(device.selectors.type) === 'mobile';
  const frame = parseInt(router.query.frame);
  const forward = frame >= prevFrame;
  const animation = frame !== prevFrame ? {
    [styles.comeUp]: forward,
    [styles.comeDown]: !forward
  } : {};
  prevFrame = frame;
  console.log(router.query.viewer);
  const chapters = [{
    id: '123',
    text: 'What is vascular engineering?',
    src: '/audio/sample.mp3',
  }, {
    id: '234',
    text: 'Why it matters?',
    src: '/audio/sample-1.mp3',
  }];
  return isMobile ? <Mobile animation={animation} forward={forward} frame={frame} />
    : <Desktop chapters={chapters} animation={animation} viewer={router.query.viewer} userId={router.query.id} />;
};

export default compose(withRouter, connect())(Index);

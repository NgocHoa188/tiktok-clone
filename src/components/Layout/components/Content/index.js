import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { MusicIcon, TickIcon } from '~/components/Icons';
import styles from './Content.module.scss';
import { useRef, useEffect } from 'react';
import MusicPlayer from './MusicPlayer';
import VideoAction from './VideoAction';
import { clientAddress } from '~/utils/client';

const cx = classNames.bind(styles);

function Content({ data }) {
    const videoRef = useRef();
    useEffect(() => {
        let options = {
            rootMargin: '0px',
            threshold: [0.25, 0.75],
        };

        let handlePlay = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current.play();
                } else {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
            });
        };

        let observer = new IntersectionObserver(handlePlay, options);

        observer.observe(videoRef.current);
    });
    return (
        <div className={cx('wrapper-account')}>
            <Link to={`/@${data.FullName}`} style={{ height: '72px' }}>
                <img className={cx('avatar-menu')} alt={data.FullName} src={clientAddress + data.Avatar} />
            </Link>
            <div className={cx('content')}>
                <div className={cx('info')}>
                    <Link className={cx('content-name')} to={`/@${data.FullName}`}>
                        <h3 className={cx('name')}>
                            {data.FullName} {data.Tick && <TickIcon />}
                        </h3>
                        <h4 className={cx('nickname')}>{data.NickName} </h4>
                    </Link>
                    <div className={cx('video')}>
                        <p className={cx('description')}>{data.Description}</p>
                        <p className={cx('music')}>
                            {/* <FontAwesomeIcon icon={faMusic} className={cx('music-icon')} /> */}
                            <MusicIcon />
                            {data.Description}
                        </p>
                    </div>
                </div>
                <div className={cx('videos-wrapper')}>
                    <MusicPlayer
                        videoRef={videoRef}
                        src={clientAddress + data.VideoPath}
                        time={data.Length}
                        data={data}
                    />
                    <VideoAction data={data} videoRef={videoRef} />
                </div>
            </div>
        </div>
    );
}

export default Content;

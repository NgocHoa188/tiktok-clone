import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { useUserAuth } from '~/context/UserAuthContext';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';

import { handleTime } from '~/utils/handleNumber';
import { VolumeIcon, VolumeMute } from '~/components/Icons';

const cx = classNames.bind(styles);

function MusicPlayer({ videoRef, src, time, data }) {
    const { user } = useUserAuth();
    let navigate = useNavigate();

    const [play, setPlay] = useState(true);
    const [mute, setMute] = useState(true);
    const [timer, setTimer] = useState(0);
    const interval = useRef();

    useEffect(() => {
        if (timer < time) {
            handleStart();
        }

        return () => {
            handleStop();
        };
    }, [timer]);
    const handleStart = () => {
        interval.current = setInterval(() => {
            setTimer(Math.floor(videoRef.current.currentTime));
        }, 1000);
    };
    const handleStop = () => {
        clearInterval(interval.current);
    };
    return (
        <>
            <video
                muted={mute}
                ref={videoRef}
                className={cx('video-content')}
                src={src}
                onClick={() => {
                    var dataAddTime = {
                        ...data,
                        video: videoRef.current.currentTime,
                        userId: user ? user.uid : '',
                    };
                    navigate(`/video/@${data.FullName}`, { state: dataAddTime });
                }}
            />

            <div
                className={cx('video-play', 'videos-control')}
                onClick={() => {
                    if (play) {
                        setPlay(false);
                        videoRef.current.pause();
                        handleStop();
                    } else {
                        setPlay(true);
                        videoRef.current.play();
                        handleStart();
                    }
                }}
            >
                {/* {play ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />} */}
                {play ? <PauseOutlined /> : <CaretRightOutlined />}
            </div>
            <div
                className={cx('video-volume', 'videos-control')}
                onClick={() => {
                    setMute(!mute);
                }}
            >
                {mute ? <VolumeMute /> : <VolumeIcon />}
            </div>
            <div className={cx('time')}>
                {handleTime(timer)}/{handleTime(time)}
            </div>
        </>
    );
}

export default MusicPlayer;

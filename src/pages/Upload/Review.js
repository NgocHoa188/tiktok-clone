import clasnames from 'classnames/bind';
import { CheckCircleOutlined } from '@ant-design/icons';

import styles from './Review.module.scss';

const cx = clasnames.bind(styles);

function Review({ file, inputRef }) {
    const video = URL.createObjectURL(file);
    return (
        <>
            <div className={cx('outside-border')}>
                <video
                    id={cx('video-preview')}
                    muted={true}
                    autoPlay={true}
                    style={{
                        width: '100%',
                        position: 'absolute',
                        height: '100%',
                        objectFit: 'fill',
                        borderRadius: '35px',
                    }}
                    src={video}
                ></video>
                <div className={cx('inside-border')}>
                    <div className={cx('camera')}>
                        <div className={cx('camera-dot')}>
                            <div className={cx('camera-dot-2')}></div>
                            <div className={cx('camera-dot-3')}></div>
                        </div>
                        <div className={cx('camera-speaker')}></div>
                    </div>

                    <div className={cx('t-r-info')}>
                        <div className={cx('battery')}>
                            <div className={cx('bar')}></div>
                            <div className={cx('dot')}></div>
                        </div>
                    </div>

                    <div className={cx('bottom-line')}></div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginTop: '18px',
                        borderRadius: '12px',
                        border: '1px solid rgba(22, 24, 35, 0.12)',
                        padding: '13px',
                    }}
                >
                    <span style={{ flex: 1, fontWeight: 400, fontSize: '1.2rem' }}>
                        <CheckCircleOutlined /> {file.name}
                    </span>
                    <span className={cx('change-video')} onClick={() => inputRef.current.click()}>
                        Change Video
                    </span>
                </div>
            </div>
        </>
    );
}
export default Review;

import { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Switch } from 'antd';
import clasnames from 'classnames/bind';
import { CloudUploadOutlined, CheckCircleOutlined } from '@ant-design/icons';

import ButtonOr from '~/components/Button';
import styles from './Upload.module.scss';
import Review from './Review';
import Progress from './Progress';

const cx = clasnames.bind(styles);

function Upload() {
    const inputRef = useRef();
    const contentCopyRef = useRef();

    const [caption, setCaption] = useState('');
    const [video, setVideo] = useState(null);
    const [preview, setPreview] = useState(false);

    const handleMaxLength = () => {
        contentCopyRef.current.style.opacity = 1;
        contentCopyRef.current.style.transition = 'opacity 500ms';
        setTimeout(function () {
            contentCopyRef.current.style.opacity = 0;
            contentCopyRef.current.style.transition = 'opacity 500ms';
        }, 1500);
    };

    const handleCaption = (e) => {
        if (caption.trim().length + 1 <= 150) {
            setCaption(e.target.value);
        } else {
            handleMaxLength();
        }
    };

    const handleChooseVideo = (e) => {
        const file = e.target.files[0];
        setVideo(file);

        e.target.value = null;
        setPreview(false);
    };

    const handlePreview = () => {
        setPreview(true);
    };

    return (
        <div className={cx('wrapper')}>
            <h2 style={{ fontWeight: '700', marginBottom: '0px' }}>Upload video</h2>
            <span style={{ fontSize: '1.8rem', color: 'rgba(22,24,35,0.5)' }}>Post a video to your account</span>
            <div className={cx('content')}>
                {video ? (
                    <>
                        {preview ? (
                            <>
                                <Review file={video} inputRef={inputRef}></Review>
                            </>
                        ) : (
                            <div className={cx('video-content')}>
                                <Progress file={video} handlePreview={handlePreview}></Progress>
                            </div>
                        )}
                    </>
                ) : (
                    <div className={cx('video-content')} onClick={() => inputRef.current.click()}>
                        <CloudUploadOutlined style={{ fontSize: '4rem', color: 'rgb(176,176,180)' }} />
                        <span style={{ marginTop: '24px', fontWeight: 700, fontSize: '1.8rem' }}>
                            Select video to upload
                        </span>
                        <span
                            style={{
                                fontSize: '1.4rem',
                                color: 'rgba(22,24,35,0.5)',
                                marginTop: '4px',
                                marginBottom: '24px',
                            }}
                        >
                            or drag and drop a file
                        </span>
                        <span style={{ fontSize: '1.4rem', marginBottom: '6px', color: 'rgba(22,24,35,0.5)' }}>
                            MP4 or WebM
                        </span>
                        <span style={{ fontSize: '1.4rem', marginBottom: '6px', color: 'rgba(22,24,35,0.5)' }}>
                            720x1280 resolution or higher
                        </span>
                        <span style={{ fontSize: '1.4rem', marginBottom: '6px', color: 'rgba(22,24,35,0.5)' }}>
                            Up to 10 minutes
                        </span>
                        <span style={{ fontSize: '1.4rem', color: 'rgba(22,24,35,0.5)' }}>Less than 2 GB</span>
                        <Button
                            type="primary"
                            danger
                            style={{ marginTop: '32px', backgroundColor: '#fe2c55', width: '100%' }}
                        >
                            Select file
                        </Button>
                    </div>
                )}
                <input ref={inputRef} type={'file'} style={{ display: 'none' }} onChange={handleChooseVideo}></input>
                <div
                    className={cx('info-content')}
                    style={{ marginLeft: video ? (preview ? '275px' : '20px') : '20px' }}
                >
                    <div className={cx('caption-title')}>
                        <span style={{ fontWeight: 700, flex: 1 }}>Caption</span>
                        <span style={{ fontWeight: 500, fontSize: '1.4rem', color: 'rgba(22,24,35,0.5)' }}>
                            {caption.trim().length}/150
                        </span>
                    </div>
                    <div className={cx('caption')}>
                        <textarea
                            className={cx('caption-content')}
                            rows={1}
                            wrap="soft"
                            value={caption}
                            onChange={(e) => handleCaption(e)}
                        ></textarea>
                        <div
                            className={cx('search-user')}
                            style={{ fontWeight: 700, fontSize: '2rem', cursor: 'pointer' }}
                        >
                            @
                        </div>
                        <div
                            className={cx('tag-user')}
                            style={{
                                fontWeight: 700,
                                fontSize: '2rem',
                                padding: '0px 10px 0px 10px',
                                cursor: 'pointer',
                            }}
                        >
                            #
                        </div>
                    </div>

                    <div className={cx('cover')}>
                        <span style={{ fontWeight: 700, flex: 1 }}>Cover</span>
                        <div className={cx('cover-content')}></div>
                    </div>
                    <div className={cx('role')}>
                        <span style={{ fontWeight: 700, flex: 1 }}>Who can view this video</span>
                        <select className={cx('role-option')}>
                            <option>Public</option>
                            <option>Friends</option>
                            <option>Private</option>
                        </select>
                    </div>
                    <div className={cx('allow')}>
                        <span style={{ fontWeight: 700, flex: 1 }}>Allow users to:</span>
                        <div>
                            <Checkbox checked style={{ marginRight: '20px' }}>
                                Comment
                            </Checkbox>
                            <Checkbox checked style={{ marginRight: '20px' }}>
                                Duet
                            </Checkbox>
                            <Checkbox checked>Stitch</Checkbox>
                        </div>
                    </div>
                    <div className={cx('copyright')}>
                        <span style={{ fontWeight: 700, marginRight: '20px' }}>Run a copyright check</span>
                        <Switch></Switch>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <span style={{ fontWeight: 500, fontSize: '1.3rem' }}>
                            We'll check your video for potential copyright infringements on used sounds. If
                            infringements are found, you can edit the video before posting. Learn more
                        </span>
                    </div>
                    <div className={cx('action')}>
                        <ButtonOr
                            name="Discard"
                            normal
                            onClick={() => {
                                setVideo();
                                setPreview(false);
                            }}
                        ></ButtonOr>
                        <ButtonOr name="Post" normal={!preview} primary={preview} disabled={!preview}></ButtonOr>
                    </div>
                </div>
            </div>

            <div
                ref={contentCopyRef}
                className="notice-content"
                style={{
                    right: '30%',
                    position: 'fixed',
                    left: '30%',
                    top: '16px',
                    opacity: 0,
                    transition: 'opacity 500ms',
                    zIndex: 1000,
                }}
            >
                <div className={cx('notice-maxlength')}>
                    <span>Maximum 150 characters</span>
                </div>
            </div>
        </div>
    );
}

export default Upload;

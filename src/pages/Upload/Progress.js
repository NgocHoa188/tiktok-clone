import { useEffect, useState } from 'react';
import { Progress as ProgressAntd } from 'antd';
import clasnames from 'classnames/bind';

import styles from './Upload.module.scss';
import Button from '~/components/Button';

const cx = clasnames.bind(styles);
function Progress({ file, handlePreview = () => {} }) {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const per = setTimeout(() => {
            if (percent <= 100) {
                setPercent((pre) => pre + 1);
            } else {
                handlePreview();
            }
        }, 25);
        return () => {
            clearTimeout(per);
        };
    }, [percent]);
    return (
        <div className={cx('wrapper-progress')}>
            <ProgressAntd type="circle" width={80} percent={percent} style={{ marginBottom: '10px' }}></ProgressAntd>
            <span style={{ marginBottom: '10px' }}>Uploading {file.name}</span>
            <Button name={'Cancel'} normal></Button>
        </div>
    );
}

export default Progress;

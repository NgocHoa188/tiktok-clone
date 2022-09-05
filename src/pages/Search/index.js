import { useLocation } from 'react-router-dom';
import { Tabs } from 'antd';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import TopAccounts from './TopAccounts';
import AccountInfo from './AccountInfo';

const cx = classNames.bind(styles);
const { TabPane } = Tabs;

function Search() {
    const dataSearch = useLocation().state.searchResult;

    return (
        <div className={cx('wrapper')}>
            <Tabs
                defaultActiveKey="1"
                tabBarGutter={80}
                tabBarStyle={{
                    color: 'black',
                    fontWeight: '600',
                    position: 'sticky',
                    backgroundColor: 'white',
                    top: 60,
                }}
                className={cx('tab-content')}
            >
                <TabPane tab="Top" key="1">
                    <TopAccounts showUser />
                </TabPane>
                <TabPane tab="Accounts" key="2">
                    {dataSearch.map((p) => (
                        <AccountInfo key={p.Id} data={p} />
                    ))}
                    {dataSearch.map((p) => (
                        <AccountInfo key={p.Id} data={p} />
                    ))}
                </TabPane>
                <TabPane tab="Videos" key="3">
                    <TopAccounts />
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Search;

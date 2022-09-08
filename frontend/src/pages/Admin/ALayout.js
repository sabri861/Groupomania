import React from 'react';
import { Outlet } from 'react-router-dom';

import '../../pages/Admin/admin.css'

import AHeader from '../../components/admin/AHeader'
import SideMenu from '../../components/admin/SideMenu'


const ALayout = ({accountService}) => {
    return (
        <div className='ALayout'>
            <AHeader accountService={accountService}/>
            <div id="admin">
                <SideMenu/>
                <div id="admin_body"><Outlet/></div>
            </div> 
        </div>
    );
};

export default ALayout;
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import ResponsiveFooter from './ResponsiveFooter';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <ResponsiveFooter></ResponsiveFooter>
        </div>
    );
};

export default Root;
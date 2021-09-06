import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFiles } from 'src/redux/actions';


const AllFiles = (props) => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(getFiles(token))
    }, []);

    return (
        <div>All Files</div>
    );
};

export default AllFiles;
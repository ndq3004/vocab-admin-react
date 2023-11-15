import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from '../../features/common/headerSlice';
import Vocabs from '../../features/vocabs';

function InternalPage(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(dispatch(setPageTitle({ title : "Vocabs"})));
    }, [])

    return <Vocabs />
}

export default InternalPage;
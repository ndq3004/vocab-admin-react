import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from '../../features/common/headerSlice';
import Vocabs from '../../features/vocabs';

function InternalPage(){
    const dispatch = useDispatch();
    useEffect(() => {
        const title = window.screen.width < 1250 ? "Vocabs mobile" : "Vocabs"
        dispatch(dispatch(setPageTitle({ title })));
    }, [dispatch])

    return <Vocabs />
}

export default InternalPage;
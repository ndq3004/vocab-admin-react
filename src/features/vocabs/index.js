import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'

const TopSideButtons = () => {
    const dispatch = useDispatch();
    const openAddNewVocabModal = () => {
        dispatch(openModal({title: "Add new vocab", bodyType: MODAL_BODY_TYPES.VOCAB_ADD_NEW}))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewVocabModal()}>Add New</button>
        </div>
    )
}


function Vocabs(){
    return (
        <>
            <TitleCard title="Vocab List" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>Word</th>
                            <th>meaning</th>
                            <th>Review count</th>
                            <th>Status</th>
                            <th>Assigned To</th>
                            <th></th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </TitleCard>
        </>
    );

}

export default Vocabs;
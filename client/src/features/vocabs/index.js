import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { getVocabsContent, deleteVocab } from './vocabSlice'
import moment from "moment";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

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
    const { vocabs } = useSelector(state => state.vocab);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVocabsContent())
    }, [])

    const refreshList = () => {
        dispatch(getVocabsContent())
    }

    const deleteCurrentLead = (word) => {
        dispatch(deleteVocab(word));
    }
    
    return (
        <>
            <TitleCard title="Vocab List" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th>Word</th>
                            <th>Type</th>
                            <th>meaning</th>
                            <th>Review count</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {vocabs && vocabs.length > 0 &&
                            vocabs.map((l, k) => {
                                return(
                                    <tr key={k} id={l._id}>
                                        <td>{l.word}</td>
                                        <td>{l.word_type}</td>
                                        <td>{l.meaning}</td>
                                        <td>{l.review_count}</td>
                                        <td>{l.status}</td>
                                        <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentLead(l)}><TrashIcon className="w-5"/></button></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    );

}

export default Vocabs;
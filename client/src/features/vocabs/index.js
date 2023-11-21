import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { getVocabsContent, deleteVocab } from './vocabSlice'
import moment from "moment";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import MinusCircleIcon from "@heroicons/react/24/outline/MinusCircleIcon";
import ArrowsPointingOutIcon from "@heroicons/react/24/outline/ArrowsPointingOutIcon";

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

    const openEditVocabModal = (word) => {
        dispatch(openModal({title: "Add new vocab", bodyType: MODAL_BODY_TYPES.VOCAB_EDIT, extraObject: word}))
    }

    const openViewVocabModal = (word) => {
        dispatch(openModal({title: "View vocab", bodyType: MODAL_BODY_TYPES.VOCAB_VIEW, extraObject: word}))
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
                            <th className="text-center">View more</th>
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
                                        <td>
                                            <span className="mr-2">{l.review_count}</span>
                                            <button className="btn btn-square btn-ghost w-6" onClick={() => openEditVocabModal(l)}><MinusCircleIcon/></button>
                                            <button className="btn btn-square btn-ghost w-6" onClick={() => openEditVocabModal(l)}><PlusCircleIcon/></button>
                                        </td>
                                        <td className="text-center">
                                            <button className="btn btn-square btn-ghost w-6" onClick={() => openViewVocabModal(l)}><ArrowsPointingOutIcon/></button>
                                        </td>
                                        <td>
                                            <button className="btn btn-square btn-ghost" onClick={() => openEditVocabModal(l)}><PencilIcon className="w-5"/></button>
                                            <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentLead(l)}><TrashIcon className="w-5"/></button>
                                        </td>
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
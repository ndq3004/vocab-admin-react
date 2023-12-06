import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { getVocabsContent, deleteVocab, updateVocabsContent, backup } from './vocabSlice'
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import MinusCircleIcon from "@heroicons/react/24/outline/MinusCircleIcon";
import ArrowsPointingOutIcon from "@heroicons/react/24/outline/ArrowsPointingOutIcon";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const TopSideButtons = ({refreshList, downloadBackup}) => {
    const dispatch = useDispatch();
    const openAddNewVocabModal = () => {
        dispatch(openModal({title: "Add new vocab", bodyType: MODAL_BODY_TYPES.VOCAB_ADD_NEW}))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn btn-ghost" onClick={downloadBackup}><CircleStackIcon className="w-5"/></button>
            <button className="btn btn-ghost" onClick={refreshList}><ArrowPathIcon className="w-5"/></button>
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewVocabModal()}>Add New</button>
        </div>
    )
}

function Vocabs(){
    const { getAccessTokenSilently } = useAuth0();

    getAccessTokenSilently({}).then(res => {
        console.log(res)
        axios.defaults.headers.common["Authorization"] = `Bearer ${res}`; 
      });

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

    const decreaseViewCount = (word) => {
        if (word) {
            dispatch(updateVocabsContent({vocabObj: {...word, review_count: word.review_count + 1}}));
        }
    }

    const increaseViewCount = (word) => {
        if (word) {
            dispatch(updateVocabsContent({vocabObj: {...word, review_count: word.review_count - 1}}));
        }
    }

    const minimizeWord = (str) => {
        if (str.length > 60) {
            return str.slice(0, 40) + '...'
        }
        return str;
    }

    const downloadBackup = () => {
        dispatch(backup())
    }
    
    return (
        <TitleCard title="Vocab List" topMargin="mt-2" TopSideButtons={<TopSideButtons refreshList={refreshList} downloadBackup={downloadBackup}/>}>
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
                                        <td>{minimizeWord(l.meaning)}</td>
                                        <td>
                                            <span className="mr-2">{l.review_count}</span>
                                            <button className="btn btn-square btn-ghost w-6" onClick={() => increaseViewCount(l)}><MinusCircleIcon/></button>
                                            <button className="btn btn-square btn-ghost w-6" onClick={() => decreaseViewCount(l)}><PlusCircleIcon/></button>
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
    );

}

export default Vocabs;
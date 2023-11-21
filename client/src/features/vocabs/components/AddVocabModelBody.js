import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import SelectBox from '../../../components/Input/SelectBox'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { updateVocabsContent, saveVocabsContent } from "../vocabSlice"

const getInitialDatetime = () => {
    const current = new Date();
    const datePart = current.toISOString().slice(0, 10);
    const timePart = current.toTimeString().slice(0,5);

    return `${datePart}T${timePart}`
}

const WORD_TYPE_OPTIONS = [
    {
        name: "verb",
        value: "verb",
    },
    {
        name: "noun",
        value: "noun",
    },
    {
        name: "adjective",
        value: "adjective",
    },
    {
        name: "adverb",
        value: "adverb",
    },
    {
        name: "preposition",
        value: "preposition",
    },
    {
        name: "interjection",
        value: "interjection"
    },
]

const INITIAL_VOCAB_OBJ = {
    word : "",
    word_type: WORD_TYPE_OPTIONS.at(0).value,
    meaning: "",
    review_count : 0,
    created_date: getInitialDatetime()
}

function AddVocabModelBody({closeModal, mode, extraObject}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const isEditMode = mode === 'edit';
    const isViewMode = mode === 'view';
    const [vocabObj, setVocabObj] = useState((isEditMode || isViewMode) ? extraObject : INITIAL_VOCAB_OBJ)

    const saveNewLead = () => {
        if(vocabObj.word.trim() === "")return setErrorMessage("Word is required!")
        else{
            if (mode == 'add') {
                dispatch(saveVocabsContent({vocabObj}))
            } else if (mode = 'edit') {
                dispatch(updateVocabsContent({vocabObj}))
            }
            closeModal()
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setVocabObj({...vocabObj, [updateType] : value})
        console.log(`${updateType}:${value}`)
    }

    const updateSelectBoxValue = ({updateType, value}) => {
        setErrorMessage("")
        setVocabObj({...vocabObj, [updateType] : value})
        console.log(vocabObj);
    }

    return(
        <>

            <InputText disabled={isViewMode} type="text" defaultValue={vocabObj.word} updateType="word" containerStyle="mt-4 w-72" labelTitle="Word" updateFormValue={updateFormValue}/>
            
            <SelectBox 
                options={WORD_TYPE_OPTIONS}
                labelTitle="Type of word"
                placeholder="Select type of word"
                containerStyle="w-72"
                defaultValue={WORD_TYPE_OPTIONS.at(0).value}
                updateFormValue={updateSelectBoxValue}
                updateType="word_type" 
                disabled={isViewMode}/>

            <TextAreaInput disabled={isViewMode} labelTitle="Meaning" updateType="meaning" defaultValue={vocabObj.meaning} updateFormValue={updateFormValue}/>
            
            <TextAreaInput disabled={isViewMode} defaultValue={vocabObj.sample} updateType="sample" containerStyle="mt-4" labelTitle="Sample" updateFormValue={updateFormValue}/>

            <InputText disabled={true} type="number"  defaultValue={vocabObj.review_count} updateType="review_count" containerStyle="mt-4" labelTitle="Review count" updateFormValue={updateFormValue}/>

            <InputText disabled={true} type="datetime-local" defaultValue={vocabObj.created_date} updateType="created_date" containerStyle="mt-4" labelTitle="Created date" updateFormValue={updateFormValue}/>

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>{isViewMode ? 'Close' : 'Cancel'}</button>
                {!isViewMode && <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>}
            </div>
        </>
    )
}

export default AddVocabModelBody
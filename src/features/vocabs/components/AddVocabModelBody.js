import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import SelectBox from '../../../components/Input/SelectBox'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewVocab } from "../vocabSlice"

const getInitialDatetime = () => {
    const current = new Date();
    const datePart = current.toISOString().slice(0, 10);
    const timePart = current.toTimeString().slice(0,5);

    return `${datePart}T${timePart}`
}

const INITIAL_VOCAB_OBJ = {
    word : "",
    review_count : 0,
    created_date: getInitialDatetime()
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

function AddVocabModelBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [vocabObj, setVocabObj] = useState(INITIAL_VOCAB_OBJ)


    const saveNewLead = () => {
        if(vocabObj.word.trim() === "")return setErrorMessage("Word is required!")
        else{
            let newLeadObj = {
                
            }
            dispatch(addNewVocab({newLeadObj}))
            dispatch(showNotification({message : "New Lead Added!", status : 1}))
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
    }

    return(
        <>

            <InputText type="text" defaultValue={vocabObj.word} updateType="word" containerStyle="mt-4 w-72" labelTitle="Word" updateFormValue={updateFormValue}/>
            
            <SelectBox 
                options={WORD_TYPE_OPTIONS}
                labelTitle="Period"
                placeholder="Select type of word"
                containerStyle="w-72"
                defaultValue={WORD_TYPE_OPTIONS.at(0).value}
                updateFormValue={updateSelectBoxValue} />

            <TextAreaInput labelTitle="Meaning" updateType="meaning" defaultValue={vocabObj.meaning} updateFormValue={updateFormValue}/>
            
            <TextAreaInput defaultValue={vocabObj.sample} updateType="sample" containerStyle="mt-4" labelTitle="Sample" updateFormValue={updateFormValue}/>

            <InputText disabled={true} type="number"  defaultValue={vocabObj.review_count} updateType="review_count" containerStyle="mt-4" labelTitle="Review count" updateFormValue={updateFormValue}/>

            <InputText disabled={true} type="datetime-local" defaultValue={vocabObj.created_date} updateType="created_date" containerStyle="mt-4" labelTitle="Created date" updateFormValue={updateFormValue}/>

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddVocabModelBody
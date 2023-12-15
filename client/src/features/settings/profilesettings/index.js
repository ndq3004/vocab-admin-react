import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'
import { useAuth0, LocalStorageCache } from "@auth0/auth0-react"

function ProfileSettings(){


    const dispatch = useDispatch()

    // Call API to update profile settings changes
    const updateProfile = () => {
        dispatch(showNotification({message : "Profile Updated", status : 1}))    
    }

    const updateFormValue = ({updateType, value}) => {
        console.log(updateType)
    }

    const auth0Cacher = new LocalStorageCache();
    const user = auth0Cacher.get(`@@auth0spajs@@::${process.env.REACT_APP_AUTH0_CLIENT_ID}::@@user@@`).decodedToken.user;

    console.log(user)
    return(
            <TitleCard title="Profile Settings" topMargin="mt-2">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Name" defaultValue={user.name} updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Email Id" defaultValue={user.email} updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Title" defaultValue="UI/UX Designer" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Place" defaultValue="California" updateFormValue={updateFormValue}/>
                    <TextAreaInput labelTitle="About" defaultValue="Doing what I love, part time traveller" updateFormValue={updateFormValue}/>
                </div>
                <div className="divider" ></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Language" defaultValue="English" updateFormValue={updateFormValue}/>
                    <InputText labelTitle="Timezone" defaultValue="IST" updateFormValue={updateFormValue}/>
                    <ToogleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue}/>
                </div>

                <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div>
            </TitleCard>
    )
}


export default ProfileSettings
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const getVocabsContent = createAsyncThunk('/vocabs/content/all', async () => {
	const response = await axios.get('http://localhost:3001/vocabs', {})
	return response.data;
})

export const saveVocabsContent = createAsyncThunk('/vocab/save', async (vocabData, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:3001/vocab', vocabData.vocabObj)
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const updateVocabsContent = createAsyncThunk('/vocab/update', async (vocabData, { rejectWithValue }) => {
    try {
        const response = await axios.put('http://localhost:3001/vocab/' + vocabData.vocabObj._id, vocabData.vocabObj)
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const deleteVocab = createAsyncThunk('/vocab/delete', async (vocabData, { rejectWithValue }) => {
    try {
        await axios.delete('http://localhost:3001/vocab/' + vocabData._id)
        return vocabData;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const vocabsSlice = createSlice({
    name: 'vocabs',
    initialState: {
        isLoading: false,
        vocabs : [],

    },
    reducers: {

        addNewVocab: (state, action) => {
            // let {vocabObj} = action.payload
            // state.vocabs = [...state.vocabs, vocabObj]
        },

        deleteLead: (state, action) => {
            let {index} = action.payload
            state.vocabs.splice(index, 1)
        }
    },

    extraReducers: {
		[getVocabsContent.pending]: state => {
			state.isLoading = true
		},
		[getVocabsContent.fulfilled]: (state, action) => {
			state.vocabs = action.payload.data
			state.isLoading = false
		},
		[getVocabsContent.rejected]: state => {
			state.isLoading = false
		},
        [saveVocabsContent.pending]: state => {
            state.isLoading = true;
        },
        [saveVocabsContent.fulfilled]: (state, response) => {
            let vocabObj = response.payload.data
            state.vocabs = [...state.vocabs, vocabObj]
            state.isLoading = false;
        },
        [saveVocabsContent.rejected]: state => {
            state.isLoading = true;
        },
        [deleteVocab.pending]: state => {
            state.isLoading = true;
        },
        [deleteVocab.fulfilled]: (state, data) => {
            state.vocabs = [...state.vocabs.filter(v => v._id !== data.payload._id)]
            state.isLoading = false;
        },
        [deleteVocab.rejected]: state => {
            state.isLoading = false;
        },
        [updateVocabsContent.pending]: state => {
            state.isLoading = true;
        },
        [updateVocabsContent.fulfilled]: (state, response) => {
            if (response.payload.success){
                const vocabObj = state.vocabs.find(x => x._id == response.payload.data._id);
                Object.keys(vocabObj).forEach(k => {
                    vocabObj[k] = response.payload.data[k];
                })
            }
            state.isLoading = false;
        },
        [updateVocabsContent.rejected]: state => {
            state.isLoading = false;
        },
    }
})

export const { addNewVocab, deleteLead } = vocabsSlice.actions

export default vocabsSlice.reducer
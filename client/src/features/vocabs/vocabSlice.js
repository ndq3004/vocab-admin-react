import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverLink = 'http://localhost:3001/api/'

export const getVocabsContent = createAsyncThunk(
  "/vocabs/content/all",
  async () => {
    const response = await axios.get(serverLink + "vocabs", {});
    return response.data;
  }
);

export const saveVocabsContent = createAsyncThunk(
  "/vocab/save",
  async (vocabData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        serverLink + "vocab",
        vocabData.vocabObj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteVocab = createAsyncThunk(
  "/vocab/delete",
  async (vocabData, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        serverLink + "vocab/" + vocabData._id
      );
      return vocabData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const generateExample = createAsyncThunk(
  "vocab/example",
  async (wordText, { rejectWithValue }) => {
    try {
        const res = await axios.get(serverLink + 'openai/' + wordText);
        return res.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const vocabsSlice = createSlice({
  name: "vocabs",
  initialState: {
    isLoading: false,
    vocabs: [],
    currentSample: "",
  },
  reducers: {
    addNewVocab: (state, action) => {
      // let {vocabObj} = action.payload
      // state.vocabs = [...state.vocabs, vocabObj]
    },

    deleteLead: (state, action) => {
      let { index } = action.payload;
      state.vocabs.splice(index, 1);
    },
  },

  extraReducers: {
    [getVocabsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getVocabsContent.fulfilled]: (state, action) => {
      state.vocabs = action.payload.data;
      state.isLoading = false;
    },
    [getVocabsContent.rejected]: (state) => {
      state.isLoading = false;
    },
    [saveVocabsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [saveVocabsContent.fulfilled]: (state, response) => {
      let vocabObj = response.payload.data;
      state.vocabs = [...state.vocabs, vocabObj];
      state.isLoading = false;
    },
    [saveVocabsContent.rejected]: (state) => {
      state.isLoading = true;
    },
    [deleteVocab.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteVocab.fulfilled]: (state, data) => {
      state.vocabs = [
        ...state.vocabs.filter((v) => v._id !== data.payload._id),
      ];
      state.isLoading = false;
    },
    [deleteVocab.rejected]: (state) => {
      state.isLoading = false;
    },
    [generateExample.pending]: (state) => {
      state.isLoading = true;
    },
    [generateExample.fulfilled]: (state, data) => {
      debugger;
      state.currentSample = data.payload.data[0].message.content;
      state.isLoading = false;
    },
    [generateExample.rejected]: (state) => {
      debugger;
      state.isLoading = false;
    },
  },
});

export const { addNewVocab, deleteLead } = vocabsSlice.actions;

export default vocabsSlice.reducer;

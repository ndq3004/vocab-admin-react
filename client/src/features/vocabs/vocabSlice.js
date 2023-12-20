import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverLink = "api/vocab";

export const getVocabsContent = createAsyncThunk(
  "/vocabs/content/all",
  async () => {
    const response = await axios.get(serverLink + "/all", {});
    return response.data;
  }
);

export const saveVocabsContent = createAsyncThunk(
  "/vocab/save",
  async (vocabData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        serverLink,
        vocabData.vocabObj
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateVocabsContent = createAsyncThunk(
  "/vocab/update",
  async (vocabData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        serverLink + "/" + vocabData.vocabObj._id,
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
      await axios.delete(
        serverLink + "/" + vocabData._id
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
      const res = await axios.get(serverLink + "/openai/" + wordText);
      return res.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const backup = createAsyncThunk(
  "vocab/backup",
  async (wordText, { rejectWithValue }) => {
    try {
      const res = await axios.get(serverLink + "/backup", { responseType: 'blob'});
      // create file link in browser's memory
      const href = URL.createObjectURL(res.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', 'file.json'); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
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
    resetGeneratedExample: (state, action) =>{
      state.currentSample = "";
    }
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
    [updateVocabsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [updateVocabsContent.fulfilled]: (state, response) => {
      if (response.payload.success) {
        const vocabObj = state.vocabs.find(
          (x) => x._id == response.payload.data._id
        );
        Object.keys(vocabObj).forEach((k) => {
          vocabObj[k] = response.payload.data[k];
        });
      }
      state.isLoading = false;
    },
    [updateVocabsContent.rejected]: (state) => {
      state.isLoading = false;
    },
    [generateExample.pending]: (state) => {
      state.isLoading = true;
    },
    [generateExample.fulfilled]: (state, data) => {
      state.currentSample = data.payload.data[0].message.content;
      state.isLoading = false;
    },
    [generateExample.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { resetGeneratedExample } = vocabsSlice.actions;

export default vocabsSlice.reducer;

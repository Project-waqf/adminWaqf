import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AssetType, NewsType } from "../utils/types/DataType";


export interface DraftState {
    news: NewsType[]
    asset: AssetType[]
}

const initialState: DraftState = {
    news: [],
    asset: []
}

export const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        newsToDraft(state, action: PayloadAction<NewsType>) {
            state.news.push(action.payload)
        },
        assetToDraft(state, action: PayloadAction<AssetType>) {
            state.asset.push(action.payload)
        },
        removeNewsFromDraft(state, action: PayloadAction<string>) {
            state.news = state.news.filter((item) => {
                item.title !== action.payload
            })
        },
        removeAssetFromDraft(state, action: PayloadAction<string>) {
            state.asset = state.asset.filter((item) => {
                item.name !== action.payload
            })
        }
    }
})
export const { newsToDraft, assetToDraft, removeNewsFromDraft, removeAssetFromDraft } = draftSlice.actions
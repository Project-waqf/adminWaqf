import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AssetType, NewsType, WakafType } from "../utils/types/DataType";


export interface DraftState {
    news: NewsType[]
    asset: AssetType[]
    wakaf: WakafType[]
}

const initialState: DraftState = {
    news: [],
    asset: [],
    wakaf: []
}

export const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        newsToDraft(state, action: PayloadAction<NewsType>) {
            state.news.push(action.payload)
        },
        wakafToDraft(state, action: PayloadAction<WakafType>) {
            state.wakaf.push(action.payload)
        },
        assetToDraft(state, action: PayloadAction<AssetType>) {
            state.asset.push(action.payload)
        },
        removeNewsFromDraft(state, action: PayloadAction<string>) {
            state.news = state.news.filter((item) => {
                item.title !== action.payload
            })
        },
        removeWakafFromDraft(state, action: PayloadAction<string>) {
            state.wakaf = state.wakaf.filter((item) => {
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
export const { newsToDraft, assetToDraft, removeNewsFromDraft, removeAssetFromDraft, wakafToDraft, removeWakafFromDraft } = draftSlice.actions
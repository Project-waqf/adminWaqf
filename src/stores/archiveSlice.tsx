import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AssetType, NewsType, WakafType } from "../utils/types/DataType";

export interface ArchiveState {
    news: NewsType[]
    asset: AssetType[]
    wakaf: WakafType[]
}

const initialState: ArchiveState = {
    news: [],
    asset: [],
    wakaf: []
}

export const archiveSlice = createSlice({
    name: 'archive',
    initialState,
    reducers: {
        newsToArchive(state, action: PayloadAction<NewsType>) {
            state.news.push(action.payload)
        },
        wakafToArchive(state, action: PayloadAction<WakafType>) {
            state.wakaf.push(action.payload)
        },
        assetToArchive(state, action: PayloadAction<AssetType>) {
            state.asset.push(action.payload)
        },
        removeNewsFromArchive(state, action: PayloadAction<string>) {
            state.news = state.news.filter((item) => {
                item.title !== action.payload
            })
        },
        removeWakafFromArchive(state, action: PayloadAction<string>) {
            state.wakaf = state.wakaf.filter((item) => {
                item.title !== action.payload
            })
        },
        removeAssetFromArchive(state, action: PayloadAction<string>) {
            state.asset = state.asset.filter((item) => {
                item.name !== action.payload
            })
        }
    }
})
export const { newsToArchive, assetToArchive, removeNewsFromArchive, removeAssetFromArchive, wakafToArchive, removeWakafFromArchive } = archiveSlice.actions

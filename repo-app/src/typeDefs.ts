import { Dispatch, SetStateAction } from "react"

export type SearchProps = {
    setRepoName: Dispatch<SetStateAction<string>>
}
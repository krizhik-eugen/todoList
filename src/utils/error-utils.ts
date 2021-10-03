import {setAppErrorAC, setAppStatusAC, SetAppStatusActionType, SetErrorActionType} from "../app/app-reducer"
import {Dispatch} from 'redux'
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsType>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ErrorUtilsType>) =>
{
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
        dispatch(setAppStatusAC('failed'))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
        dispatch(setAppStatusAC('failed'))
    }
}

type ErrorUtilsType = SetAppStatusActionType | SetErrorActionType
import {AppStateType} from "../root-reducer";
import {UserState} from "./user-reducer";
import {AuthErrors, ReviewError, User, UserEditErrors} from "../../types/types";

export const selectUserState = (state: AppStateType): UserState => state.user;
export const selectUserFromUserState = (state: AppStateType): Partial<User> => selectUserState(state).user;
export const selectIsLoggedIn = (state: AppStateType): boolean => selectUserState(state).isLoggedIn;
export const selectIsLoaded = (state: AppStateType): boolean => selectUserState(state).isLoaded;
export const selectSuccessMessage = (state: AppStateType): string => selectUserState(state).successMessage;
export const selectUserEditErrors = (state: AppStateType): Partial<UserEditErrors> => selectUserState(state).userEditErrors;
export const selectUserResetPasswordErrors = (state: AppStateType): Partial<AuthErrors> => selectUserState(state).userResetPasswordErrors;
export const selectReviewErrors = (state: AppStateType): Partial<ReviewError> => selectUserState(state).reviewErrors;
export const selectIsReviewAdded = (state: AppStateType): boolean => selectUserState(state).isReviewAdded;

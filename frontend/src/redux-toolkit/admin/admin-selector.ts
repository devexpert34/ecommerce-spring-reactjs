import { LoadingStatus, PerfumeErrors, User } from "../../types/types";
import { RootState } from "../../store";
import { AdminState } from "./admin-slice";

export const selectAdminState = (state: RootState): AdminState => state.admin;
export const selectAdminStateUsers = (state: RootState): Array<User> => selectAdminState(state).users;
export const selectAdminStateUser = (state: RootState): Partial<User> => selectAdminState(state).user;
export const selectPagesCount = (state: RootState): number => selectAdminState(state).pagesCount;
export const selectTotalElements = (state: RootState): number => selectAdminState(state).totalElements;
export const selectAdminStateErrors = (state: RootState): Partial<PerfumeErrors> => selectAdminState(state).errors;
export const selectIsPerfumeAdded = (state: RootState): boolean => selectAdminState(state).isPerfumeAdded;
export const selectIsPerfumeEdited = (state: RootState): boolean => selectAdminState(state).isPerfumeEdited;
export const selectIsPerfumeDeleted = (state: RootState): boolean => selectAdminState(state).isPerfumeDeleted;
export const selectIsAdminStateLoading = (state: RootState): boolean => selectAdminState(state).loadingState === LoadingStatus.LOADING;

import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { LoadingStatus } from "../../../types/types";
import { API_BASE_URL, PERFUMES, PERFUMES_GRAPHQL_PERFUME, PERFUMES_REVIEWS } from "../../../constants/urlConstants";
import { store } from "../../../store";
import { initialState } from "../perfume-slice";
import { perfumeData } from "../../../utils/test-data/perfume-test-data";
import { fetchPerfume, fetchPerfumeByQuery, fetchReviewsByPerfumeId } from "../perfume-thunks";

describe("perfume slice tests", () => {
    const mock = new MockAdapter(axios);
    let state = store.getState().perfume;

    beforeEach(() => {
        state = initialState;
    });

    it("should fetchPerfume dispatches fulfilled on success", async () => {
        expect(state.perfume).toEqual({});
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${PERFUMES}/34`).reply(200, perfumeData);
        const result = await store.dispatch(fetchPerfume("34"));

        state = store.getState().perfume;
        expect(result.type).toBe("perfume/fetchPerfume/fulfilled");
        expect(state.perfume).toEqual(perfumeData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchPerfume dispatches rejected on failure", async () => {
        expect(state.errorMessage).toEqual("");
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${PERFUMES}/34`).reply(400, "ERROR");
        const result = await store.dispatch(fetchPerfume("34"));

        state = store.getState().perfume;
        expect(result.type).toBe("perfume/fetchPerfume/rejected");
        expect(state.errorMessage).toEqual("ERROR");
        expect(state.loadingState).toEqual(LoadingStatus.ERROR);
    });

    it("should fetchReviewsByPerfumeId dispatches fulfilled on success", async () => {
        expect(state.reviews).toEqual([]);
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onGet(API_BASE_URL + `${PERFUMES_REVIEWS}/34`).reply(200, perfumeData.reviews);
        const result = await store.dispatch(fetchReviewsByPerfumeId("34"));

        state = store.getState().perfume;
        expect(result.type).toBe("perfume/fetchReviewsByPerfumeId/fulfilled");
        expect(state.reviews).toEqual(perfumeData.reviews);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchPerfumeByQuery dispatches fulfilled on success", async () => {
        expect(state.perfume).toEqual({});
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + PERFUMES_GRAPHQL_PERFUME).reply(200, { data: { perfume: perfumeData } });
        const result = await store.dispatch(fetchPerfumeByQuery("1"));

        state = store.getState().perfume;
        expect(result.type).toBe("perfume/fetchPerfumeByQuery/fulfilled");
        expect(state.perfume).toEqual(perfumeData);
        expect(state.loadingState).toEqual(LoadingStatus.LOADED);
    });

    it("should fetchPerfumeByQuery dispatches rejected on failure", async () => {
        expect(state.errorMessage).toEqual("");
        expect(state.loadingState).toEqual(LoadingStatus.LOADING);

        mock.onPost(API_BASE_URL + PERFUMES_GRAPHQL_PERFUME).reply(400, "ERROR");
        const result = await store.dispatch(fetchPerfumeByQuery("1"));

        state = store.getState().perfume;
        expect(result.type).toBe("perfume/fetchPerfumeByQuery/rejected");
        expect(state.errorMessage).toEqual("ERROR");
        expect(state.loadingState).toEqual(LoadingStatus.ERROR);
    });
});

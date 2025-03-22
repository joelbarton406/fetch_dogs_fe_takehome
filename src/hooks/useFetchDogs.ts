import { searchDogs } from "@/api/dogs";
import { Dog } from "@/types/api";
import { useReducer, useEffect } from "react";

export type Favorites = Map<string, boolean>;
type SortDirection = "asc" | "desc";
export type SortField = "breed" | "name" | "age";

export interface FilterTerm {
  type: string;
  value: string;
}

interface State {
  dogs: string[];
  favorites: Favorites;
  searchResultTotal: number;
  totalPages: number;
  currentPage: number;
  resultsPerPage: number;
  sortField: SortField;
  sortDirection: SortDirection;
  selectedBreeds: string[];
  ageMinMax: number[];
  zipCodes: string[];
  adoptionMatch: Dog | null;
  filterTerms: FilterTerm[];
}

type Action =
  | { type: "SET_DOGS"; payload: { dogs: string[]; total: number } }
  | { type: "SET_ADOPTION_MATCH"; payload: Dog }
  | { type: "TOGGLE_FAVORITE"; payload: string }
  | { type: "UPDATE_CURRENT_PAGE"; payload: number }
  | {
      type: "UPDATE_SORT";
      payload: { field: SortField; direction: SortDirection };
    }
  | { type: "UPDATE_SELECTED_BREEDS"; payload: string }
  | { type: "UPDATE_SELECTED_ZIPCODES"; payload: string }
  | { type: "UPDATE_AGE_MIN_MAX"; payload: number[] }
  | { type: "CLEAR_ALL_FILTER_TERMS" };

const dogsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DOGS": {
      return {
        ...state,
        dogs: action.payload.dogs,
        searchResultTotal: action.payload.total,
        totalPages: Math.ceil(action.payload.total / state.resultsPerPage),
      };
    }
    case "SET_ADOPTION_MATCH": {
      return { ...state, adoptionMatch: action.payload };
    }
    case "TOGGLE_FAVORITE": {
      const newFavorites = new Map(state.favorites);
      if (newFavorites.has(action.payload)) {
        newFavorites.delete(action.payload);
      } else {
        newFavorites.set(action.payload, true);
      }
      return { ...state, favorites: newFavorites };
    }
    case "UPDATE_CURRENT_PAGE": {
      return { ...state, currentPage: action.payload };
    }
    case "UPDATE_SORT": {
      const { field: sortField, direction: sortDirection } = action.payload;
      return {
        ...state,
        sortField,
        sortDirection,
        currentPage: 1,
      };
    }
    case "UPDATE_AGE_MIN_MAX": {
      return { ...state, ageMinMax: action.payload, currentPage: 1 };
    }
    case "UPDATE_SELECTED_ZIPCODES": {
      const zipCode = action.payload;

      const updatedSelectedZipCodes = state.zipCodes.includes(zipCode)
        ? state.zipCodes.filter((zip) => zip !== zipCode)
        : [...state.zipCodes, zipCode];

      return {
        ...state,
        zipCodes: updatedSelectedZipCodes,
        filterTerms: [
          ...state.filterTerms.filter((term) => term.type !== "zipCode"),
          ...updatedSelectedZipCodes.map((zip) => ({
            type: "zipCode",
            value: zip,
          })),
        ],
        currentPage: 1,
      };
    }
    case "UPDATE_SELECTED_BREEDS": {
      const breed = action.payload;
      const updatedSelectedBreeds = state.selectedBreeds.includes(breed)
        ? state.selectedBreeds.filter((b) => b !== breed)
        : [...state.selectedBreeds, breed];

      return {
        ...state,
        selectedBreeds: updatedSelectedBreeds,
        filterTerms: [
          ...state.filterTerms.filter((term) => term.type !== "breed"),

          ...updatedSelectedBreeds.map((b) => ({
            type: "breed",
            value: b,
          })),
        ],
        currentPage: 1,
      };
    }
    case "CLEAR_ALL_FILTER_TERMS": {
      return { ...state, filterTerms: [] };
    }
    default:
      return state;
  }
};

const initialState: State = {
  dogs: [],
  favorites: new Map(),
  searchResultTotal: 0,
  totalPages: 0,
  currentPage: 1,
  resultsPerPage: 21,
  sortField: "breed",
  sortDirection: "asc",
  selectedBreeds: [],
  ageMinMax: [0, 14],
  zipCodes: [],
  adoptionMatch: null,
  filterTerms: [],
};

export const useFetchDogs = () => {
  const [state, dispatch] = useReducer(dogsReducer, initialState);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const sort = `${state.sortField}:${state.sortDirection}`;
        const from = (
          (state.currentPage - 1) *
          state.resultsPerPage
        ).toString();
        const dogsResponse = await searchDogs({
          sort,
          size: state.resultsPerPage,
          from,
          breeds: state.selectedBreeds,
          zipCodes: state.zipCodes,
          ageMax: state.ageMinMax[1],
          ageMin: state.ageMinMax[0],
        });

        dispatch({
          type: "SET_DOGS",
          payload: { dogs: dogsResponse.resultIds, total: dogsResponse.total },
        });
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };

    fetchDogs();
  }, [
    state.currentPage,
    state.resultsPerPage,
    state.selectedBreeds,
    state.zipCodes,
    state.ageMinMax,
    state.sortField,
    state.sortDirection,
  ]);

  return { state, dispatch };
};

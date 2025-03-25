import { getBreeds, searchDogs } from "@/api/dogs";
import { Dog } from "@/types/api";
import { useReducer, useEffect } from "react";
import { UserLocation, useUserLocation } from "@/hooks/useUserLocation";

export type Favorites = Map<string, boolean>;
type SortDirection = "asc" | "desc";
export type SortField = "breed" | "name" | "age";

interface State {
  breeds: string[];
  dogs: string[];
  favorites: Favorites;
  searchResultTotal: number;
  totalPages: number;
  currentPage: number;
  resultsPerPage: number;
  sortField: SortField;
  sortDirection: SortDirection;
  selectedBreeds: string[];
  zipCodes: string[];
  ageMinMax: number[];
  adoptionMatch: Dog | null;
  userLocation: UserLocation | null;
}

type Action =
  | { type: "SET_BREEDS"; payload: string[] }
  | { type: "SET_DOGS"; payload: { dogs: string[]; total: number } }
  | { type: "SET_ADOPTION_MATCH"; payload: Dog }
  | { type: "TOGGLE_FAVORITE"; payload: string }
  | { type: "UPDATE_CURRENT_PAGE"; payload: number }
  | {
      type: "UPDATE_SORT";
      payload: { field: SortField; direction: SortDirection };
    }
  | { type: "UPDATE_SELECTED_BREEDS"; payload: string[] } // changed from string to string[]
  | { type: "UPDATE_SELECTED_ZIPCODES"; payload: string[] }
  | { type: "UPDATE_AGE_MIN_MAX"; payload: number[] }
  | { type: "CLEAR_ALL_FILTER_TERMS" }
  | { type: "UPDATE_USER_LOCATION"; payload: UserLocation | null };

const initialState: State = {
  breeds: [],
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
  userLocation: null,
};

const dogsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_BREEDS": {
      return { ...state, breeds: action.payload };
    }
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
      };
    }
    case "UPDATE_AGE_MIN_MAX": {
      return { ...state, ageMinMax: action.payload };
    }
    case "UPDATE_SELECTED_ZIPCODES": {
      const newZipCodes = action.payload;
      return {
        ...state,
        zipCodes: newZipCodes,
      };
    }
    case "UPDATE_SELECTED_BREEDS": {
      const newBreeds = action.payload;
      return {
        ...state,
        selectedBreeds: newBreeds,
      };
    }
    case "UPDATE_USER_LOCATION": {
      return { ...state, userLocation: action.payload };
    }
    // case "CLEAR_ALL_FILTER_TERMS": {
    //   return { ...state, filterTerms: [] };
    // }
    default:
      return state;
  }
};

export const useFetchDogs = () => {
  const { userLocation } = useUserLocation();
  const [state, dispatch] = useReducer(dogsReducer, initialState);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breeds = await getBreeds();
        dispatch({
          type: "SET_BREEDS",
          payload: breeds,
        });
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();

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

  useEffect(() => {
    console.log("updating userlocation....", userLocation);
    dispatch({ type: "UPDATE_USER_LOCATION", payload: userLocation });
  }, [userLocation]);

  return { state, dispatch };
};

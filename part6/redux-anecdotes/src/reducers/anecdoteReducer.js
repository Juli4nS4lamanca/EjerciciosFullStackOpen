import { createSlice, current } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

/* const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
}; */

// Asi se puede hacer sin la biblioteca de redux toolkit
/* const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE": {
      const id = action.payload.id;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state
        .map((a) => (a.id !== id ? a : changedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    }
    case "NEW": {
      return [...state, action.payload];
    }
    default:
      return state;
  }
};

export const vote = (id) => {
  return {
    type: "VOTE",
    payload: { id },
  };
};

export const newAnecdote = (content) => {
  return {
    type: "NEW",
    payload: asObject(content),
  };
};
 */

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    vote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      // Sin el current el estado no se podria ver por la libreria immer de redux toolkit
      console.log(current(state));
      return state
        .map((a) => (a.id !== id ? a : changedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const { setAnecdotes, createAnecdote, vote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const updateVotos = (anecdote) => {
  return async (dispatch) => {
    const anecdoteUpdated = await anecdoteService.updateLike(anecdote);
    dispatch(vote(anecdoteUpdated.id));
  };
};

export default anecdoteSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import booksApi from "../utils/axios";

const extractErrorMessage = (err) => {
  if (err.response && err.response.data && err.response.data.msg) {
    return err.response.data.msg;
  } else {
    return err.message;
  }
};

export const fetchBooks = async ({ sortBy, order, genre, limit = 0, p }) => {
  try {
    const response = await booksApi.get(`/books`, {
      params: { sort_by: sortBy, order, genre, limit, p },
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const fetchBookById = async (bookId) => {
  try {
    const response = await booksApi.get(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};


export const createBook = async (newBookObj) => {
  try {
    const response = await booksApi.post(`/books`, newBookObj, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};


export const removeBookById = async (bookId) => {
  try {
    const response = await booksApi.delete(`/books/${bookId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};


export const fetchReviewsByBookId = async ({ bookId, limit, p }) => {
  try {
    const response = await booksApi.get(`/books/${bookId}/reviews`, {
      params: { limit, p },
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};


export const createReviewByBookId = async ({ bookId, newReviewObj }) => {
  try {
    const response = await booksApi.post(
      `/books/${bookId}/reviews`,
      newReviewObj,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};


export const updateReviewById = async ({ reviewId, reviewObj }) => {
  try {
    const response = await booksApi.patch(`/reviews/${reviewId}`, reviewObj, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};


export const removeReviewById = async (reviewId) => {
  try {
    const response = await booksApi.delete(`/reviews/${reviewId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};


export const fetchGenres = async () => {
  try {
    const response = await booksApi.get("/genres");
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};


export const createGenre = async (newGenreObj) => {
  try {
    const response = await booksApi.post(`/genres`, newGenreObj, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const createUser = async (newUserObj) => {
  try {
    const response = await booksApi.post(`/users`, newUserObj);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const updateUser = async (username, updatedUser) => {
  try {
    const response = await booksApi.patch(`/users/${username}`, updatedUser, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const removeUserByUsername = async (username) => {
  try {
    const response = await booksApi.delete(`/users/${username}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userObj, { rejectWithValue }) => {
    try {
      const response = await booksApi.post(`/users/login`, userObj);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const logoutUser = async () => {
  try {
    const response = await booksApi.post("/users/logout");
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

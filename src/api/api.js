import { createAsyncThunk } from "@reduxjs/toolkit";
import booksApi from "../utils/axios";

export const extractErrorMessage = (err) => {
  if (err.response && err.response.data && err.response.data.msg) {
    return err.response.data.msg;
  } else {
    return err.message;
  }
};

export const fetchBooks = async ({ sortBy, order, genre, limit, p }) => {
  try {
    const response = await booksApi.get(`/books`, {
      params: { sort_by: sortBy, order, genre, limit, p },
    });
    return {
      books: response.data.books,
      total_count: response.data.total_count,
    };
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const fetchBookById = async (bookId) => {
  try {
    const response = await booksApi.get(`/books/${bookId}`);
    return response.data.book;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const createBook = async (newBookObj) => {
  try {
    const response = await booksApi.post(`/books`, newBookObj);
    return response.data.book;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const removeBookById = async (bookId) => {
  try {
    const response = await booksApi.delete(`/books/${bookId}`);
    return response.data.book;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const fetchReviewsByBookId = async ({ bookId, limit, p }) => {
  try {
    const response = await booksApi.get(`/books/${bookId}/reviews`, {
      params: { limit, p },
    });
    return {
      reviews: response.data.reviews,
      total_count: response.data.total_count,
    };
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const createReviewByBookId = async ({
  bookId,
  postNewReview: { body, rating },
}) => {
  try {
    const response = await booksApi.post(`/books/${bookId}/reviews`, {
      body,
      rating,
    });
    return response.data.newReview;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const updateReviewById = async ({ reviewId, reviewObj }) => {
  try {
    const response = await booksApi.patch(`/reviews/${reviewId}`, reviewObj);
    return response.data.review;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const removeReviewById = async (reviewId) => {
  try {
    const response = await booksApi.delete(`/reviews/${reviewId}`);
    return response.data.review;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const fetchGenres = async () => {
  try {
    const response = await booksApi.get("/genres");
    return response.data.genres;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const createGenre = async (newGenreObj) => {
  try {
    const response = await booksApi.post(`/genres`, newGenreObj);
    return response.data.genre;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const createUser = async (newUserObj) => {
  try {
    const response = await booksApi.post(`/users`, newUserObj);
    return response.data.user;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ username, updatedUser }, { rejectWithValue }) => {
    try {
      const response = await booksApi.patch(`/users/${username}`, updatedUser);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const removeUserByUsername = createAsyncThunk(
  "users/removeUserByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const response = await booksApi.delete(`/users/${username}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

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

export const logoutUser = createAsyncThunk(
  "users/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await booksApi.post(`/users/logout`, null);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

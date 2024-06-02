import axios, { AxiosError } from "axios";

const API_URL = "https://zany-space-fiesta-7v7prgrp956j2pxrq-3000.app.github.dev/";

export const getMovieData = async (genre: string): Promise<MovieData> => {
  return new Promise<MovieData>((resolve, reject) => {
    axios
      .get(`${API_URL}/movies/${genre}`)
      .then((res) => {
        resolve({
          title: res.data.title,
          releaseDate: res.data.releaseDate,
          genre: res.data.genre,
          director: res.data.director,
          rating: res.data.rating,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("Genre not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};

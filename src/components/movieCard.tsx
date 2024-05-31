import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { getMovieData } from "../api/actions"; // Ensure this is updated to your actual import
import { FaFilm, FaStar, FaCalendarAlt, FaUser } from "react-icons/fa"; // Importing movie-related icons


const MovieCard: React.FC = () => {
  const [data, setData] = useState<MovieData | null>(null);
  const [loadingState, setLoadingState] = useState(false);
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching Movie Data...");
    console.log(genre);
    setLoadingState(true);
    getMovieData(genre)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => { // The catch block is now complete
        console.error(error);
        setLoadingState(false);
        setData(null);
        setError(error.message);
      });
  };
  

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="genrename"
              type="text"
              label="Genre"
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value);
              }}
            />
            <Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="w-6 h-6" />
              <p className="text-lg">{data.releaseDate}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaFilm className="w-6 h-6" />
              <p className="text-lg">{data.genre.join(", ")}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaUser className="w-6 h-6" />
              <p className="text-lg">{data.director}</p>
            </div>
            <div className="flex items-center space-x-2">
              <FaStar className="w-6 h-6" />
              <p className="text-lg">{data.rating}</p>
            </div>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a genre</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;

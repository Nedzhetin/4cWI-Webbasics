import { useMovieContext } from "../context/MovieContext";
import { useEffect, useState } from "react";

function Popup({ message, movieID }: { message: string; movieID: number }) {
  // @ts-ignore
  const { favorites } = useMovieContext();
  const isFav = favorites.some((movie: any) => movie.id === movieID);
  const [showAnim, setShowAnim] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setShowAnim(true);
    setTimeout(() => setShowAnim(false), 2500);
    setTimeout(() => setVisible(false), 3000);
  }, [movieID, message]); // run whenever movieID/message

  if (!visible) return null;
  return (
    <div
      className={` fixed top-10 left-1/2 transform -translate-x-1/2 
        text-white p-4 rounded-lg shadow-lg z-50
        ${isFav ? "bg-green-500" : "bg-red-500"}
        transition-transform duration-300
        ${showAnim ? "-translate-y-8" : "-translate-y-32"}`}
    >
      {message}
    </div>
  );
}

export default Popup;

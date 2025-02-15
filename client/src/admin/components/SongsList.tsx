import { ISongData } from "@/types";
import SongCard from "./SongCard";

export const songsData: ISongData[] = [
  {
    _id: "1",
    title: "Người mãi vì em",
    artists: ["Bùi Anh Tuấn"],
    composers: ["Đoàn Minh Vũ"],
    genres: ["POP", "Ballad"],
    thumbnail: "../src/assets/thumb1.jpeg",
  },
  {
    _id: "2",
    title: "Thuận theo ý trời",
    artists: ["Bùi Anh Tuấn"],
    composers: ["Vương Anh Tú"],
    genres: ["POP", "Ballad"],
    thumbnail: "../src/assets/thumb2.jpg",
  },
  {
    _id: "3",
    title: "Hãy trao cho anh",
    artists: ["Sơn Tùng M-TP", "Snoop Dogg"],
    composers: ["Sơn Tùng M-TP", "Snoop Dogg"],
    genres: ["POP", "Rap"],
    thumbnail: "../src/assets/thumb3.png",
  },
  {
    _id: "4",
    title: "Tình yêu đến sau",
    artists: ["Myra Trần"],
    composers: ["Đoàn Minh Vũ"],
    genres: ["POP", "Ballad"],
    thumbnail: "../src/assets/thumb4.jpg",
  },
  {
    _id: "5",
    title: "Toxic till the end",
    artists: ["Rosé"],
    composers: ["Rosé"],
    genres: ["POP", "Ballad"],
    thumbnail: "../src/assets/thumb5.png",
  },
];

const SongsList = () => {
  return (
    <ul
      role="list"
      className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      {songsData.map((songData) => (
        <SongCard key={songData._id} songData={songData} />
      ))}
    </ul>
  );
};

export default SongsList;

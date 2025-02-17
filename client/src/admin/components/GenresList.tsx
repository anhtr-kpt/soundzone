import GenreCard from "./GenreCard";

const genresData = [
  {
    title: "Pop",
    description:
      "A genre characterized by its upbeat and catchy melodies, often appealing to a wide audience.",
    color: "#ff6f61",
    id: 1,
  },
  {
    title: "Rock",
    description:
      "A genre that originated in the 1950s, encompassing a range of styles characterized by a strong beat.",
    color: "#8b0000",
    id: 2,
  },
  {
    title: "Hip Hop",
    description:
      "A genre characterized by rhythmic vocal style and often focuses on social issues.",
    color: "#ffa500",
    id: 3,
  },
  {
    title: "Jazz",
    description:
      "A genre with roots in African American communities, known for its swing and blue notes.",
    color: "#00008b",
    id: 4,
  },
  {
    title: "Classical",
    description:
      "A broad term that usually refers to the long tradition of music that spans from 1750 to the present day.",
    color: "#654321",
    id: 5,
  },
  {
    title: "Electronic",
    description:
      "A genre that uses electronic instruments and technology to produce audio.",
    color: "#00ff00",
    id: 6,
  },
  {
    title: "Reggae",
    description:
      "A music genre that originated in Jamaica, characterized by a rhythmic style and socially conscious lyrics.",
    color: "#d1d1d1",
    id: 7,
  },
  {
    title: "Country",
    description:
      "A genre that originated in the Southern United States, featuring ballads and dance tunes.",
    color: "#f4a460",
    id: 8,
  },
  {
    title: "Blues",
    description:
      "A genre that emerged from African American communities, characterized by its use of specific chord progressions.",
    color: "#0000ff",
    id: 9,
  },
  {
    title: "R&B",
    description:
      "A genre that combines rhythm and blues, often incorporating elements of pop, soul, and funk.",
    color: "#800080",
    id: 10,
  },
];

const GenresList = () => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      {genresData.map((genre) => (
        <GenreCard
          title={genre.title}
          description={genre.description}
          key={genre.id}
          color={genre.color}
        />
      ))}
    </ul>
  );
};

export default GenresList;

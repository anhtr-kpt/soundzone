import ArtistCard from "./ArtistCard";
import { v4 as uuidv4 } from "uuid";

const artistsData = [
  {
    id: uuidv4(),
    name: "John Doe",
    slug: "john-doe",
    bio: "John Doe is an accomplished musician known for his deep voice and heartfelt lyrics.",
    dateOfBirth: new Date("1990-01-15"),
    avatarUrl: "../src/assets/avatar.jpeg",
    bannerUrl: "https://example.com/banner/john-doe-banner.jpg",
    socialLinks: {
      facebook: "https://facebook.com/johndoe",
      instagram: "https://instagram.com/johndoe",
      youtube: "https://youtube.com/johndoe",
    },
    followerCount: 25000,
    isVerified: true,
  },
  {
    id: uuidv4(),
    name: "Jane Smith",
    slug: "jane-smith",
    bio: "Jane Smith has been captivating audiences around the world with her stunning performances.",
    dateOfBirth: new Date("1985-06-30"),
    avatarUrl: "../src/assets/avatar.jpeg",
    bannerUrl: "https://example.com/banner/jane-smith-banner.jpg",
    socialLinks: {
      facebook: "https://facebook.com/janesmith",
      instagram: "https://instagram.com/janesmith",
      youtube: "https://youtube.com/janesmith",
    },
    followerCount: 45000,
    isVerified: true,
  },
  {
    id: uuidv4(),
    name: "Mark Lee",
    slug: "mark-lee",
    bio: "Mark Lee is a talented guitarist and singer-songwriter.",
    dateOfBirth: new Date("1995-04-22"),
    avatarUrl: "../src/assets/avatar.jpeg",
    bannerUrl: null,
    socialLinks: {
      facebook: "https://facebook.com/marklee",
      instagram: "https://instagram.com/marklee",
      youtube: null,
    },
    followerCount: 5200,
    isVerified: false,
  },
  {
    id: uuidv4(),
    name: "Sara Kim",
    slug: "sara-kim",
    bio: "Sara Kim is a pop sensation who has taken the charts by storm.",
    dateOfBirth: new Date("2000-11-05"),
    avatarUrl: "../src/assets/avatar.jpeg",
    bannerUrl: "https://example.com/banner/sara-kim-banner.jpg",
    socialLinks: {
      facebook: "https://facebook.com/sarakim",
      instagram: "https://instagram.com/sarakim",
      youtube: "https://youtube.com/sarakim",
    },
    followerCount: 78000,
    isVerified: true,
  },
  {
    id: uuidv4(),
    name: "Emily White",
    slug: "emily-white",
    bio: "Emily White mixes genres to create unique sounds.",
    dateOfBirth: new Date("1992-09-12"),
    avatarUrl: "../src/assets/avatar.jpeg",
    bannerUrl: "https://example.com/banner/emily-white-banner.jpg",
    socialLinks: {
      facebook: "https://facebook.com/emilywhite",
      instagram: "https://instagram.com/emilywhite",
      youtube: "https://youtube.com/emilywhite",
    },
    followerCount: 33000,
    isVerified: false,
  },
  {
    id: uuidv4(),
    name: "Robert Brown",
    slug: "robert-brown",
    bio: "Robert Brown is a master of the piano with soulful melodies.",
    dateOfBirth: new Date("1988-11-20"),
    avatarUrl: "../src/assets/avatar.jpeg",
    bannerUrl: null,
    socialLinks: {
      facebook: "https://facebook.com/robertbrown",
      instagram: "https://instagram.com/robertbrown",
      youtube: null,
    },
    followerCount: 21000,
    isVerified: true,
  },
  {
    id: uuidv4(),
    name: "Lisa Green",
    slug: "lisa-green",
    bio: "Lisa Green is an indie artist known for her poetic lyrics.",
    dateOfBirth: new Date("1994-02-14"),
    avatarUrl: "../src/assets/avatar.jpeg",
    bannerUrl: "https://example.com/banner/lisa-green-banner.jpg",
    socialLinks: {
      facebook: "https://facebook.com/lisagreen",
      instagram: "https://instagram.com/lisagreen",
      youtube: "https://youtube.com/lisagreen",
    },
    followerCount: 6000,
    isVerified: false,
  },
  {
    id: uuidv4(),
    name: "Steve Brown",
    slug: "steve-brown",
    bio: "Steve Brown brings a unique blend of rock and jazz.",
    dateOfBirth: new Date("1975-07-30"),
    avatarUrl: "../src/assets/avatar.jpeg",
    bannerUrl: "https://example.com/banner/steve-brown-banner.jpg",
    socialLinks: {
      facebook: "https://facebook.com/stevebrown",
      instagram: "https://instagram.com/stevebrown",
      youtube: null,
    },
    followerCount: 15000,
    isVerified: true,
  },
  {
    id: uuidv4(),
    name: "Sophia Turner",
    slug: "sophia-turner",
    bio: "Sophia Turner has been breaking records with her catchy tunes.",
    dateOfBirth: new Date("1996-03-15"),
    avatarUrl: "../src/assets/avatar.jpeg",
    bannerUrl: "https://example.com/banner/sophia-turner-banner.jpg",
    socialLinks: {
      facebook: "https://facebook.com/sophiaturner",
      instagram: "https://instagram.com/sophiaturner",
      youtube: "https://youtube.com/sophiaturner",
    },
    followerCount: 97000,
    isVerified: true,
  },
  {
    id: uuidv4(),
    name: "James Lee",
    slug: "james-lee",
    bio: "James Lee is known for his exceptional guitar skills.",
    dateOfBirth: new Date("1987-12-09"),
    avatarUrl: "../src/assets/avatar.jpeg",
    bannerUrl: null,
    socialLinks: {
      facebook: "https://facebook.com/jameslee",
      instagram: "https://instagram.com/jameslee",
      youtube: "https://youtube.com/jameslee",
    },
    followerCount: 34000,
    isVerified: false,
  },
  {
    id: uuidv4(),
    name: "Ella Gray",
    slug: "ella-gray",
    bio: "Ella Gray's music speaks to the heart.",
    dateOfBirth: new Date("1991-08-25"),
    avatarUrl: "../src/assets/avatar.jpeg",
    bannerUrl: "https://example.com/banner/ella-gray-banner.jpg",
    socialLinks: {
      facebook: "https://facebook.com/ellagray",
      instagram: "https://instagram.com/ellagray",
      youtube: "https://youtube.com/ellagray",
    },
    followerCount: 110000,
    isVerified: true,
  },
];

const ArtistsList = () => {
  return (
    <ul
      role="list"
      className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
    >
      {artistsData.map((artistData) => (
        <ArtistCard key={artistData.id} artistData={artistData} />
      ))}
    </ul>
  );
};

export default ArtistsList;

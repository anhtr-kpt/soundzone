import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "@/components/common/SignInPage";
import AdminLayout from "@/layouts/AdminLayout";
import { AdminGuard } from "./Guards/AdminGuard";
import {
  DashboardPage as AdminDashboard,
  UsersPage as AdminUsers,
  SongsPage as AdminSongs,
  SongDetailPage as AdminSongDetail,
  ArtistDetailPage as AdminArtistDetail,
  CreateSongPage as AdminCreateSong,
  CreateArtistPage as AdminCreateArtist,
  ArtistsPage as AdminArtists,
  GenresPage as AdminGenres,
  CreateGenrePage as AdminCreateGenre,
  PlaylistsPage as AdminPlaylists,
} from "@/admin/pages";

const router = createBrowserRouter([
  // Public routes
  {
    path: "/signin",
    element: <SignInPage />,
  },
  // Admin routes
  {
    path: "/admin/*",
    element: (
      <AdminGuard>
        <AdminLayout />
      </AdminGuard>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "songs",
        element: <AdminSongs />,
      },
      {
        path: "songs/:id",
        element: <AdminSongDetail />,
      },
      {
        path: "songs/create-song",
        element: <AdminCreateSong />,
      },
      {
        path: "artists",
        element: <AdminArtists />,
      },
      {
        path: "genres",
        element: <AdminGenres />,
      },
      {
        path: "genres/create-genre",
        element: <AdminCreateGenre />,
      },
      {
        path: "artists/:id",
        element: <AdminArtistDetail />,
      },
      {
        path: "artists/create-artist",
        element: <AdminCreateArtist />,
      },
      {
        path: "playlists",
        element: <AdminPlaylists />,
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

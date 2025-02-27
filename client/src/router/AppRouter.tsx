import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingSpinner from "@/common/components/LoadingSpinner";
import AdminLayout from "@/layouts/AdminLayout";
import { AdminGuard } from "./Guards/AdminGuard";

// Public pages
const Login = lazy(() => import("@/admin/pages/Login"));

// Admin pages
const AdminDashboard = lazy(() => import("@/admin/pages/Dashboard"));
const AdminSongs = lazy(() => import("@/admin/pages/Songs"));
const AdminArtists = lazy(() => import("@/admin/pages/Artists"));
const AdminPlaylists = lazy(() => import("@/admin/pages/Playlists"));
const AdminUsers = lazy(() => import("@/admin/pages/Users"));
const AdminSongDetail = lazy(() => import("@/admin/pages/SongDetail"));
const AdminCreateSong = lazy(() => import("@/admin/pages/CreateSong"));
const AdminArtistDetail = lazy(() => import("@/admin/pages/ArtistDetail"));
const AdminCreateArtist = lazy(() => import("@/admin/pages/CreateArtist"));
const AdminGenres = lazy(() => import("@/admin/pages/Genres"));
const AdminCreateGenre = lazy(() => import("@/admin/pages/CreateGenre"));

// User pages
// const UserDashboard = lazy(() => import("@/user/pages/Dashboard"));
// const UserSongs = lazy(() => import("@/user/pages/Songs"));
// const UserArtists = lazy(() => import("@/user/pages/Artists"));
// const UserPlaylists = lazy(() => import("@/user/pages/Playlists"));
// const UserUsers = lazy(() => import("@/user/pages/Users"));

// const UserLayout = lazy(() => import("@/layouts/UserLayout"));

const router = createBrowserRouter([
  // Public routes
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Login />
      </Suspense>
    ),
  },
  // Admin routes
  {
    path: "/admin/*",
    element: (
      <AdminGuard>
        <Suspense fallback={<LoadingSpinner />}>
          <AdminLayout />
        </Suspense>
      </AdminGuard>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminUsers />
          </Suspense>
        ),
      },
      {
        path: "songs",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSongs />
          </Suspense>
        ),
      },
      {
        path: "songs/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminSongDetail />
          </Suspense>
        ),
      },
      {
        path: "songs/create-song",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminCreateSong />
          </Suspense>
        ),
      },
      {
        path: "artists",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminArtists />
          </Suspense>
        ),
      },
      {
        path: "genres",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminGenres />
          </Suspense>
        ),
      },
      {
        path: "genres/create-genre",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminCreateGenre />
          </Suspense>
        ),
      },
      {
        path: "artists/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminArtistDetail />
          </Suspense>
        ),
      },
      {
        path: "artists/create-artist",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminCreateArtist />
          </Suspense>
        ),
      },
      {
        path: "playlists",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminPlaylists />
          </Suspense>
        ),
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};

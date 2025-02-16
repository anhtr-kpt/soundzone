import { RouteObject } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingSpinner from "@/common/components/LoadingSpinner";

const AdminDashboard = lazy(() => import("@/admin/pages/Dashboard"));
const AdminSongs = lazy(() => import("@/admin/pages/Songs"));
const AdminArtists = lazy(() => import("@/admin/pages/Artists"));
const AdminPlaylists = lazy(() => import("@/admin/pages/Playlists"));
const AdminUsers = lazy(() => import("@/admin/pages/Users"));
const AdminSongDetail = lazy(() => import("@/admin/pages/SongDetail"));
const AdminCreateSong = lazy(() => import("@/admin/pages/CreateSong"));
const AdminArtistDetail = lazy(() => import("@/admin/pages/ArtistDetail"));
const AdminCreateArtist = lazy(() => import("@/admin/pages/CreateArtist"));

const UserDashboard = lazy(() => import("@/user/pages/Dashboard"));
const UserSongs = lazy(() => import("@/user/pages/Songs"));
const UserArtists = lazy(() => import("@/user/pages/Artists"));
const UserPlaylists = lazy(() => import("@/user/pages/Playlists"));
const UserUsers = lazy(() => import("@/user/pages/Users"));

const UserLayout = lazy(() => import("@/layouts/UserLayout"));

export const adminRoutes: RouteObject[] = [
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
];

export const userRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <UserLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserDashboard />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserUsers />
          </Suspense>
        ),
      },
      {
        path: "songs",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserSongs />
          </Suspense>
        ),
      },
      {
        path: "artists",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserArtists />
          </Suspense>
        ),
      },
      {
        path: "playlists",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserPlaylists />
          </Suspense>
        ),
      },
    ],
  },
];

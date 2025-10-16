// import { useState } from 'react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { useDebounce } from 'use-debounce';
// import {
//   fetchNotes,
//   createNote,
//   deleteNote,
//   type FetchNotesResponse,
// } from '../../services/noteService';
// import NoteList from '../NoteList/NoteList';
// import { SearchBox } from '../SearchBox/SearchBox';
// import { Pagination } from '../Pagination/Pagination';
// import { Loader } from '../Loader/Loader';
// import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
// import { EmptyState } from '../EmptyState/EmptyState';
// import { Modal } from '../Modal/Modal';
// import NoteForm from '../NoteForm/NoteForm';
// import type { NoteTag } from '../../types/note';
// import css from './App.module.css';

// export default function App() {
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [debouncedSearch] = useDebounce(searchTerm, 500);
//   const [showModal, setShowModal] = useState(false);

//   const queryClient = useQueryClient();

//   const { data, isLoading, error } = useQuery<FetchNotesResponse, Error>({
//     queryKey: ['notes', page, debouncedSearch],
//     queryFn: () =>
//       fetchNotes({ page, perPage: 12, search: debouncedSearch }),
//     placeholderData: (prevData) => prevData,
//     staleTime: 5000,
//   });

//   const handleCreateNote = async (note: {
//     title: string;
//     content: string;
//     tag: NoteTag;
//   }) => {
//     try {
//       await createNote(note);
//       queryClient.invalidateQueries({ queryKey: ['notes'] });
//       setShowModal(false);
//     } catch (err) {
//       console.error('Failed to create note:', err);
//     }
//   };

//   const handleDeleteNote = async (id: string) => {
//     try {
//       await deleteNote(id);
//       queryClient.invalidateQueries({ queryKey: ['notes'] });
//     } catch (err) {
//       console.error('Failed to delete note:', err);
//     }
//   };

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox value={searchTerm} onChange={setSearchTerm} />
//         {data && data.totalPages > 1 && (
//           <Pagination
//             pageCount={data.totalPages}
//             onPageChange={({ selected }) => setPage(selected + 1)}
//           />
//         )}
//         <button className={css.button} onClick={() => setShowModal(true)}>
//           Create note +
//         </button>
//       </header>

//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <NoteForm onSubmit={handleCreateNote} onClose={() => setShowModal(false)} />
//         </Modal>
//       )}

//       {isLoading && <Loader />}
//       {error && <ErrorMessage message="Failed to load notes." />}
//       {!isLoading && !error && data?.notes.length === 0 && <EmptyState />}
//       {data && data.notes.length > 0 && (
//         <NoteList notes={data.notes} onDelete={handleDeleteNote} />
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import {
  fetchNotes,
  // createNote,
  deleteNote,
  type FetchNotesResponse,
} from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import { SearchBox } from "../SearchBox/SearchBox";
import { Pagination } from "../Pagination/Pagination";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { EmptyState } from "../EmptyState/EmptyState";
import { Modal } from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
// import type { NoteTag } from "../../types/note";
import css from "./App.module.css";

export default function App() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    placeholderData: prevData => prevData,
    staleTime: 5000,
  });

  // const handleCreateNote = async (note: {
  //   title: string;
  //   content: string;
  //   tag: NoteTag;
  // }) => {
  //   try {
  //     await createNote(note);
  //     queryClient.invalidateQueries({ queryKey: ["notes"] });
  //     setShowModal(false);
  //   } catch (err) {
  //     console.error("Failed to create note:", err);
  //   }
  // };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={setSearchTerm} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data?.totalPages ?? 1}
            currentPage={page}
            onPageChange={({ selected }) => setPage(selected + 1)}
          />
        )}
        <button className={css.button} onClick={() => setShowModal(true)}>
          Create note +
        </button>
      </header>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm
            // onSubmit={handleCreateNote}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}

      {isLoading && <Loader />}
      {error && <ErrorMessage message="Failed to load notes." />}
      {/* {!isLoading && !error && data?.notes.length === 0 && <EmptyState />} */}
      {data?.notes?.length ? (
        <NoteList notes={data.notes} onDelete={handleDeleteNote} />
      ) : (
        !isLoading && !error && <EmptyState />
      )}
    </div>
  );
}

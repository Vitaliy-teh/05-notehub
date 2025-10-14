import axios from "axios";
import type { Note } from "../types/note";

const API_BASE = "https://notehub-public.goit.study/api";
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.headers.common["Authorization"] = `Bearer ${TOKEN}`;

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, unknown> = { page, perPage };
  if (search) params.search = search;

  const { data } = await axios.get<FetchNotesResponse>(`${API_BASE}/notes`, { params });
  return data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const { data } = await axios.post<Note>(`${API_BASE}/notes`, note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`${API_BASE}/notes/${id}`);
  return data;
};

import { useFormik } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import type { Note, NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";

interface NoteFormProps {
  onClose: () => void;
  onSubmit?: (note: {
    title: string;
    content: string;
    tag: NoteTag;
  }) => Promise<void>;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutateAsync, isPending } = useMutation<
    Note,
    Error,
    Omit<Note, "id" | "createdAt" | "updatedAt">
  >({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (err: Error) => {
      console.error("Failed to create note:", err);
    },
  });



  const formik = useFormik({
    initialValues: { title: "", content: "", tag: "Todo" as NoteTag },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Min 3 chars")
        .max(50, "Max 50 chars")
        .required("Title is required"),
      content: Yup.string().max(500, "Max 500 chars"),
      tag: Yup.mixed<NoteTag>()
        .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await mutateAsync(values);
        onClose();
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={css.input}
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        {formik.touched.title && formik.errors.title && (
          <span className={css.error}>{formik.errors.title}</span>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={formik.values.content}
          onChange={formik.handleChange}
        />
        {formik.touched.content && formik.errors.content && (
          <span className={css.error}>{formik.errors.content}</span>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={formik.values.tag}
          onChange={formik.handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {formik.touched.tag && formik.errors.tag && (
          <span className={css.error}>{formik.errors.tag}</span>
        )}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={onClose}
          disabled={formik.isSubmitting || isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={formik.isSubmitting || isPending}
        >
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}

import { useFormik } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import type { NoteTag } from '../../types/note';

interface NoteFormProps {
  onClose: () => void;
  onSubmit: (note: { title: string; content: string; tag: NoteTag }) => Promise<void>;
}

export default function NoteForm({ onClose, onSubmit }: NoteFormProps) {
  const formik = useFormik({
    initialValues: { title: '', content: '', tag: 'Todo' as NoteTag },
    validationSchema: Yup.object({
      title: Yup.string().min(3, 'Min 3 chars').max(50, 'Max 50 chars').required('Required'),
      content: Yup.string().max(500, 'Max 500 chars'),
      tag: Yup.mixed<NoteTag>().oneOf(['Todo','Work','Personal','Meeting','Shopping']).required('Required'),
    }),
    onSubmit: async (values) => {
      await onSubmit(values);
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" className={css.input} value={formik.values.title} onChange={formik.handleChange} />
        {formik.touched.title && formik.errors.title && <span className={css.error}>{formik.errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={8} className={css.textarea} value={formik.values.content} onChange={formik.handleChange} />
        {formik.touched.content && formik.errors.content && <span className={css.error}>{formik.errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select} value={formik.values.tag} onChange={formik.handleChange}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {formik.touched.tag && formik.errors.tag && <span className={css.error}>{formik.errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onClose}>Cancel</button>
        <button type="submit" className={css.submitButton} disabled={formik.isSubmitting}>Create note</button>
      </div>
    </form>
  );
}

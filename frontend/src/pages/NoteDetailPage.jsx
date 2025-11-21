import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import { Link, useParams } from 'react-router';

import api from '../lib/axios';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true)
  const [saving,setSaving] = useState(false)

  const navigate = useNavigate()

  const { id } = useParams(); //ngambil parameter bernama :id dari url

  useEffect(()=> {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log("Error: ",error);
        toast.error("Failed to fetch the note")
      } finally {
        setLoading(false)
      }
    }

    fetchNote();

  },[id])
  //artinya useEffect(function, [id]) akan jalan tiap ada perubahan di id.

  const handleDelete = async () =>{
    //e.preventDefault();

    if (!window.confirm("yaqin?")) return;

    try {
      await api.delete(`/notes/${id}`);
      //setNotes((prev) => prev.filter(note => note._id !== id)) //nampilin semua kecuali yang dihapus.
      toast.success("note deleted successfully");
      navigate("/")
    } catch (error) {
      console.log("Error deleting the note: ",error);
      toast.error("failed to delete notes");
    }
  }
  const handleSave = async () => {
    if (!note.title.trim()|| !note.content.trim()){
      toast.error("Please add a title or content")
      return;
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`)
    } catch (error) {
      console.log("Error saving the note: ",error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false)
    }
  };

  // loading state
  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    );
  }

  return (
<div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
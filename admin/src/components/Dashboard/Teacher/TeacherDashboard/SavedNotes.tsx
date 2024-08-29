import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Table } from "antd";
import axios from "axios";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../../config";
import { AuthContext } from "../../../context/AuthProvider";
import { TeachingNoteData } from "../../common/A_T_teaching-note/TeachingNotes";

const TeachingNotesRender: React.FC = () => {
  const globles = useContext(AuthContext);
  if (!globles) return null;
  const { token } = globles;
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingL, setLoadingL] = useState<boolean>(false);
  const [savedNoteIds, setSavedNoteIds] = useState<Set<string>>(
    new Set<string>()
  );
  const [teachingSavedNotes, setTeachingSavedNotes] = useState<
    TeachingNoteData[]
  >([]);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (token) fetchSavedData();
  }, [token, loadingL]);

  const fetchSavedData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.SERVER}/teaching-notes/saved-notes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const savedNotes = response.data.notes;
      setTeachingSavedNotes(savedNotes);
      setSavedNoteIds(
        new Set<string>(savedNotes.map((note: TeachingNoteData) => note._id))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const togggleSaved = async (id: string) => {
    try {
      const response = await axios.get(
        `${config.SERVER}/teaching-notes/toggle-save`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            noteId: id,
          },
        }
      );
      const updatedNoteIds = new Set<string>(
        response.data.notes.map((note: TeachingNoteData) => note._id)
      );
      setSavedNoteIds(updatedNoteIds);
    } catch (error) {
      console.error(error);
    } finally {
      handleLoading();
    }
  };

  const handleLoading = () => {
    setLoadingL((pre) => !pre);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
        <div className="d-flex gap-2">
          <Button
            type="text"
            icon={<VisibilityIcon />}
            onClick={() => navigate(`/teacher/teaching-notes/${id}`)}
          />

          <Button
            type="text"
            icon={
              savedNoteIds.has(id) ? <BookmarkIcon /> : <BookmarkBorderIcon />
            }
            onClick={() => togggleSaved(id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="m-0">Saved Notes</h4>
        <p className="m-0 bg-body-secondary py-2 px-3  rounded-circle d-flex justify-content-center align-items-center">
          <span className="text-danger">{teachingSavedNotes.length}</span>
        </p>
      </div>
      <div className="table-responsive">
        <Table
          dataSource={teachingSavedNotes}
          columns={columns}
          rowKey="_id"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default TeachingNotesRender;

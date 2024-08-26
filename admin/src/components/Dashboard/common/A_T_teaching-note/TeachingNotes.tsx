import React, { useState } from "react";
import { Button, Tabs, Tooltip } from "antd";

interface TeachingNote {
  label: string;
  link: string;
}

const TeachingNotes: React.FC = () => {
  return (
    <div>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className="text-uppercase">Teaching Notes</h5>
      </div>
      <Tabs defaultActiveKey="1" className="ps-1">
        <Tabs.TabPane tab="Notes" key="1">
          <TeachingNotesRender />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Add" key="2">
          {/* Add Teaching Notes content goes here */}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

const TeachingNotesRender: React.FC = () => {
  const [teachingNotes] = useState<TeachingNote[]>([
    { label: "Note 1", link: "https://example.com/note1" },
    { label: "Note 2", link: "https://example.com/note2" },
    { label: "Note 3", link: "https://example.com/note3" },
  ]);

  return (
    <div className="mx-auto">
      <h2 className="mb-4">Teaching Notes</h2>
      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col" className="text-start">Label</th>
            <th scope="col" className="text-start">Link</th>
          </tr>
        </thead>
        <tbody>
          {teachingNotes.map((note, index) => (
            <tr key={index}>
              <td>{note.label}</td>
              <td>
                <Tooltip title="View Teaching Note">
                  <Button
                    type="link"
                    href={note.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </Button>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeachingNotes;

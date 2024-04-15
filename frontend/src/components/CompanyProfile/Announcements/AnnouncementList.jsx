import React from "react";

const AnnouncementList = ({ announcements, onEdit, onDelete }) => {
  return (
    <div className="card w-100">
      <div className="card-body">
        <h5 className="card-title">Live Announcements</h5>
        <ul className="list-unstyled">
          {announcements.map(({ id, content }) => {
            console.log(id);
            return (
              <li key={id}>
                {content}
                <div className="mt-2">
                  <button className="btn btn-link" onClick={() => onEdit(id)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-link text-danger"
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AnnouncementList;

import "./editProfile.css";
import { PermMedia, Cancel } from "@material-ui/icons";
import { useState } from "react";

export const EditProfile = () => {
  const [coverFile, setCoverFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  return (
    <form className="edit-profile-form">
      <div className="edit-info">
        <div className="edit-inputs">
            <input type="text" placeholder="Имя Фамилия" />
            <input type="text" placeholder="Город" />
            <div className="relation-option">
                <input
                type="radio"
                id="single"
                value="В активном поиске"
                name="relationship"
                />
                <label for="single">В активном поиске</label>
                <input type="radio" id="married" value="В браке" name="relationship" />
                <label for="married">В браке</label>
                <input
                type="radio"
                id="relation"
                value="В отношениях"
                name="relationship"
                />
                <label for="relation">В отношениях</label>
            </div>
            <label htmlFor="cover" className="photo-option">
                <PermMedia htmlColor="var(--color-primary)" className="shareIcon" />
                <span>Изменить фон</span>
                <input
                type="file"
                id="cover"
                accept=".png, .jpeg, .gif, .jpg"
                onChange={(e) => setCoverFile(e.target.files[0])}
                />
            </label>
            <label htmlFor="avatar" className="photo-option">
                <PermMedia htmlColor="var(--color-primary)" className="shareIcon" />
                <span>Изменить аватар</span>
                <input
                type="file"
                id="avatar"
                accept=".png, .jpeg, .gif, .jpg"
                onChange={(e) => setAvatarFile(e.target.files[0])}
                />
            </label>
        </div>
        {avatarFile && (
            <div className="avatar-image-container">
            <img
                src={URL.createObjectURL(avatarFile)}
                alt="share"
                className="avatar-pre"
            />
            <Cancel
                className="share-cancel"
                onClick={() => setAvatarFile(null)}
            />
            </div>
        )}
      </div>
      {coverFile && (
        <div className="share-image">
          <img src={URL.createObjectURL(coverFile)} alt="share" />
          <Cancel className="share-cancel" onClick={() => setCoverFile(null)} />
        </div>
      )}
    </form>
  );
};

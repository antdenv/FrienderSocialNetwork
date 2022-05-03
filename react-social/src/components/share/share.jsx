import './share.css';
import {PermMedia, Cancel} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import {AuthContext} from '../../context/authContext';
import axios from 'axios';

export const Share = () => {
    const {user, dispatch, isUpdated} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const post = {
            userId: user.id,
            desc: desc.current.value,
        };
        
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename);
            data.append('file', file);
            post.image = filename;
            try {
                await axios.post('/upload', data);
            } catch(error) {
                console.log(error);
            }
        }

        try {
            await axios.post('/posts', post);
            dispatch({type: 'FEED_UPDATED', payload: !isUpdated});
            setFile(null);
            desc.current.value = '';
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='create-post'>
                <div className='share-form'>
                    <div className='profile'>
                        <img src={user.profilePicture || PF + 'person/empty.png'} alt="avatar"/>
                        <input 
                            type="text" 
                            placeholder="Расскажите, что у Вас произошло нового?" 
                            id="create-post"
                            ref={desc}
                        />
                    </div>
                    <div className="interaction">
                        <div className="shareOptions">
                            <label htmlFor='file' className="shareOption">
                                <PermMedia htmlColor="hsl(0, 95%, 65%)" className="shareIcon"/>
                                <input 
                                    type="file" 
                                    id="file" 
                                    accept=".png, .jpeg, .gif, .jpg"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </label>
                            <input type="submit" value="Создать" className="btn btn-primary create-btn"/>
                        </div>
                    </div>
                </div>
                {file && (
                    <div className='share-image'>
                        <img src={URL.createObjectURL(file)} alt="share"/>
                        <Cancel className='share-cancel' onClick={() => setFile(null)}/>
                    </div>
                )}
            </div>
        </form>
    );
}
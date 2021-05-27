import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import { storage, db } from './firebase';
import './ImageUpload.css';

function ImageUpload({user}) {

    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);

    function handleChange (e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    //This will upload the image, and when the image is done uploading will create a post in the database with the caption,
    //with a timestamp, the username of the user posting, and a link to the uploaded image (stored in firebase storage)
    function handleUpload () {
        //Create an upload with storage reference at "images/${image.name}", and update the image there
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        //Listening to the upload to create the progress bar along the way, detect any errors, and finally get the download
        //link of the uploaded image and store that link in our database.
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //The progress function ... 
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) => {
                //Error function...
                console.log(error);
            },
            () => {
                //complete function... we get the url of the uploaded image and post it to our database.
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside the database.
                        db.collection("posts").add({
                            //we create a timestamp with the firebase server time
                            timestamp: firebase.firestore.FieldValue.serverTimestamp() ,
                            //we put the caption of the user (from our state)
                            caption: caption,
                            //We take the url we got from the uploaded image
                            imageUrl: url,
                            username: user.displayName
                        });

                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }
        )
    }

    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100"/>
            <input type="text" placeholder="Enter a caption..." value={caption} onChange={(e) => setCaption(e.target.value)}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload

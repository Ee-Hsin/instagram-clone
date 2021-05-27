import React, { useState, useEffect } from 'react';
import './Post.css';
import { db } from './firebase';
import firebase from 'firebase';
import Avatar from "@material-ui/core/Avatar";
import { Button } from '@material-ui/core';

function Post({ postId, username, caption, imageUrl, signedInUser}) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    //this fectches the comments of the post, and will update every time this component is re-rendered.
    useEffect(() => {
        let unsubscribe;

        if(postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp','asc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => {
                        return doc.data()
                    }))
                });
        }

        return () => {
            unsubscribe();
        };

    }, [postId])


    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: signedInUser.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar"
                    alt={username}
                    src=""
                />
                <h3>{username}</h3>
            </div>
            <img className="post__image" src={imageUrl} alt=""/>
            <h4 className="post__text"><strong> {username}</strong> {caption}</h4>            
            <div className="post__comments">
                {comments.map((comm) => (
                    <p>
                        <b>{comm.username}</b>{comm.text}
                    </p>
                ))}
            </div>
            <form className="post__commentBox">
                <input 
                    type="text"
                    className="post__input"
                    placeholder="Enter a comment..."
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                />
                <Button 
                    type="submit"
                    className="post__button"
                    disabled={!comment || !signedInUser}
                    onClick={postComment}
                >Post</Button>
            </form> 
        </div>
    )
}

export default Post

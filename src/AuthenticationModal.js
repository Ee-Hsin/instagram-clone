import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  //Props: open, setOpen, username, setUsername, email, setEmail, password, setPassword, openSignIn, setOpenSignIn, signIn, signUp
function AuthenticationModal(props) {

    const {open, setOpen, username, setUsername, email, setEmail, password, setPassword, openSignIn, setOpenSignIn, signIn, signUp} = props;

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                <form className="app__signup">
                    <center>
                        <img
                        className="app_headerImage"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
                        alt=""
                    />
                    </center>
                    <Input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                    />
                    <Input
                        type="text"
                        placeholder="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    <Button type="submit" onClick={signUp}>Sign Up</Button>
                </form>
                </div>
            </Modal>
            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                <form className="app__signup">
                    <center>
                        <img
                        className="app_headerImage"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
                        alt=""
                    />
                    </center>
                    <Input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                    <Input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                    <Button type="submit" onClick={signIn}>Sign In</Button>
                </form>
                </div>
            </Modal>
        </>
    )
}

export default AuthenticationModal

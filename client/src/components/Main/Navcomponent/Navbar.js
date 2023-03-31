import React from 'react'
import { Button, Stack } from '@mui/material'
import styles from "../styles.module.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  return (
    <>
      <div className={styles.main_container}>
        <nav className={styles.navbar}>
          <h1> BLOG WEBSITE </h1>{" "}
          <Stack direction={"row"} spacing={2}>
            <Link to={"/home"}><Button style={{ color: "white" }} variant="outlined">
              HOME{" "}
            </Button>{" "}
            </Link>
            <Link to={"/createpost"}><Button style={{ color: "white" }} variant="outlined">
              CREATE POST{" "}
            </Button>{" "}
            </Link>
            <Link to={"/userprofile"}><Button style={{ color: "white" }} variant="outlined">
              USER 'S PROFILE{" "}
            </Button>{" "}
            </Link>
          </Stack>{" "}
          <button className={styles.white_btn} onClick={handleLogout}>
            Logout{" "}
          </button>{" "}
        </nav>{" "}
      </div>{" "}
    </>
  )
}

export default Navbar
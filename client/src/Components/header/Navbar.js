import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { makeStyles } from "@mui/styles";
import { NavLink, useNavigate } from "react-router-dom";
import mdvlogo from "../../Images/mdvlogo.png";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions";
import { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton, Drawer, List, ListItem } from "@mui/material";
import RightSlide from "./RightSlide";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import { Badge } from "@mui/material";
import { Avatar } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";

const useStyle = makeStyles({
  component: {
    marginTop: 10,
    marginRight: "-50px",
    width: "300px",
    padding: 50,
    height: "300px",
  },
});

const Navbar = () => {
  const classes = useStyle();

  const [text, setText] = useState();
  const [open, setOpen] = useState(false);
  const [openList, setOpenList] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleClick = (e) => {
    setOpen(e.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { account, setAccount } = useContext(LoginContext);

  const getValidUserDetails = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (res.status !== 201) {
      console.log("initial login");
    } else {
      setAccount(data);
    }
  };

  useEffect(() => {
    getValidUserDetails();
  }, []);

  const logoutUser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentails: "include",
    });

    const data2 = await res2.json();
    console.log(data2);

    if (!res2.status === 201) {
      const error = new Error(res2.error);
      throw error;
    } else {
      setAccount(false);
      setOpen(false);
      toast.success("Logout Successful!", {
        position: "top-right",
      });
      navigate("/home");
    }
  };

  const handelOpen = () => {
    setOpenDrawer(true);
  };

  const handleCloseDr = () => {
    setOpenDrawer(false);
  };

  const getText = (text) => {
    setText(text);
    setOpenList(false);
  };

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handelOpen}>
            <MenuSharpIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer open={openDrawer} onClose={handleCloseDr}>
            <RightSlide userLog={logoutUser} logClose={handleCloseDr} />
          </Drawer>
          <div className="navlogo">
            <NavLink to="/home">
              <img src={mdvlogo} alt="logo" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              name=""
              onChange={(e) => getText(e.target.value)}
              placeholder="Search your dream vehicles..."
            />
            <div className="search_icon">
              <i className="fa fa-search" id="search"></i>
            </div>
            {text && (
              <List className="extrasearch" hidden={openList}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem>
                      <NavLink
                        to={`/getproduct/${product.id}`}
                        onClick={() => setOpenList(true)}
                      >
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          {account ? (
            <div className="nav_btn">
              <NavLink to="" onClick={logoutUser}>
                <i className="fa fa-sign-out"></i> Logout
              </NavLink>
            </div>
          ) : (
            <div className="nav_btn">
              <NavLink to="/login">
                <i className="fa fa-sign-in"></i> Sign In
              </NavLink>
            </div>
          )}
          {account ? (
            <NavLink to={"/buynow"}>
              <div className="order_btn">
                <Badge badgeContent={account.orders.length} color="primary">
                  <i className="fa fa-first-order"></i>
                </Badge>
                <p>Orders</p>
              </div>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <div className="order_btn">
                <Badge badgeContent={0}>
                  <i className="fa fa-first-order"></i>
                </Badge>
                <p>Orders</p>
              </div>
            </NavLink>
          )}

          {account ? (
            <Avatar
              className="avtar2"
              onClick={handleClick}
              title={account.fname.toUpperCase()}
            >
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className="avtar" onClick={handleClick} />
          )}

          <div className="menu_div">
            <Menu
              anchorEl={open}
              open={Boolean(open)}
              onClose={handleClose}
              className={classes.component}
            >
              <MenuItem onClick={handleClose} style={{ margin: 10 }}>
                <i className="fa fa-user-circle"></i> &nbsp; My Account
              </MenuItem>
              {account ? (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logoutUser();
                  }}
                  style={{ margin: 10 }}
                >
                  <i className="fa fa-sign-out"></i> &nbsp; Logout
                </MenuItem>
              ) : (
                ""
              )}
            </Menu>
          </div>
          <ToastContainer />
        </div>
      </nav>
    </header>
  );
};
export default Navbar;

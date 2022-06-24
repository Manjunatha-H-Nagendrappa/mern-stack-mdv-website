import React, { useContext } from "react";
import { LoginContext } from "../context/ContextProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Option = ({ deleteData, get }) => {
  const { account, setAccount } = useContext(LoginContext);
  console.log("account info", account);

  const removeData = async (id) => {
    try {
      const res = await fetch(`remove/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log("option data", data);

      if (res.status === 400 || !data) {
        console.log("Delete error");
      } else {
        setAccount(data);
        get();
        toast.success("Vehicle is removed from orders!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log("Remove error in frontend", error.message);
    }
  };

  return (
    <div className="add_remove_select" key={deleteData}>
      <select name="" id="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p onClick={() => removeData(deleteData)} style={{ cursor: "pointer" }}>
        Delete
      </p>
      <span>|</span>
      <p className="forremovemedia">Save or Later</p>
      <span>|</span>
      <p className="forremovemedia">See More like this</p>
      <ToastContainer />
    </div>
  );
};

export default Option;

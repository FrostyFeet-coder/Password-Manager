import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async() => {
    let req = await fetch("http://localhost:3000");
        let passwords = await req.json()
        if (passwords) {
          setPasswordArray(passwords);
        }


  }

  useEffect(() => {
    getPasswords()
    let passwordArray;
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      //  passwordRef.current.type = "password";
    } else {
      //  passwordRef.current.type = "text";
      passwordRef.current.type = "password";
      ref.current.src = "icons/eyecross.png";
    }
  };
  const savePassword = async() => {
if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            // If any such id exists in the db, delete it 
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            // Otherwise clear the form and show toast
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
} else {
      toast("Error: Password not saved!");
    }
  };

  const deletePassword = async(id) => {
    console.log("Deleting password with id ", id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const copyText = (text) => {
    alert(text);
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.log(text);
    navigator.clipboard.writeText(text);
  };

  const editPassword = (id) => {
    console.log("Editing password with id ", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));

    toast("Password Edited!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="p-2 md:p-0 md:mycontainer">
        <h1 className="text-white text-4xl font-bold text-center">
          PassManager
        </h1>
        <p className="text-white text-lg text-center">
          Your Local Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-3 items-center">
          <input
            className="rounded-full border-2 border-purple-300 w-full p-4 py-3"
            type="text"
            name="site"
            id=""
            placeholder="Enter Website URL"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex flex-col md:flex-row w-full gap-4 justify-between">
            <input
              className="rounded-full border-2 border-purple-300 w-full p-4 py-3"
              type="text"
              name="username"
              id=""
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
            />
            <div className="relative">
              <input
                ref={passwordRef}
                className="rounded-full border-2 border-purple-300 w-full p-4 py-3"
                type="password"
                name="password"
                id=""
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="absolute right-0 top-0 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-3"
                  width={50}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="text-black border-2 border-white flex justify-center items-center bg-purple-400 rounded-full px-10 py-2 w-fit "
          >
            {" "}
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>{" "}
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4 text-white">Your Passwords</h2>
          {passwordArray.length === 0 && (
            <div className="text-white"> No passwords to show</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-violet-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-violet-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 border border-white text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;

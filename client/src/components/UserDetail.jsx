import React, { useEffect, useState } from "react";

const UserDetail = () => {
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      fetch("http://localhost:5000/userData", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Acces-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");
          setLoggedUser(data.data);
        });
    };

    fetchUserData();
  }, []);

  return (
  <div>
    <h1 className="display-3 text-center" style={{fontSize: '48px'}}>Welcome {loggedUser.fname}</h1>
    {console.log(loggedUser)}
  </div>
  );
};

export default UserDetail;

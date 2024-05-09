// import { useEffect, useState } from "react";
// import axios from "axios";

function MyProfile() {
  // const [user, setUser] = useState();

  // useEffect(() => {
  //   const url =
  //     "http://localhost:3000/my-profile/" + localStorage.getItem("userId");
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       console.log(res.data.user);
  //       if (res.data.user) {
  //         setUser(res.data.user);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // console.log(user);

  return (
    <>
      <div className="px-8 text-center">
        <div className="flex">
          <p>This page is under development!!!</p>
          {/* {user.username}
          {user.phone}
          {user.email} */}
        </div>
      </div>
    </>
  );
}

export default MyProfile;

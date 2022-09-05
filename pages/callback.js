import { useRouter } from "next/router";
import { useEffect } from "react";
import { date } from "../public/scripts/Utils";

export default function Callback(data) {
  let { access_token, expires_in } = data;
  let router = useRouter();
  useEffect(() => {
    if (data.hasOwnProperty("error")) {
      router.replace("/login/error");
    } else {
      localStorage.setItem("session_token", access_token);
      localStorage.setItem(
        "expires_at",
        date.add(Date.now(), Math.floor(parseInt(expires_in) / 60))
      );
      localStorage.setItem("user-auth", true);
      router.replace("/");
    }
  }, []);
  return <h1>Loading...</h1>;
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  let code = query.code || null;
  let state = query.state || null;
  if (state === null) {
    return {
      redirect: {
        destination:
          "/#" +
          querystring.stringify({
            error: "state_mismatch",
          }),
        permanent: false,
      },
    };
  } else {
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: "http://localhost:3000",
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64"),
      },
      json: true,
    };
    let res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `code=${code}&redirect_uri=http://localhost:3000/callback&grant_type=authorization_code`,
    });
    let data = await res.json();
    console.log(data);
    return {
      props: data,
    };
  }
}

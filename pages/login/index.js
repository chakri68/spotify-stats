function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function Login() {
  return <h1>LOGIN PAGE</h1>;
}

export function getServerSideProps() {
  let redirect_uri = "http://localhost:3000/callback";
  let state = makeid(16);
  let scope =
    "user-read-private user-read-email user-top-read user-read-recently-played user-follow-read";
  console.log(process.env.CLIENT_ID);
  return {
    redirect: {
      destination:
        "https://accounts.spotify.com/authorize?" +
        new URLSearchParams({
          response_type: "code",
          client_id: process.env.CLIENT_ID,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        }),
      permanent: false,
    },
  };
}

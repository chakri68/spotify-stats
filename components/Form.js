export default function Form({ url }) {
  return (
    <div className="box">
      <iframe
        src={url}
        width="420"
        height="500"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        Loading…
      </iframe>
    </div>
  );
}

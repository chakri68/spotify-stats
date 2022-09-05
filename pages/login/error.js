import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { showModal } from "../../public/scripts/Utils";
import Link from "next/link";

export default function Error() {
  let url = `<iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSeHw7FluGuYzAB1i9HTLwMWS93LeiCSKfUxoMqBWMbLsnhUwg/viewform?embedded=true"
      width="420"
      height="560"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
    >
      Loading…
    </iframe>`;
  return (
    <>
      <Navbar />
      <section className="section has-text-centered has-text-danger">
        <p>Something went wrong, please try again </p>
        <button className="button mt-4">
          <Link href="/">
            <a className="not-link">
              <span>Reload</span>
            </a>
          </Link>
          {/* <Icon iconClass=" has-text-primary ml-5" url="/" /> */}
          <span className="icon is-small">
            <i className="fa-solid fa-rotate-right"></i>
          </span>
        </button>
      </section>
      <section className="section has-text-centered">
        If you were trying to access top tracks/artists, please fill out this
        form so that we can access data from spotify
      </section>
      <div className="container has-text-centered">
        <button
          className="button is-primary"
          onClick={() => {
            showModal({ innerhtml: url });
          }}
        >
          Request Account addition
        </button>
      </div>
      <Footer />
    </>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section section--top">
      <div className="wrap wrap--narrow center">
        <h1 className="h-section">Pagina non trovata</h1>
        <p className="lead mt-4">La pagina che cerchi non esiste o è stata spostata.</p>
        <div className="mt-cta">
          <Link className="btn btn--pieno" href="/">
            Torna alla home
          </Link>
        </div>
      </div>
    </section>
  );
}

const Paginator = ({ info, page, setPage, totalPages }) => {
  return (
    <div className="pages">
      <button
        onClick={() => setPage(page - 1)}
        disabled={!info.prev}
        className="btn btn-secondary"
      >
        Previous
      </button>
      <b className="actualPage">{page} of {totalPages}</b>
      <button
        onClick={() => setPage(page + 1)}
        disabled={!info.next}
        className="btn btn-secondary"
      >
        Next
      </button>
    </div>
  );
};

export default Paginator;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
     navigate('/search?keyword=' + keyword);
  };

  return (
    <div className="input-group">
      <input
        type="text"
        id="search_field"
        className="form-control" onBlur={searchHandler}
        placeholder="Enter Product Name ..."
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={searchHandler}
      />

      <div className="input-group-append">
        <button
          onClick={searchHandler}
          id="search_btn"
          className="btn"
        >
          <i className="fa fa-search" />
        </button>
      </div>
    </div>
  );
}

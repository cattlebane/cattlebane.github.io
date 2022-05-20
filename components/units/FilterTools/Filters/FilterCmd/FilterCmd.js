const FilterCmd = (props) => {
  return (
    <li className="filter-btn">
      <a className="btn-sm btn-outline" onClick={props.onClick}>
        {props.id}
      </a>
    </li>
  );
};

export default FilterCmd;

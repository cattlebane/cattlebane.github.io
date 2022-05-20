// import Profiles from './Profiles/Profiles';
import Filters from './Filters/Filters';

const FilterTools = (props) => {
  return (
    <div className="Filter-tools">
      <Filters builds={props.builds} />
      {/* <Profiles profiles={props.profiles} /> */}
    </div>
  );
};

export default FilterTools;

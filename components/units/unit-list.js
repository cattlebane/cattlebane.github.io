import UnitItem from './unit-item';
import classes from './unit-list.module.css';

const UnitList = (props) => {
  const { items } = props;
  if (!items) {
    return <p>No units found!</p>;
  }
  return (
    <ul className={classes.list}>
      {items.map((unit) => {
        return <UnitItem key={unit.id} item={unit} />;
      })}
    </ul>
  );
};

export default UnitList;

import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import classes from './unit-item.module.css';

const UnitItem = (props) => {
  // const { id, title, lob, project, unit, date } = props.item;
  const { id, size, type, path } = props.item;

  const mimeTypeAr = type.split('/');
  const mediaType = type.substring(type.lastIndexOf('/') + 1, type.length);

  /* const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }); */

  return (
    <li className={classes.item}>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{size}</h2>
          <div className={classes.address}>
            <h3>ID:</h3>
            {id}
            <h3>type:</h3>
            {mediaType}
          </div>
          {/* <div className={classes.date}>
            <DateIcon />
            <h3>Date</h3>
            <time>{humanReadableDate}</time>
          </div> */}
        </div>
        <div className={classes.actions}>
          {/* <Button link={`/lob/${lob}/${project}/${id}`}> */}
          <Button link={path}>
            <span>select</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default UnitItem;

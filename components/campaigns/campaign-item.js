import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import classes from './campaign-item.module.css';
import Link from 'next/link';

const CampaignItem = (props) => {
  const { id, title, client, project, campaign, date, path } = props.item;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    // <li className={classes.item}>
    <li className={`Build ${classes.item}`}>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <h3>Date</h3>
            <time>{humanReadableDate}</time>
          </div>
        </div>
        <div className={classes.actions}>
          <Link href={path}>
            <a className="btn btn-blue">Select</a>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default CampaignItem;

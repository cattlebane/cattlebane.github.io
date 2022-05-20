import CampaignItem from './campaign-item';
import classes from './campaign-list.module.css';

const CampaignList = (props) => {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((campaign) => {
        return <CampaignItem key={campaign.id} item={campaign} />;
      })}
    </ul>
  );
};

export default CampaignList;

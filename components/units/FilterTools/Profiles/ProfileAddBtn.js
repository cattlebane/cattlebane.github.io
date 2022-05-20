import { useEffect, useRef, useState } from 'react';

const ProfileAddBtn = (props) => {
  const [isOver, setIsOver] = useState(false);
  const linkRef = useRef(null);

  const handleMouseOver = () => {
    setIsOver(true);
  };

  const handleMouseOut = () => {
    setIsOver(false);
  };

  useEffect(() => {
    linkRef.current.innerHTML = isOver ? '&#xF315;' : '&#xF30F;';
  }, [isOver]);

  return (
    <div className="Profiles-add">
      <a
        ref={linkRef}
        className="icon-text"
        onClick={props.onClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        &#xF30F;
      </a>
    </div>
  );
};

export default ProfileAddBtn;

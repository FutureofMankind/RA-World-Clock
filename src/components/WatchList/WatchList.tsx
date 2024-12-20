import { useEffect, useState } from 'react';
import IWatch from '../../models/IWatch';
import WatchItem from '../WatchItem/WatchItem';
import './watchList.css';

interface IWatchListProps {
  watches: IWatch[];
  onRemove: (watch: IWatch) => void;
}

const WatchList = ({ watches, onRemove }: IWatchListProps) => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const getCurrentTime = () => {
    const date = new Date();
    setTime({
      hours: date.getUTCHours(),
      minutes: date.getUTCMinutes(),
      seconds: date.getUTCSeconds(),
    });
  };

  useEffect(() => {
    getCurrentTime();
    const interval = setInterval(getCurrentTime, 1000);
    return () => clearInterval(interval);
    }, []
  );

  const items = watches.map((obj) => (
    <WatchItem key={obj.zone} obj={obj} time={time} onRemove={onRemove} />
  ));
  return <ul className="watch-list">{items}</ul>;
};

export default WatchList;
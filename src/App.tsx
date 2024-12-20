import { useState } from 'react';
import WatchForm from './components/WatchForm/WatchForm';
import WatchList from './components/WatchList/WatchList';
import IWatch from './models/IWatch';

const App = () => {
  const [form, setForm] = useState<IWatch>({ zone: '', offset: '' });
  const [watches, setWatches] = useState<IWatch[]>([]);
  const [tooltip, setTooltipText] = useState({zoneTooltip: '', offsetTooltip: ''});

  const handleChange = (newForm: IWatch) => {
    setForm(newForm);
    setTooltipText({zoneTooltip: '', offsetTooltip: ''});
  };

  const handleSubmit = (newForm: IWatch) => {
    if (newForm.zone === '') {
      setForm(newForm);
      setTooltipText({zoneTooltip: 'Это город?', offsetTooltip: ''});
      return;
    }

    if (newForm.offset === '') {
      setForm(newForm);
      setTooltipText({zoneTooltip: '', offsetTooltip: 'Введите число от 0 до 23'});
      return;
    }

    const exists = watches.find((el) => el.zone === newForm.zone);
    if (exists) {
      setForm({ zone: '', offset: '' });
      setTooltipText({zoneTooltip: 'Город уже добавлен', offsetTooltip: ''});
      return;
    }
    setWatches([...watches, newForm]);
    setForm({ zone: '', offset: '' });
  };

  const handleRemove = (watch: IWatch) => {
    setWatches(watches.filter((el) => el.zone !== watch.zone));
  };

  return (
    <>
      <WatchForm
        form={form}
        tooltip={tooltip}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {watches.length ? <WatchList watches={watches} onRemove={handleRemove} /> : null}
    </>
  );
};

export default App;
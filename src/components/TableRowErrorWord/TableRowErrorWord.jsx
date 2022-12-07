import format from 'date-fns/format';

import tableRowStyle from './TableRowWord.module.scss';

const TableRowErrorWord = ({ id, create, english, russian, transcription }) => {
  const classTd = tableRowStyle['td'];

  return (
    <>
      <tr data-id={id}>
        <td className={classTd}>{english}</td>
        <td className={classTd}>{russian}</td>
        <td className={classTd}>{transcription}</td>
        <td>{format(new Date(create), 'MM/dd/yy')}</td>
      </tr>
    </>
  );
};
export default TableRowErrorWord;

import format from 'date-fns/format';

import tableRowStyle from './TableRowResults.module.scss';

const TableRowResults = ({ nameDict, countWords, countTrue, countFalse, testingTimeSeconds, create }) => {
  const classTd = tableRowStyle['td'];

  return (
    <>
      <tr>
        <td className={classTd}>{nameDict}</td>
        <td className={classTd}>{countWords}</td>
        <td className={classTd}>{countTrue}</td>
        <td className={classTd}>{countFalse}</td>
        <td className={classTd}>{testingTimeSeconds} seconds</td>
        <td>{format(new Date(create), 'dd/MM/yy')}</td>
      </tr>
    </>
  );
};
export default TableRowResults;

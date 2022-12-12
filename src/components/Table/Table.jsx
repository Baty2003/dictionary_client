import { tr } from 'date-fns/locale';
import React, { useState, useEffect } from 'react';

import { Loader } from '../../common/Loader';
import { sortItemsByCreate } from '../../utils/functionHelp';
import { useLoader } from '../../utils/hooks';
import CreateForm from '../CreateForm/CreateForm';
import './Table.scss';

const Table = ({
  namesTitlesCells = [{}],
  items = [],
  title,
  ComponentTr,
  addItem,
  editItem,
  deleteItem,
  type,
  withCreateItem,
  children,
}) => {
  const [itemsSort, setItemsSort] = useState([...items]);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    setItemsSort([...items]);
  }, [items]);

  return (
    <>
      {useLoader() && <Loader />}
      <section className={`pages ${useLoader() ? 'opacity' : ''}`}>
        <h2 className="title title-table" title={title}>
          {title}
        </h2>

        <div className="table__container-form">
          {withCreateItem && (
            <CreateForm
              type={type}
              submitFunc={addItem}
              hideFunc={() => setShowForm(false)}
              showFunc={() => setShowForm(true)}
              show={showForm}
            />
          )}
          {children}
        </div>

        <table className="table">
          <tbody>
            <tr>
              {namesTitlesCells.map((cell) => (
                <th
                  key={cell.name}
                  width={cell?.width && cell.width}
                  onClick={() => setItemsSort(sortItemsByCreate(itemsSort))}
                >
                  {cell.name}
                </th>
              ))}
            </tr>
            <tr>
              {namesTitlesCells.map((cell) => (
                <td key={cell.name} width={cell?.width && cell.width}></td>
              ))}
            </tr>
            {itemsSort.length ? (
              itemsSort.map((item, index) => (
                <ComponentTr key={index} {...item} editItem={editItem} deleteItem={deleteItem} />
              ))
            ) : (
              <tr>
                <td colSpan={namesTitlesCells.length} style={{ textAlign: 'center' }}>
                  NOT DATA
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};
export default Table;

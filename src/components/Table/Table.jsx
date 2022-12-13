import React, { useState, useEffect } from 'react';

import { Loader } from '../../common/Loader';
import { useLoader, useSortableData } from '../../utils/hooks';
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
  const { items: itemsSort, requestSort } = useSortableData(items);

  const [showForm, setShowForm] = useState(false);
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
                  onClick={() => requestSort(cell.name, cell?.sortFunction)}
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

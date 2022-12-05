import React, { useState, useEffect } from 'react';

import { Loader } from '../../common/Loader';
import { useLoader } from '../../utils/hooks';
import CreateForm from '../CreateForm/CreateForm';
import { LinkPrimary } from '../LinkPrimary';
import './Table.scss';

const Table = ({ namesTitlesCells = [{}], items = [], title, ComponentTr, addItem, editItem, deleteItem, type }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      {useLoader() && <Loader />}
      <section className={`pages ${useLoader() ? 'opacity' : null}`}>
        <h2 className="title-table">{title}</h2>
        <div className="table__container-form">
          <CreateForm
            type={type}
            submitFunc={addItem}
            hideFunc={() => setShowForm(false)}
            showFunc={() => setShowForm(true)}
            show={showForm}
          />
        </div>
        <table className="table">
          <tbody>
            <tr>
              {namesTitlesCells.map((cell) => (
                <th key={cell.name} width={cell?.width && cell.width}>
                  {cell.name}
                </th>
              ))}
            </tr>
            <tr>
              {namesTitlesCells.map((cell) => (
                <td key={cell.name} width={cell?.width && cell.width}></td>
              ))}
            </tr>
            {items.map((item, index) => (
              <ComponentTr key={index} {...item} editItem={editItem} deleteItem={deleteItem} />
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};
export default Table;

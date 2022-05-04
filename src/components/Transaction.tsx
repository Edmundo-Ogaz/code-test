import React, { MouseEvent, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useSelector, actions, useDispatch } from '../store';
import useQuery from '../hooks/useQuery';
import useAPI from '../hooks/useAPI';
import { Transaction } from '../types';

import './Transaction.scss';

const Transactions = () => {
  console.log('Transaction');
  const { getTransactions, remove } = useAPI();
  const dispatch = useDispatch();

  const { query, setQuery } = useQuery();
  console.log(`Transaction query ${JSON.stringify(query)}`);
  const transactions = useSelector((state) => state.transactions);

  useEffect(() => {
    console.log('Transaction useEffect Remove previously loaded data');
    dispatch(actions.set({ transactions: {} }));
  }, []);

  useEffect(() => {
    console.log('Transaction useEffect Send the request');
    getTransactions().then((transactions) => {
      dispatch(actions.set({ transactions }));
    });
  }, [query]);

  return (
    <main className="Transaction">
      <h1>Transaction</h1>
      <button
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          console.log('Transaction onChange');
          setQuery({ page: `${query.page ? parseInt(query.page) + 1 : 0}` });
        }}
      >
        More
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>FROM</th>
            <th>TO</th>
            <th>NAME</th>
            <th>ACTION</th>
          </tr>
        </thead>
        {Object.values(transactions).map((transaction, index) => {
          return (
            !transaction.deleted && (
              <tbody key={transaction.id}>
                <tr>
                  <td>{transaction.id}</td>
                  <td>{transaction.from}</td>
                  <td>{transaction.to}</td>
                  <td>{transaction.tokenName}</td>
                  <td>
                    <button
                      onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        console.log('Transaction onChange delete the transaction');
                        remove(transaction.id).then((response) => {
                          if (response.deleted) {
                            const object = Object.values(transactions).reduce(
                              (accumulator: { [key: string]: Transaction }, currentValue) => {
                                accumulator[currentValue.id] =
                                  currentValue.id === response.id
                                    ? { ...currentValue, ...response }
                                    : currentValue;

                                return accumulator;
                              },
                              {}
                            );
                            dispatch(actions.set({ transactions: object }));
                          } else {
                            toast(`Dont deleted`, { type: 'error' });
                          }
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            )
          );
        })}
      </table>
    </main>
  );
};

export default Transactions;

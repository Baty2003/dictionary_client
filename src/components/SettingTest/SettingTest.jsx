import React, { useState } from 'react';
import { Button, Form, Input, Radio, Select, Slider } from 'antd';
import { Option } from 'antd/lib/mentions';
import { useHistory } from 'react-router-dom';

import { Loader } from '../../common/Loader';
import { useLoader } from '../../utils/hooks';

import settingTestStyle from './SettingTest.module.scss';

const SettingTest = ({ items = [], workOnError, saveSettingFunc }) => {
  const [countWords, setCountWords] = useState(4);
  const [selectedCountWord, setSelectedCountWord] = useState(4);
  const setDictionary = (id) => {
    setCountWords(items.find((item) => item.id === id).count || 8);
  };
  const countWordsExpression = countWords < 4 ? 4 : countWords;
  const submitForm = ({ id, countVariants, countWords, lang }) => {
    saveSettingFunc(id, countVariants, countWords, lang);
  };
  const { Option } = Select;
  if (!items.length) return <h1 className="title">Words is not enough</h1>;
  return (
    <>
      {useLoader() && <Loader />}
      <section className={`pages ${useLoader() ? 'opacity' : ''}`}>
        {useLoader() && <Loader />}
        <Form onFinish={submitForm} name="login" initialValues={{ countVariants: countWords, countWords: countWords }}>
          <h1 className="title">Setting Testing</h1>
          {workOnError && <h2 className="title">Work on Error</h2>}
          {!workOnError && (
            <Form.Item
              name="id"
              label="Select Dictionary"
              hasFeedback
              rules={[
                { required: true, message: 'Please select Dictionary!' },
                () => ({
                  validator() {
                    if (countWords >= 4) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The dictionary must contain more than 4 words'));
                  },
                }),
              ]}
            >
              <Select placeholder="Please select a country" onChange={setDictionary}>
                {items.map((item) => (
                  <Option value={item.id} key={item.id}>
                    {item.name} {`(Count Words: ${item.count})`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            name="countVariants"
            label="Count Variants"
            rules={[
              () => ({
                validator(_, value) {
                  if (value <= selectedCountWord) return Promise.resolve();
                  return Promise.reject('There can be no more options than the number of words');
                },
              }),
            ]}
          >
            <Slider
              min={4}
              max={8}
              marks={{
                4: '4',
                6: '6',
                8: '8',
              }}
            />
          </Form.Item>
          <Form.Item name="countWords" label="Count Words">
            <Slider
              onChange={(data) => setSelectedCountWord(data)}
              min={4}
              max={workOnError ? items.length : countWordsExpression}
              marks={{
                [workOnError ? items.length : countWords]: `max ${workOnError ? items.length : countWords}`,
              }}
            />
          </Form.Item>
          <Form.Item label="Language" name="lang" initialValue="english">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="english">English</Radio.Button>
              <Radio.Button value="russian">Russian</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Start testing
            </Button>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};
export default SettingTest;

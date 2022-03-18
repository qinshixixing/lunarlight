import axios from 'axios';
import inquirer from 'inquirer';

import { api } from './api';

interface TplConfig {
  key: string;
  description?: string;
  url: string;
  branch?: string;
}

const res = await axios.get(api);
const allTpl: TplConfig[] = res.data || [];

const answer = await inquirer.prompt([
  {
    name: 'tplType',
    type: 'list',
    message: '请选择模版类型',
    choices: allTpl.map((item) => item.key)
  }
]);
const tplType = answer.tplType;

const { url, branch } = allTpl.find(
  (item) => item.key === tplType
) as TplConfig;

export { url, branch };

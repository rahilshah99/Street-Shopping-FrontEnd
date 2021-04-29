import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.CategoryPage';
export const Commonscope = 'boilerplate.containers';

export default defineMessages({
  name: {
    id: `${scope}.header`,
    defaultMessage: 'categorys List',
  },
  categoryName: {
    id: `${scope}.category.name`,
    defaultMessage: 'Name',
  },
  categoryDescription: {
    id: `${scope}.category.description`,
    defaultMessage: 'Description',
  },
  categoryAddButton: {
    id: `${scope}.category.add.button`,
    defaultMessage: 'Add Category',
  },
  categoryTitle: {
    id: `${scope}.category.title`,
    defaultMessage: 'Title',
  },
  categoryEditHeader: {
    id: `${scope}.category.edit.header`,
    defaultMessage: 'Edit Category',
  },
  categoryDeleteHeader: {
    id: `${scope}.category.delete.header`,
    defaultMessage: 'Delete Your category',
  },
  categoryDeleteText: {
    id: `${scope}.category.delete.text`,
    defaultMessage: 'Are you sure you want to delete your category',
  },
  TableACTION: {
    id: `${Commonscope}.Table.action`,
    defaultMessage: 'Action',
  },
  ButtonADD: {
    id: `${Commonscope}.Button.add`,
    defaultMessage: 'Add',
  },
  ButtonUPDATE: {
    id: `${Commonscope}.Button.update`,
    defaultMessage: 'Update',
  },
  ButtonYES: {
    id: `${Commonscope}.ModalBox.yes`,
    defaultMessage: 'Yes',
  },
  ButtonNO: {
    id: `${Commonscope}.ModalBox.no`,
    defaultMessage: 'No',
  },
  ButtonBACK: {
    id: `${Commonscope}.Button.back`,
    defaultMessage: 'Back',
  },
  Tooltip: {
    id: `${Commonscope}.tooltip`,
    defaultMessage: 'Please fill out this field',
  },
});

import * as yup from 'yup';

export const QUESTION_SCHEMA = yup.object().shape({
  type: yup.string().required('Campo requerido'),
  questionText: yup.string().required('Campo requerido'),
  textInformation: yup.string().when('type', {
    is: 'informativo',
    then: (schema) => schema.required('Campo requerido'),
    otherwise: (schema) => schema.notRequired(),
  }),
  hasTooltip: yup.boolean(),
  textTooltip: yup.string().when('hasTooltip', {
    is: true,
    then: (schema) => schema.required('Campo requerido'),
    otherwise: (schema) => schema.notRequired(),
  }),
  options: yup.array().when('type', {
    is: (value) => value === 'unica' || value === 'radio',
    then: (schema) => schema.of(yup.object().shape({
      text: yup.string().required('Campo requerido')
    })),
    otherwise: (schema) => schema.notRequired(),
  }),
  indexSection: yup.number().required('Campo requerido'),
});
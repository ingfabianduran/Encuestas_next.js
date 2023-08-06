import * as yup from 'yup';

export const SURVEY_SCHEMA = yup.object().shape({
  nameSurvey: yup.string().required('Campo requerido'),
  launchSurvey: yup.number().required('Campo requerido'),
  daysOfPublication: yup.number().when('launchSurvey', {
    is: 1 || 3,
    then: (schema) => schema.required('Campo requerido'),
    otherwise: (schema) => schema.notRequired(),
  }),
  releaseDate: yup.date().when('launchSurvey', {
    is: 3,
    then: (schema) => schema.required('Campo requerido'),
    otherwise: (schema) => schema.notRequired(),
  }),
  publicationStartDate: yup.date().when('launchSurvey', {
    is: 2,
    then: (schema) => schema.required('Campo requerido'),
    otherwise: (schema) => schema.notRequired(),
  }),
  publicationEndDate: yup.date().when('launchSurvey', {
    is: 2,
    then: (schema) => {
      return schema.min("publicationStartDate", 'La fecha de fin debe ser posterior a la fecha de inicio');
    },
    otherwise: (schema) => schema.notRequired(),
  }),
  publishSurveyTo: yup.number().required('Campo requerido'),
  loadIdbase: yup.mixed().when('publishSurveyTo', {
    is: 2,
    then: (schema) => schema.required('Campo requerido'),
    otherwise: (schema) => schema.notRequired(),
  })
});
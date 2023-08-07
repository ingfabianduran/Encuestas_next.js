import * as yup from 'yup';
import * as moment from 'moment';

export const SURVEY_SCHEMA = yup.object().shape({
  nameSurvey: yup.string().required('Campo requerido'),
  launchSurvey: yup.number().required('Campo requerido'),
  daysOfPublication: yup.number().when('launchSurvey', {
    is: (value) => value === 1 || value === 3,
    then: (schema) => schema.required('Campo requerido'),
    otherwise: (schema) => schema.notRequired(),
  }),
  releaseDate: yup.string().when('launchSurvey', {
    is: 3,
    then: () => yup.string().required('Campo requerido').test('valid_date_release_date', 'Fecha invalida', function (value) {
      return moment(value).isValid();
    }),
    otherwise: (schema) => schema.notRequired(),
  }),
  publicationStartDate: yup.string().when('launchSurvey', {
    is: 2,
    then: () => yup.string().required('Campo requerido').test('valid_date_start_before_date_end', 'La fecha debe ser anterior', function (value) {
      const { publicationEndDate } = this.parent;
      return moment(value).isSameOrBefore(publicationEndDate);
    }),
    otherwise: (schema) => schema.notRequired()
  }),
  publicationEndDate: yup.string().when('launchSurvey', {
    is: 2,
    then: () => yup.string().required('Campo requerido').test('valid_date_end_after_date_start', 'La fecha debe ser superior', function (value) {
      const { publicationStartDate } = this.parent;
      return moment(value).isSameOrAfter(publicationStartDate);
    }),
    otherwise: (schema) => schema.notRequired()
  }),
  publishSurveyTo: yup.number().required('Campo requerido'),
  loadIdbase: yup.mixed().when('publishSurveyTo', {
    is: 2,
    then: (schema) => schema.required('El campo es requerido'),
    otherwise: (schema) => schema.notRequired()
  }),
  sections: yup.array().of(yup.object().shape({
    title: yup.string().required('El campo es requerido'),
    description: yup.string().required('El campo es requerido')
  }))
});
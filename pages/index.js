import CreateSurvey from "../src/pages/CreateSurvey";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

export default function Index() {
  return (
    <>
       <LocalizationProvider dateAdapter={AdapterMoment}>
        <CreateSurvey />
       </LocalizationProvider>
    </>
  );
}

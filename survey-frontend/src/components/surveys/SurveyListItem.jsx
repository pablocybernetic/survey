import CustomButton from "../core/CustomButton.jsx";
import {CiEdit} from "react-icons/ci";
import {FiExternalLink, FiTrash} from "react-icons/fi";

export default function SurveyListItem({ survey, onDeleteClick = (param) => {}}) {
  return (
    <>
      <div className='shadow p-4'>
        <img src={survey.image_url} alt={survey.title} className='w-full max-h-fit object-cover'/>
        <h3>{survey.title}</h3>
        <div dangerouslySetInnerHTML={{__html: survey.description}} className='overflow-hidden'></div>
        <div className='flex flex-row justify-between gap-2 items-center'>
          <CustomButton link to={`/surveys/${survey.id}`}>
            <CiEdit className='w-5 h-5'/> Edit
          </CustomButton>
          <div className='flex flex-row flex-nowrap justify-around items-center gap-2'>
            <CustomButton link circle color={'gray'} to={`/view/surveys/${survey.slug}`}>
              <FiExternalLink className='w-5 h-5'/>
            </CustomButton>
            <CustomButton link circle color={'red'} handleClick={() => onDeleteClick(survey.id)}>
              <FiTrash className='w-5 h-5'/>
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
}

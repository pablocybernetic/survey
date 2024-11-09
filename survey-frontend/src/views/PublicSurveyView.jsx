import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Axios from "../services/axios.js";
import {BeatLoader} from "react-spinners";
import {PublicQuestionComponent} from "../components/surveys/PublicQuestionComponent.jsx";
import CustomButton from "../components/core/CustomButton.jsx";

const PublicSurveyView = () => {
  const {slug} = useParams();
  const [survey, setSurvey] = useState({questions: []})
  const [loading, setLoading] = useState(false);
  const answers = {}
  const navigate = useNavigate()

  // fetch survey on component mount
  useEffect(() => {
    setLoading(true)
    Axios.get(`/view/survey/${slug}`)
      .then(({data}) => {
        setSurvey(data.data)
        setLoading(false)
      })
  }, [])

  // handle answer update
  const handleAnswerChange = (value, question) => {
    answers[question.uuid] = value
  }

  // handle answers submit
  const handleSubmit = (event) => {
    event.preventDefault()

    // send survey answers
    Axios.post(`/survey/answer/${survey.answer_id}`, {answers})
      .then((response) => {
        navigate('/thanks', {replace: true})
      }).catch((errors) => {
      console.log(errors)
    })
  };

  return (
    <div className='bg-gray-100 min-h-screen'>
      {loading && (
        <div className='text-center m-8'>
          <BeatLoader color="#3b82f6"/>
        </div>
      )}

      {!loading && (
        <div className="p-4 sm:p-6 w-full md:w-4/5 lg:w-2/3 xl:w-1/2 mx-auto">
  {/* Survey Card */}
  <div className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg rounded-lg p-6 md:p-8 text-center flex flex-col gap-4 md:gap-6 my-4 md:my-8">
    <img 
      src={survey.image_url} 
      alt={survey.title} 
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto mx-auto rounded-lg shadow-md border border-gray-200"
    />
    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">{survey.title}</h1>
    <span className="text-xs sm:text-sm md:text-base text-gray-600">
      Expire after: <b className="text-red-500">{survey.expire_date}</b>
    </span>
    <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">{survey.description}</p>
  </div>
  
  {/* Survey Form */}
  <div className="mt-4 md:mt-6">
    <form 
      action="#" 
      onSubmit={handleSubmit} 
      className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md space-y-4 md:space-y-6"
    >
      {survey.questions.map((question, index) => (
        <PublicQuestionComponent 
          key={question.uuid} 
          question={question}
          onAnswerChange={(value) => handleAnswerChange(value, question)} 
        />
      ))}
      <CustomButton 
        type="submit" 
        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Submit
      </CustomButton>
    </form>
  </div>
</div>

      )}
    </div>
  );
};

export default PublicSurveyView;
